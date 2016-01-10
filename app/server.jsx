import React from 'react';
import {renderToString} from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
// import createLocation from 'history/lib/createLocation';
// import fetch from 'isomorphic-fetch';
import { Provider } from 'react-redux';
import routes from 'routes';
// import configureStore from 'store/configureStore';
// import headconfig from 'elements/Header';

// const clientConfig = {
//   host: process.env.HOSTNAME || 'localhost',
//   port: process.env.PORT || '3000'
// };


import {createStore} from "redux";
import todoApp from "./reducers/reducers";


var renderFullPage = (renderedContent, initialState, head={
  title: '<title>React Webpack Node</title>',
  meta: '<meta name="viewport" content="width=device-width, initial-scale=1" />',
  link: '<link rel="stylesheet" href="/assets/styles/main.css"/>'
})=> {
  return `
  <!doctype html>
    <html lang="">

    <head>
        ${head.title}

        ${head.meta}

        ${head.link}
    </head>
    <body>
    <div id="app">${renderedContent}</div>

    // <script>
    //   window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    // </script>
    <script type="text/javascript" charset="utf-8" src="/assets/app.server.js"></script>
    </body>
    </html>
  `;
}




export default (req, res)=> {
  match({routes, location: req.url}, (error, redirectLocation, renderProps)=>{
    if(error){
      res.status(500).send(error.message);
    }else if (redirectLocation){
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }else if (renderProps) {
      const initializeState = {
        visibilityFilter: 'SHOW_ALL',
        visibleTodos: [{
          text: '1111',
          completed: true
        }]
      }
      let store = createStore(todoApp, initializeState);
      const renderedContent = renderToString(
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      )
      console.log("llllllllllllll", renderedContent);
      const renderPage = renderFullPage(renderedContent, {});
      res.status(200).send(renderPage);
    }else{
      res.status(404).send('Not Found');
    }
  })

}
