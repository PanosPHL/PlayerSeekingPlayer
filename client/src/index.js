import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

let apiKey = fetch('/api/session/map-api-token').then(res => res.json()).then(data => apiKey = data['api_key']).then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
      <App apiKey={apiKey}/>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
