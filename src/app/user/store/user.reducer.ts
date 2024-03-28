import { createReducer, Action, on } from '@ngrx/store';

import { IUserState } from './common/user-state.interface';
import { SetUserDataAction } from './user.actions';

const initialState: IUserState = {
    user: {
        email: '',
        uid: '',
        name: '',
        advisorAccount: false,
        transactions: [],
    },
};

const reducer = createReducer(
    initialState,

    on(SetUserDataAction, (state, { user }) => ({
        ...state,
        user,
    })),
);

export function UserReducer(state: IUserState = initialState, action: Action): IUserState {
    return reducer(state, action);
}
