import { NgForOf, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, onSnapshot, query, where } from '@angular/fire/firestore';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { IAppState } from '../../../common/interface/app-state.interface';
import { selectUser } from '../../../user/store/user.selectors';
import { IRequestAdvisor } from '../common/interface/advisor-request.interface';

@Component({
    selector: 'app-pending-requests',
    standalone: true,
    imports: [NgIf, MatButton, NgForOf],
    templateUrl: './pending-requests.component.html',
    styleUrl: './pending-requests.component.scss',
})
export class PendingRequestsComponent implements OnInit {
    store: Store<IAppState> = inject(Store);
    firestore: Firestore = inject(Firestore);
    userData$ = this.store.select(selectUser);
    pendingRequests: IRequestAdvisor[] = [];
    dialog: MatDialog = inject(MatDialog);

    ngOnInit(): void {
        this.userData$.subscribe(user => {
            const advisorCollectionRef = collection(this.firestore, 'advisorRequests');
            const advisorQuery = query(advisorCollectionRef, where('advisorId', '==', user.uid), where('isPending', '==', true));
            onSnapshot(advisorQuery, snapshot => {
                this.pendingRequests = [];
                snapshot.forEach(doc => {
                    this.pendingRequests.push(doc.data() as IRequestAdvisor);
                });
            });
        });
    }

    deleteRequest(request: IRequestAdvisor) {
        const docRef = doc(this.firestore, 'advisorRequests', request.requestId);
        deleteDoc(docRef).then();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reviewRequest(request: IRequestAdvisor) {}
}
