import React from 'react';

import classes from './Minifig.css';
import LogoLink from '../LogoLink/LogoLink';

const minifig = (props) => (
	<div className={classes.Minifig}>
		{/*Picture and reference of the minifig*/}
		<div>
			<img className={classes.MinifigPicture} src={'http://img.bricklink.com/ItemImage/MN/0/'+props.reference+'.png'} alt={props.reference + ' pictures'} />
			<span>{props.reference}</span>		
		</div>
		<div className={classes.LogoLinks}>
			{/*Bricklink and Brickset logo with links*/}
			<LogoLink minifigRef={props.reference} type={'bricklink'} />
			<LogoLink minifigRef={props.reference} type={'brickset'} />
		</div>
	</div>
)

export default minifig;
	