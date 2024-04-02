import { ITransaction } from '../layouts/transfer/common/transaction.interface';

export interface IUser {
    name: string;
    email: string;
    uid: string;
    advisorAccount: boolean;
    transactions: ITransaction[];
}
