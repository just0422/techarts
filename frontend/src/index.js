import './stylesheets/index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import Index from "./components/Index"
import store from "./store"

const app = document.getElementById('app');
ReactDOM.render(<Provider store={store}>
    <Index />
</Provider>, app)

registerServiceWorker();
