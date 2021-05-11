import React, { useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Layout from '~/components/DashboardApp/Layout';
import Responsive from '~/components/Responsive';
import UnitInput from '../MiniDashboard/UnitInput';

const Home = () => {
    const [value, setValue] = useState<[string | number, string]>([100, ''])
   return <div>
    <div style={{width: '250px', backgroundColor: '#fff'}}>
        <UnitInput onChange={(val) => {
            setValue(val);
            console.log(val);
        }} defaultValue={[100, '']} label="页面标签" />
        <br />
        {value}
    </div>
</div>
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
