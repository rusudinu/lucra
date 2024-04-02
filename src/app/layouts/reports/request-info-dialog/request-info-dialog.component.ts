import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

import { IRequestAdvisor } from '../../advisor/common/interface/advisor-request.interface';

@Component({
    selector: 'app-request-info-dialog',
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
        NgClass,
    ],
    templateUrl: './request-info-dialog.component.html',
    styleUrl: './request-info-dialog.component.scss',
})
export class RequestInfoDialogComponent {
    firestore: Firestore = inject(Firestore);
    requestId: string;
    advisorEmail: string;
    accountBalance: number;
    initialInvestment: number;
    additionalInvestment: number;
    frequencyOfInvestment: string;
    score: number;
    advisorConclusions: string;

    constructor(@Inject(MAT_DIALOG_DATA) private data: IRequestAdvisor) {
        this.requestId = data.requestId;
        this.advisorEmail = data.advisorEmail;
        this.accountBalance = data.accountBalance;
        this.initialInvestment = data.initialInvestment;
        this.additionalInvestment = data.additionalInvestment;
        this.frequencyOfInvestment = data.frequencyOfInvestment;
        this.score = data.score;
        this.advisorConclusions = data.advisorConclusions;
    }

    getScoreTheme(score: number): string {
        if (score > 4) {
            return 'green-theme';
        } else if (score >= 2 && score <= 4) {
            return 'yellow-theme';
        }
        return 'red-theme';
    }
}
