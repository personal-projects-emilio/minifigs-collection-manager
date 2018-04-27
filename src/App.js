import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import Minifigs from './containers/Minifigs/Minifigs';
import MinifigsMenu from './containers/MinifigsMenu/MinifigsMenu';

class App extends Component {
  render() {
    return (
      <Layout>
        <MinifigsMenu />
        <Minifigs />
      </Layout>
    );
  }
}

export default App;
