import React from 'react';

import classes from './Minifig.css';
import LogoLink from '../LogoLink/LogoLink';

const minifig = (props) => (
	<div className={classes.Minifig}>
		<p>{props.name}</p>
		<img className={classes.MinifigPicture} src={'http://img.bricklink.com/ItemImage/MN/0/'+props.reference+'.png'} alt={props.reference + ' pictures'} />
		<span>{props.reference}</span>
		<div className={classes.LogoLinks}>
			<LogoLink minifigRef={props.reference} type={'bricklink'} />
			<LogoLink minifigRef={props.reference} type={'brickset'} />
		</div>
	</div>
)

export default minifig;
	