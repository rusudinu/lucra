import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { arrayUnion, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatInput, MatSuffix } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatFormField, MatLabel, MatSelect } from '@angular/material/select';

import { ETransactionType } from './common/transaction.interface';

@Component({
    selector: 'app-transfer',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatOption,
        MatSelect,
        MatLabel,
        MatFormField,
        MatInput,
        MatRadioButton,
        MatRadioGroup,
        NgIf,
        MatCheckbox,
        MatButton,
        MatDatepickerToggle,
        MatDatepickerModule,
        MatDatepickerInput,
        MatNativeDateModule,
        MatSuffix,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './transfer.component.html',
    styleUrl: './transfer.component.scss',
})
export class TransferComponent {
    firestore: Firestore = inject(Firestore);
    auth = getAuth();

    /*
the recurring income or expenses will be calculated on user login
each user will have a doc structure like this:
transfers/user-id-yyyy-mm
this document will contain a list of all the transactions for that month
a transaction is the amount of money that left or entered the account

the recurring transactions info will be stored on the user doc
*/
    transactionForm = new FormGroup({
        amount: new FormControl(null),
        type: new FormControl(ETransactionType.Expense),
        recurring: new FormControl(false),
        recurrencePattern: new FormControl(null),
        recurrenceDate: new FormControl(null),
        recurrenceStartDate: new FormControl(null),
    });

    get isRecurring() {
        return this.transactionForm.get('recurring')?.value;
    }

    transactionFormToITransaction() {
        return {
            amount: this.transactionForm.get('amount')?.value ?? 0,
            type: this.transactionForm.get('type')?.value ?? ETransactionType.Expense,
            recurring: this.transactionForm.get('recurring')?.value ?? false,
            recurrencePattern: this.transactionForm.get('recurrencePattern')?.value ?? null,
            recurrenceDate: this.transactionForm.get('recurrenceDate')?.value ?? null,
            recurrenceStartDate: this.transactionForm.get('recurrenceStartDate')?.value ?? new Date(),
        };
    }

    onSubmit() {
        if (this.transactionForm.valid) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const transaction = this.transactionFormToITransaction();

            const userRef = doc(this.firestore, 'users', this.auth.currentUser!.uid);
            updateDoc(userRef, {
                transactions: arrayUnion(transaction),
            }).then(() => {
                this.transactionForm.reset();
            });
        }
    }
}
