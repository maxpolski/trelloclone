import { APP_INITIALIZED } from '../../actions/app/initialization';

export default function app(state = 'NOT_INITIALIZED', action) {
  switch (action.type) {
    case APP_INITIALIZED:
      return 'INITIALIZED';
    default:
      return state;
  }
}
