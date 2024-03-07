import { createAction, props } from '@ngrx/store';

import { IUser } from '../user.model';

export enum UserActionsEnum {
    SET_USER_DATA = '[User] Set User Data',
}

export const SetUserDataAction = createAction(UserActionsEnum.SET_USER_DATA, props<{ user: IUser }>());
