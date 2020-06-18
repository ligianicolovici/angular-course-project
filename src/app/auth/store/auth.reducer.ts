import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthAction
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.playload.email,
        action.playload.userID,
        action.playload.token,
        action.playload.expirationDate
      );
      return {
        ...state,
        user,
        authError: null,
        loading: false,
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGN_UP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
