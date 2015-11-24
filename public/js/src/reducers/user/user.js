import { APP_INITIALIZED } from '../../actions/app/initialization';

export default function user(state = {}, action) {
  switch (action.type) {
    case APP_INITIALIZED:
      let user = action.payload.user;
      return user;
    default:
      return state;
  }
}
