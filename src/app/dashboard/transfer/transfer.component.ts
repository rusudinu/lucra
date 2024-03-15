import { Component } from '@angular/core';

@Component({
    selector: 'app-transfer',
    standalone: true,
    imports: [],
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
}
