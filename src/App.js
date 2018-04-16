import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import Minifigs from './containers/Minifigs/Minifigs';

class App extends Component {
  render() {
    return (
      <Layout>
        <p>minifigs tools?</p>
        <Minifigs />
      </Layout>
    );
  }
}

export default App;
