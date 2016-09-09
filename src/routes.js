import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Keyboard from './containers/Keyboard'
import NotFound from './components/NotFound'

import App from './containers/App'

export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={Keyboard}/>
        </Route>
        <Route path='*' component={NotFound}/>
    </div>
);