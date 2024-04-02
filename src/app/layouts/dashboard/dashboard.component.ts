import { AsyncPipe, DatePipe, KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { IAppState } from '../../common/interface/app-state.interface';
import { selectUser } from '../../user/store/user.selectors';
import { RequestAdvisorModalComponent } from '../advisor/request-advisor-modal/request-advisor-modal.component';
import { ERecurrence } from '../transfer/common/recurrence.enum';
import { ETransactionType, ITransaction } from '../transfer/common/transaction.interface';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [AsyncPipe, DatePipe, NgForOf, KeyValuePipe, NgIf, MatButton],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    store: Store<IAppState> = inject(Store);
    dialog: MatDialog = inject(MatDialog);
    userData$ = this.store.select(selectUser);
    totalBalance$ = this.userData$.pipe(
        map(user =>
            user.transactions.reduce((acc, transaction: ITransaction) => {
                if (transaction.recurring) {
                    let timesOccurred = 0;
                    const currentDate = new Date();
                    if (transaction.recurrenceStartDate === undefined) {
                        return 0;
                    }
                    const time = transaction.recurrenceStartDate as any;
                    const startDate = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);

                    while (startDate < currentDate) {
                        timesOccurred++;
                        switch (transaction.recurrencePattern) {
                            case ERecurrence.Daily:
                                startDate.setDate(startDate.getDate() + 1);
                                break;
                            case ERecurrence.Weekly:
                                startDate.setDate(startDate.getDate() + 7);
                                break;
                            case ERecurrence.Monthly:
                                startDate.setMonth(startDate.getMonth() + 1);
                                break;
                            case ERecurrence.Yearly:
                                startDate.setFullYear(startDate.getFullYear() + 1);
                                break;
                        }
                    }

                    if (transaction.type === ETransactionType.Income) {
                        return acc + transaction.amount * timesOccurred;
                    }
                    return acc - transaction.amount * timesOccurred;
                }
                if (transaction.type === ETransactionType.Income) {
                    return acc + transaction.amount;
                }
                return acc - transaction.amount;
            }, 0),
        ),
    );

    dailyTransactions$ = this.userData$.pipe(
        map(user => {
            const dailyTransactions: Map<string, number> = new Map();
            user.transactions.forEach((transaction: ITransaction) => {
                const time = transaction.recurrenceStartDate as any;
                const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
                const dateString = date.toDateString();
                if (dailyTransactions.has(dateString)) {
                    const value = dailyTransactions.get(dateString) ?? 0;
                    if (transaction.type === ETransactionType.Income) {
                        dailyTransactions.set(dateString, value + transaction.amount);
                    } else {
                        dailyTransactions.set(dateString, value - transaction.amount);
                    }
                    dailyTransactions.set(dateString, dailyTransactions.get(dateString)! + transaction.amount);
                } else {
                    dailyTransactions.set(dateString, transaction.amount);
                }
            });
            return dailyTransactions;
        }),
    );

    openRequestAdvisorModal(): void {
        this.dialog.open(RequestAdvisorModalComponent, {
            maxHeight: '80%',
        });
    }
}
