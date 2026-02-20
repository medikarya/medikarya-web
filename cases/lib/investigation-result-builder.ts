// =========================
// cases/lib/investigation-result-builder.ts
// =========================
// Builds InvestigationRules keyed by test.id from caseData.patient.investigations.tests[].
// This is the ONLY place test result data should be constructed.
// Case JSON is the single source of medical truth.

import { InvestigationRules } from "../types";

// ── Value shape the UI modal expects ─────────────────────────────────────────
export interface TestValue {
    parameter: string;
    value: string;
    unit: string;
    normalRange: string;
    status: "normal" | "low" | "high" | "critical" | string;
}

// ── Rule entry shape ──────────────────────────────────────────────────────────
export interface InvestigationRuleEntry {
    summary: string;
    values: TestValue[];
    interpretation: string;
    criticalFindings: string[];
    // Pass-through fields from JSON (not consumed by current UI but preserved for future)
    _meta: {
        id: string;
        name: string;
        category: string;
        cost: number;
        duration: string;
        imageUrl?: string;
    };
}

// ── JSON parameters[] entry shape ──────────────────────────────────────────────
// Add this array to a test in the JSON when you need explicit normalRange + status.
// The builder prefers this over result-object parsing.
export interface JsonParameter {
    name: string;         // display label, e.g. "Hemoglobin"
    value: string;        // numeric string, e.g. "8.2"
    unit: string;         // e.g. "g/dL"
    normalRange: string;  // e.g. "11-15" — shown in the results modal
    status: "normal" | "low" | "high" | "critical";
}

/**
 * Tries to parse a unit-carrying string like "8.2 g/dL" or "10 µg/L (Low)".
 * Returns { numericValue, unit, status } if parseable, else null.
 * Designed for extension: add more patterns without touching callers.
 */
function parseValueString(
    raw: string
): { numericValue: string; unit: string; statusHint: string } | null {
    if (typeof raw !== "string") return null;

    // Pattern: "8.2 g/dL" or "10 µg/L (Low)" or "10% (Low)"
    const match = raw.match(/^([\d.]+)\s*([^\s(]+)(?:\s*\(([^)]+)\))?$/);
    if (!match) return null;

    return {
        numericValue: match[1],
        unit: match[2],
        statusHint: (match[3] ?? "").toLowerCase(), // "low", "high", "normal", ""
    };
}

function resolveStatus(hint: string): TestValue["status"] {
    if (hint === "low") return "low";
    if (hint === "high") return "high";
    if (hint === "critical") return "critical";
    if (hint === "normal") return "normal";
    return "normal"; // safe default
}

/**
 * Builds a values[] array from a result object like:
 *   { hemoglobin: "8.2 g/dL", mcv: "72 fL", mchc: "28 g/dL" }
 *
 * Each key becomes a `parameter`, the string is parsed for value + unit.
 * If parsing fails, value = raw string, unit = "", status = "normal".
 */
function buildValuesFromObject(resultObj: Record<string, string>): TestValue[] {
    return Object.entries(resultObj).map(([key, raw]) => {
        const parsed = typeof raw === "string" ? parseValueString(raw) : null;

        if (parsed) {
            return {
                parameter: key.charAt(0).toUpperCase() + key.slice(1), // "hemoglobin" → "Hemoglobin"
                value: parsed.numericValue,
                unit: parsed.unit,
                normalRange: "",  // not in current JSON — extendable
                status: resolveStatus(parsed.statusHint),
            };
        }

        // Fallback: treat whole raw as the display value
        return {
            parameter: key.charAt(0).toUpperCase() + key.slice(1),
            value: String(raw),
            unit: "",
            normalRange: "",
            status: "normal" as const,
        };
    });
}

/**
 * Main builder.
 * Validates early — throws if investigations.tests is missing.
 * Returns InvestigationRules keyed by test.id.
 */
export function buildInvestigationRulesFromCaseData(
    caseData: any
): InvestigationRules {
    const tests = caseData?.patient?.investigations?.tests;

    // tests may legitimately be an empty array (diagnosis-of-exclusion cases like neonatal jaundice).
    // Only throw if tests is not an array at all (truly missing from JSON).
    if (!Array.isArray(tests)) {
        throw new Error(
            `[buildInvestigationRulesFromCaseData] ` +
            `caseData.patient.investigations.tests is missing for case "${caseData?.id ?? "unknown"}". ` +
            `Add an empty array [] if no tests are needed, or add test definitions.`
        );
    }

    // Empty tests array → no rules, return immediately (valid for exclusion-diagnosis cases)
    if (tests.length === 0) {
        return {};
    }

    const rules: InvestigationRules = {};

    for (const test of tests) {
        if (!test.id) {
            console.warn(
                `[buildInvestigationRulesFromCaseData] Skipping test without id:`,
                test
            );
            continue;
        }

        const { id, name, category, cost, duration, result, imageUrl } = test;

        let summary = `${name}: `;
        let values: TestValue[] = [];
        let interpretation = "";

        if (Array.isArray(test.parameters) && test.parameters.length > 0) {
            // ── Preferred path: explicit parameters[] in JSON ─────────────────
            // Each entry must have: name, value, unit, normalRange, status
            values = (test.parameters as JsonParameter[]).map((p) => ({
                parameter: p.name,
                value: String(p.value),
                unit: p.unit ?? "",
                normalRange: p.normalRange ?? "",
                status: p.status ?? "normal",
            }));
            const valuesSummary = values
                .map((v) => `${v.parameter}: ${v.value} ${v.unit}`.trim())
                .join(", ");
            summary += valuesSummary;
            interpretation = `${name}: ${valuesSummary}.`;
        } else if (typeof result === "string") {
            // Plain string: "Microcytic hypochromic RBCs, pencil cells"
            summary += result;
            interpretation = result;
        } else if (result && typeof result === "object") {
            // Object: { hemoglobin: "8.2 g/dL", mcv: "72 fL" }
            values = buildValuesFromObject(result as Record<string, string>);
            const valuesSummary = Object.entries(result)
                .map(([k, v]) => `${k}: ${v}`)
                .join(", ");
            summary += valuesSummary;
            interpretation = `${name} result: ${valuesSummary}.`;
        } else {
            summary += "Completed.";
            interpretation = "Result available.";
        }

        rules[id] = {
            summary,
            values,
            interpretation,
            criticalFindings: [],
            _meta: {
                id,
                name: name ?? id,
                category: category ?? "laboratory",
                cost: cost ?? 0,
                duration: duration ?? "Unknown",
                ...(imageUrl ? { imageUrl } : {}),
            },
        };
    }

    return rules;
}
