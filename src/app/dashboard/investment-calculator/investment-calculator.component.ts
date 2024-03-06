import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

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
        CanvasJSAngularChartsModule,
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
            this.chartOptions.data[0].dataPoints = [
                { name: 'Start Amount', y: formValue.initialInvestment },
                { name: 'Total Contribution', y: this.computedValue },
                { name: 'Interest', y: formValue.expectedRateOfReturn },
            ];
        });
    }

    chartOptions = {
        animationEnabled: true,
        theme: 'white',
        title: {
            text: 'Breakdown',
        },
        subtitles: [
            {
                text: 'Your investment data',
            },
        ],
        data: [
            {
                type: 'pie',
                indexLabel: '{name}: {y}%',
                dataPoints: [
                    { name: 'Start Amount', y: 0 },
                    { name: 'Total Contribution', y: 3.7 },
                    { name: 'Interest', y: 36.4 },
                ],
            },
        ],
    };
}
