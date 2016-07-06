import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main';

injectTapEventPlugin();

render(
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
		</Route>
	</Router>, 
    document.getElementById('app')
    );
