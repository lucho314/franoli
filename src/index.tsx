import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// third party
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// style + assets
import './assets/scss/style.scss';
import * as serviceWorker from './serviceWorker';
// project imports
import { store } from './store';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Could not find root element');
}

// ===========================|| REACT DOM RENDER  ||=========================== //

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,

    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
