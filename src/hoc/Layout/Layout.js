import React, {Component} from 'react';

import Aux from '../Auxilliary/Auxilliary';
import Header from '../../components/Header/Header';
import classes from './Layout.css'

class Layout extends Component {
	render () {
		return (
			<Aux>
				<Header />
				<main className={classes.Main}>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
	