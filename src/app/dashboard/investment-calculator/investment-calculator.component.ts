import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-investment-calculator',
    standalone: true,
    imports: [
        MatButton,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        NgIf,
        ReactiveFormsModule,
        RouterLink,
        MatOption,
        MatSelect,
        NgForOf,
        MatPrefix,
        MatSuffix,
        CommonModule,
        RouterOutlet,
    ],
    templateUrl: './investment-calculator.component.html',
    styleUrl: './investment-calculator.component.scss',
})
export class InvestmentCalculatorComponent implements OnInit {
    investmentForm: FormGroup = new FormGroup({
        initialInvestment: new FormControl(0, Validators.required),
        additionalInvestment: new FormControl(7, Validators.required),
        frequencyOfInvestment: new FormControl('Monthly', Validators.required),
        yearsToGrow: new FormControl('', Validators.required),
        expectedRateOfReturn: new FormControl('', Validators.required),
    });
    frequencyOptions: string[] = ['Monthly', 'Annually'];
    computedValue: number = 0;

    ngOnInit() {
        this.investmentForm.valueChanges.subscribe(formValue => {
            this.computedValue = formValue.initialInvestment * formValue.additionalInvestment;
        });
    }
}
