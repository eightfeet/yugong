import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import Layout from "~/components/DashboardApp/Layout";
import Responsive from "~/components/Responsive";
import Home from "~/dashboardRouter/Home";
import PageLogin from "~/dashboardRouter/PageLogin";
import PageRegister from "~/dashboardRouter/PageRegister";
import { Dispatch } from "~/redux/store";

interface Props {}

const Dashboardapp: React.FC<Props> = () => {
  const { userSync } = useDispatch<Dispatch>().controller;
  useEffect(() => {
    userSync()
  }, [userSync])
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={PageLogin} />
        <Route path="/register" component={PageRegister} />
        <Route path="/project" component={Responsive} />
        <Route path="/404" component={() => <div>找不到页面</div>} />
        <Route path="*" redirect='/404' />
      </Layout>
    </Router>
  );
};

export default Dashboardapp;
