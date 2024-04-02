import { NgForOf, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { collection, Firestore, onSnapshot, query, where } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';

import { RequestInfoDialogComponent } from './request-info-dialog/request-info-dialog.component';
import { IAppState } from '../../common/interface/app-state.interface';
import { selectUser } from '../../user/store/user.selectors';
import { IRequestAdvisor } from '../advisor/common/interface/advisor-request.interface';

@Component({
    selector: 'app-reports',
    standalone: true,
    imports: [NgIf, NgForOf, MatIcon],
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
    store: Store<IAppState> = inject(Store);
    firestore: Firestore = inject(Firestore);
    dialog: MatDialog = inject(MatDialog);
    userData$ = this.store.select(selectUser);
    previousRequests: IRequestAdvisor[] = [];

    ngOnInit(): void {
        this.userData$.subscribe(user => {
            const advisorCollectionRef = collection(this.firestore, 'advisorRequests');
            const advisorQuery = query(advisorCollectionRef, where('userId', '==', user.uid), where('isPending', '==', false));
            onSnapshot(advisorQuery, snapshot => {
                this.previousRequests = [];
                snapshot.forEach(doc => {
                    this.previousRequests.push(doc.data() as IRequestAdvisor);
                });
            });
        });
    }

    openInfoDialog(request: IRequestAdvisor) {
        this.dialog.open(RequestInfoDialogComponent, {
            data: request,
            maxHeight: '80%',
        });
    }
}
