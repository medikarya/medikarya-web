
export interface PatientFacts {
    [key: string]: any;
}

export interface CaseResponse {
    response: string;
    timestamp: string;
    source: "guard" | "fact" | "ai";
}

export interface DiagnosisRules {
    // To be defined - ensuring strict return of internal state
    diagnosis_reached: boolean;
    [key: string]: any;
}

export interface InvestigationRules {
    // To be defined - ensuring decision of IF and WHEN a test is indicated
    // Can be a static object or a function that returns the result
    [key: string]: any | ((test: any, context: { caseData: any, chatHistory: any[] }) => any);
}

export interface CaseModule {
    handleFactQuestion(question: string, facts: PatientFacts): CaseResponse | null;
    detectRedFlag(question: string): boolean;
    getDiagnosisLogic(): DiagnosisRules;
    getInvestigationLogic(): InvestigationRules;
    getAllowedTopics(): string[];
    getCaseId(): string;
}
