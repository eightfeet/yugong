import 'whatwg-fetch';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import reportWebVitals from "~/reportWebVitals";
import BeforeOutput from '~/components/BeforeOutput';
import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

ReactDOM.render(
  <Provider store={store}>
    <BeforeOutput />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

