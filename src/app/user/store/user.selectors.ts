import { createSelector } from '@ngrx/store';

import { IAppState } from '../../common/interface/app-state.interface';

export const selectUser = createSelector(
    (state: IAppState) => state.User.user,
    user => user,
);
