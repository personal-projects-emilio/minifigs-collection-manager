import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Frames from './containers/Frames/Frames';
import Minifigs from './containers/Minifigs/Minifigs';

class App extends Component {
    render() {
        return (
        <Layout>
            <Switch>
                <Route path="/frames" component={Frames} />
                <Route path="/" component={Minifigs} />
            </Switch>
        </Layout>
        );
    }
}

export default App;
