import React, {Component} from 'react';

import axios from '../../axios';
import classes from './Minifigs.css';
import Minifig from '../../components/Minifig/Minifig';
import Spinner from '../../components/UI/Spinner/Spinner';

class Minifigs extends Component {
	// We'll get a complet list in a database with redux and axios later on
	state = {
		minifigs: null,
		error: false
	}

	componentDidMount () {
		axios.get('/minifigs.json')
			.then(response => {
			this.setState({minifigs: response.data, error: false});
			})
			.catch(error =>{
				this.setState({error: true });
			})
	}

	render () {
		let minifigs = this.state.error ? <p>Minifigs can't be loaded!</p> : <Spinner />;

		if(this.state.minifigs){
			minifigs = Object.keys(this.state.minifigs).map(minifig => {
				const minifigInfo = {...this.state.minifigs[minifig]};
					return (
						<Minifig
							key={minifig}
							reference={minifig}
							name={minifigInfo.name}
							possesed={minifigInfo.possesed}
						/>
					);
			})
		}

		return (
			<div className={classes.Minifigs}>
				{minifigs}
			</div>
		);
	}
}

export default Minifigs;


