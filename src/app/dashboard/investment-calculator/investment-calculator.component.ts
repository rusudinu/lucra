import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-investment-calculator',
    standalone: true,
    imports: [MatButton, MatError, MatFormField, MatInput, MatLabel, NgIf, ReactiveFormsModule, RouterLink, MatOption, MatSelect, NgForOf],
    templateUrl: './investment-calculator.component.html',
    styleUrl: './investment-calculator.component.scss',
})
export class InvestmentCalculatorComponent {
    investmentForm: FormGroup = new FormGroup({
        initialInvestment: new FormControl('$', Validators.required),
        additionalInvestment: new FormControl('', Validators.required),
        frequencyOfInvestment: new FormControl('', Validators.required),
        yearsToGrow: new FormControl('', Validators.required),
        expectedRateOfReturn: new FormControl('', Validators.required),
    });
    frequencyOptions: string[] = ['Monthly', 'Annually'];

    onCalculateInvestment() {}
}
