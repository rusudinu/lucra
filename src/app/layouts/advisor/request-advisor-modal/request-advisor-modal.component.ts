import { Component, inject } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs';

import { IAppState } from '../../../common/interface/app-state.interface';
import { selectUser } from '../../../user/store/user.selectors';

@Component({
    selector: 'app-request-advisor-modal',
    standalone: true,
    imports: [ReactiveFormsModule, MatFormField, MatInput, MatDialogActions, MatDialogClose, MatButton, MatDialogContent, MatDialogTitle],
    templateUrl: './request-advisor-modal.component.html',
    styleUrl: './request-advisor-modal.component.scss',
})
export class RequestAdvisorModalComponent {
    store: Store<IAppState> = inject(Store);
    firestore: Firestore = inject(Firestore);
    fb: FormBuilder = inject(FormBuilder);
    dialogRef: MatDialogRef<RequestAdvisorModalComponent> = inject(MatDialogRef);
    userData$ = this.store.select(selectUser);
    requestForm: FormGroup;

    constructor() {
        this.requestForm = this.fb.group({
            userId: [{ value: '', disabled: true }, Validators.required],
            userEmail: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
            advisorId: [{ value: '', disabled: true }, Validators.required],
            advisorEmail: ['', [Validators.required, Validators.email]],
            accountBalance: ['', Validators.required],
            initialInvestment: ['', Validators.required],
            additionalInvestment: ['', Validators.required],
            frequencyOfInvestment: ['', Validators.required],
            isPending: [true],
        });

        this.userData$.subscribe(data => {
            this.requestForm.patchValue({
                userId: data.uid,
                userEmail: data.email,
            });
        });

        this.requestForm
            .get('advisorEmail')!
            .valueChanges.pipe(debounceTime(500))
            .subscribe(value => {
                const userCollectionRef = collection(this.firestore, 'users');
                const advisorQuery = query(userCollectionRef, where('email', '==', value));
                getDocs(advisorQuery).then(snapshot => {
                    snapshot.forEach(doc => {
                        this.requestForm.patchValue({
                            advisorId: doc.id,
                        });
                    });
                });
            });
    }

    requestFormToRequestAdvisor() {
        return {
            userId: this.requestForm.get('userId')!.value,
            userEmail: this.requestForm.get('userEmail')!.value,
            advisorId: this.requestForm.get('advisorId')!.value,
            advisorEmail: this.requestForm.get('advisorEmail')!.value,
            accountBalance: this.requestForm.get('accountBalance')!.value,
            initialInvestment: this.requestForm.get('initialInvestment')!.value,
            additionalInvestment: this.requestForm.get('additionalInvestment')!.value,
            frequencyOfInvestment: this.requestForm.get('frequencyOfInvestment')!.value,
            isPending: this.requestForm.get('isPending')!.value,
            score: -1,
            advisorConclusions: '',
        };
    }

    sendAdvisorRequest() {
        if (this.requestForm.valid) {
            const collectionRef = collection(this.firestore, 'advisorRequests');
            addDoc(collectionRef, this.requestFormToRequestAdvisor()).then(documentReference => {
                const docId = documentReference.id;
                const docRef = doc(collectionRef, docId);
                updateDoc(docRef, { requestId: docId }).then(() => {
                    this.dialogRef.close(true);
                });
            });
        }
    }
}
