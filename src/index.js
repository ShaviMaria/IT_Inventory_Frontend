import React from 'react';
import ReactDOM from 'react-dom/client'
import Rts from './routes/Rts'
import store from './redux/store'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <Rts />
  </Provider>
  //</React.StrictMode>
);

//if (module.hot) {
  //module.hot.accept('./Index', () => {
    //const NextApp = require('./App').default;
    //renderApp(NextApp);
  //});
//}