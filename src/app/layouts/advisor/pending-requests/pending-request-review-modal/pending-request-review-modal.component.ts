import { NgForOf, NgIf } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

import { IRequestAdvisor } from '../../common/interface/advisor-request.interface';

@Component({
    selector: 'app-pending-request-review-modal',
    standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatDialogActions,
        MatDialogTitle,
        MatDialogContent,
        MatLabel,
        MatFormField,
        MatSelect,
        MatOption,
        NgForOf,
        ReactiveFormsModule,
        MatInput,
        NgIf,
        MatDialogClose,
        MatError,
        MatCardHeader,
        MatCard,
        MatIcon,
        MatCardContent,
        MatCardTitle,
    ],
    templateUrl: './pending-request-review-modal.component.html',
    styleUrl: './pending-request-review-modal.component.scss',
})
export class PendingRequestReviewModalComponent {
    firestore: Firestore = inject(Firestore);
    reviewForm: FormGroup;
    requestId: string;
    userEmail: string;
    accountBalance: number;
    initialInvestment: number;
    additionalInvestment: number;
    frequencyOfInvestment: string;

    constructor(
        private dialogRef: MatDialogRef<PendingRequestReviewModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data: IRequestAdvisor,
        private fb: FormBuilder,
    ) {
        this.requestId = data.requestId;
        this.userEmail = data.userEmail;
        this.accountBalance = data.accountBalance;
        this.initialInvestment = data.initialInvestment;
        this.additionalInvestment = data.additionalInvestment;
        this.frequencyOfInvestment = data.frequencyOfInvestment;

        this.reviewForm = this.fb.group({
            advisorConclusions: [data.advisorConclusions, Validators.required],
            score: [data.score, Validators.required],
        });
    }

    submitReview() {
        if (this.reviewForm.valid) {
            const collectionRef = collection(this.firestore, 'advisorRequests');
            const docRef = doc(collectionRef, this.requestId);
            updateDoc(docRef, {
                isPending: false,
                advisorConclusions: this.reviewForm.value.advisorConclusions,
                score: this.reviewForm.value.score,
            }).then(() => {
                this.dialogRef.close(true);
            });
            this.dialogRef.close();
        }
    }
}
