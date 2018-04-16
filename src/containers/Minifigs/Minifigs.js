import React, {Component} from 'react';

import classes from './Minifigs.css';
import Minifig from '../../components/Minifig/Minifig';

class Minifigs extends Component {
	// We'll get a complet list in a database with redux and axios later on
	state = {
		minifigs: [
			{
				ref: 'SW001a',
				name: 'Battle Droid Tan with Back Plate',
				possesed: false
			},
			{
				ref: 'SW001b',
				name: 'Battle Droid Tan without Back Plate',
				possesed: true
			},
			{
				ref: 'SW001c',
				name: 'Battle Droid Tan with 1 straight Arm',
				possesed: true
			},
			{
				ref: 'SW001d',
				name: 'Battle Droid Tan with 2 straight arms',
				possesed: true
			},
			{
				ref: 'SW002',
				name: 'Boba Fett - Classic Grays',
				possesed: true
			},
			{
				ref: 'SW002a',
				name: 'Boba Fett - Bluish Grays',
				possesed: true
			}
		]
		/*bricklink and brickset links will be add with the ref in a modele url,
		the same for the picture from bricklink so we don't need much more for the moment.*/
	}

	render () {
		return (
			<div className={classes.Minifigs}>
				{this.state.minifigs.map(minifig => (
					<Minifig 
						key={minifig.ref}
						reference={minifig.ref}
						name={minifig.name}
						possesed={minifig.possesed}
					/>
				))}
			</div>
		);
	}
}

export default Minifigs;


