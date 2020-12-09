import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Cookie from 'js-cookie';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.Cookie = Cookie;
}

let mapsApiKey;

fetch('/api/session/map-api-token')
    .then(res => res.json())
    .then(data => mapsApiKey = data['api_key'])
    .then(() => fetch('/api/session/csrf'))
    .then(() => {
      ReactDOM.render(
        <React.StrictMode>
          <Provider store={store}>
          <App mapsApiKey={mapsApiKey}/>
          </Provider>
        </React.StrictMode>,
        document.getElementById('root')
      );
    });
