import './stylesheets/index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';

import Index from "./components/Index";
import Checklist from "./components/Checklist";
import store, { history } from "./store";

const app = document.getElementById('app');

ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/checklist/:person_name/:team" name="checklist" component={Checklist} /> 
            </Switch>
        </div>
    </ConnectedRouter>
</Provider>, app)

registerServiceWorker();
