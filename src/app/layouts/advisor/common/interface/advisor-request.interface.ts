export interface IRequestAdvisor {
    requestId: string;
    userId: string;
    userEmail: string;
    advisorId: string;
    advisorEmail: string;
    accountBalance: number;
    initialInvestment: number;
    additionalInvestment: number;
    frequencyOfInvestment: string;
    isPending: boolean;
    advisorConclusions: string;
    score: number;
}
