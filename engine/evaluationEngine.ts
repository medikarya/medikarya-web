// Re-export shim — all logic has moved to engine/evaluation/
// app/actions/evaluate.ts imports from here and continues to work unchanged.
export { EvaluationEngine } from "./evaluation/EvaluationEngine";
export type { FinalEvaluationResult as EvaluationResult } from "./evaluation/types";
