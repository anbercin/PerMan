import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import useScroll from 'react-router-scroll';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AUTH } from './shared/constants/actions';

import routes from './routes';
import store from './store';

injectTapEventPlugin();

//const store = createStore(rootReducer, applyMiddleware(thunk));

//const accessToken = localStorage.getItem('accessToken');
//if (accessToken) {
//  store.dispatch({ type: AUTH.SUCCESS });
//}

ReactDOM.render(
    <Provider store={store}>
      <Router
        history={browserHistory}
        routes={routes}
        render={applyRouterMiddleware(useScroll())}
      />
    </Provider>,
  document.getElementById('root')
);
