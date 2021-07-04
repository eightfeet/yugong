import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Layout from '~/components/DashboardApp/Layout';
import Responsive from '~/components/Responsive';

const Home = () => {
   return <div>home</div>
};

interface Props {}

const Dashboardapp: React.FC<Props> = () => {
    return (
        <Router>
            <Layout>
                <Route path="/" exact component={Home} />
                <Route path="/project" component={Responsive} />
            </Layout>
        </Router>
    );
};

export default Dashboardapp;
