import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import Layout from '~/components/DashboardApp/Layout';
import Responsive from '~/components/Responsive';
import Home from '~/dashboardRouter/Home';
import PageLogin from '~/dashboardRouter/PageLogin';
import PageRegister from '~/dashboardRouter/PageRegister';

interface Props {}

const Dashboardapp: React.FC<Props> = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={PageLogin} />
                    <Route path="/register" component={PageRegister} />
                    <Route path="/project" component={Responsive} />
                    <Route path="*" component={() => <div>404找不到页面</div>} />
                </Switch>
            </Layout>
        </Router>
    );
};

export default Dashboardapp;
