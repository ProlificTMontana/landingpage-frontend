import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// Imported before index.css: this package ships prebuilt Tailwind utilities
// (.flex, .flex-col, .flex-row ...) that would otherwise be emitted last and
// override our responsive variants such as lg:flex-row.
import '@devnomic/marquee/dist/index.css';
import './index.css';
import App from './App';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
