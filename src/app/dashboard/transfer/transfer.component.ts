import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatInput, MatSuffix } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatFormField, MatLabel, MatSelect } from '@angular/material/select';

import { ETransactionType, ITransaction } from './common/transaction.interface';

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
    });

    get isRecurring() {
        return this.transactionForm.get('recurring')?.value;
    }

    transactionFormToITransaction(): ITransaction {
        return {
            amount: this.transactionForm.get('amount')?.value ?? 0,
            type: this.transactionForm.get('type')?.value ?? ETransactionType.Expense,
            recurring: this.transactionForm.get('recurring')?.value ?? false,
            recurrencePattern: this.transactionForm.get('recurrencePattern')?.value ?? undefined,
            recurrenceDate: this.transactionForm.get('recurrenceDate')?.value ?? undefined,
        };
    }

    onSubmit() {
        if (this.transactionForm.valid) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const transaction = this.transactionFormToITransaction();
            // Implement logic to save transaction based on your data structure
            this.transactionForm.reset();
        }
    }
}
