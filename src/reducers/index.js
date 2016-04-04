import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

function context(state = { }, action) {
    return state;
}

/**
 * Reducers specify how the application’s state changes in response to actions
 * http://redux.js.org/docs/api/combineReducers.html
 */
const rootReducer = combineReducers({
    context,
    routing: routerReducer
});

export default rootReducer;
