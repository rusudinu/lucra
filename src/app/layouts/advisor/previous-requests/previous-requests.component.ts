import { NgForOf, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { collection, Firestore, onSnapshot, query, where } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { IAppState } from '../../../common/interface/app-state.interface';
import { selectUser } from '../../../user/store/user.selectors';
import { IRequestAdvisor } from '../common/interface/advisor-request.interface';

@Component({
    selector: 'app-previous-requests',
    standalone: true,
    imports: [NgForOf, NgIf],
    templateUrl: './previous-requests.component.html',
    styleUrl: './previous-requests.component.scss',
})
export class PreviousRequestsComponent implements OnInit {
    store: Store<IAppState> = inject(Store);
    firestore: Firestore = inject(Firestore);
    userData$ = this.store.select(selectUser);
    previousRequests: IRequestAdvisor[] = [];

    ngOnInit(): void {
        this.userData$.subscribe(user => {
            const advisorCollectionRef = collection(this.firestore, 'advisorRequests');
            const advisorQuery = query(advisorCollectionRef, where('advisorId', '==', user.uid), where('isPending', '==', false));
            onSnapshot(advisorQuery, snapshot => {
                this.previousRequests = [];
                snapshot.forEach(doc => {
                    this.previousRequests.push(doc.data() as IRequestAdvisor);
                });
            });
        });
    }
}
