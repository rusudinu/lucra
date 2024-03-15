import { ERecurrence } from './recurrence.enum';

export interface ITransaction {
    amount: number;
    type: ETransactionType;
    recurring: boolean;
    recurrencePattern?: ERecurrence;
    recurrenceDate?: Date;
}

export enum ETransactionType {
    Expense = 'expense',
    Income = 'income',
}
