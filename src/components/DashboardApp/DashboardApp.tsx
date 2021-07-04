import React, { useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Layout from '~/components/DashboardApp/Layout';
import Responsive from '~/components/Responsive';
import request from '~/core/request';

const Home = () => {
   return <div>home</div>
};

interface Props {}

const Dashboardapp: React.FC<Props> = () => {
    useEffect(() => {
        request.get('/api/template/getItem').then(res => console.log(3333,res))
    }, [])
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
