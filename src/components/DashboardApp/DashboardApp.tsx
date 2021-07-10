import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Layout from "~/components/DashboardApp/Layout";
import Responsive from "~/components/Responsive";
import Home from "~/dashboardRouter/Home";
import PageLogin from "~/dashboardRouter/PageLogin";

interface Props {}

const Dashboardapp: React.FC<Props> = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={PageLogin} />
        <Route path="/project" component={Responsive} />
        <Route path="/404" component={() => <div>找不到页面</div>} />
        <Route path="*" redirect='/404' />
      </Layout>
    </Router>
  );
};

export default Dashboardapp;
