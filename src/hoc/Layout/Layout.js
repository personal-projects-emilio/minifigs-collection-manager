import React, {Component} from 'react';

import Aux from '../Auxilliary/Auxilliary';

class Layout extends Component {
	render () {
		return (
			<Aux>
				<p>Toolbar, SideDrawer, Title...</p>
				<main>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
	