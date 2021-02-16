import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import reportWebVitals from "~/reportWebVitals";
import Layout from "~/components/Layout";
import Responsive from "~/components/Responsive";
import { Provider } from "react-redux";
import { store } from "~/redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <Responsive />
      </Layout>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
