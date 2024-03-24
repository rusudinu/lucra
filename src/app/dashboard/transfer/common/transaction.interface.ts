import { ERecurrence } from './recurrence.enum';

export interface ITransaction {
    amount: number;
    type: ETransactionType;
    recurring: boolean;
    recurrencePattern?: ERecurrence;
    recurrenceDate?: Date;
    recurrenceStartDate?: Date;
}

export enum ETransactionType {
    Expense = 'expense',
    Income = 'income',
}
