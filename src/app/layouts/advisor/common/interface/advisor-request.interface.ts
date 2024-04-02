export interface IRequestAdvisor {
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
}
