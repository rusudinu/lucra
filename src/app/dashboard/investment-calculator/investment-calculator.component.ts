import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
        NgxChartsModule,
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

    data: any[] = [
        {
            name: 'Income',
            series: [],
        },
    ];
    view: [number, number] = [700, 300];

    // options
    legend: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Year';
    yAxisLabel: string = 'Population';
    timeline: boolean = true;

    ngOnInit() {
        this.investmentForm.valueChanges.subscribe(formValue => {
            this.computedValue = formValue.initialInvestment * formValue.additionalInvestment;
            this.data[0].series = this.calculateInvestmentGrowth(formValue);
            this.data = [...this.data];
        });
    }

    calculateInvestmentGrowth(formValue: any) {
        const years = formValue.yearsToGrow;
        const rate = formValue.expectedRateOfReturn / 100;
        let investment = formValue.initialInvestment;
        const additionalInvestment = formValue.additionalInvestment;
        const frequency = formValue.frequencyOfInvestment === 'Monthly' ? 12 : 1;
        const growth = [];
        for (let i = 0; i <= years; i++) {
            investment = investment + additionalInvestment * frequency;
            investment = investment * (1 + rate / frequency);
            growth.push({ name: i, value: investment });
        }
        return growth;
    }
}
