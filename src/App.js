import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main';
import JoinerModal from './JoinerModal';
import ChatApp from './ChatApp';

injectTapEventPlugin();

render(
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<Route path="/join" component={JoinerModal} />
		</Route>
	</Router>, 
    document.getElementById('app')
    );
