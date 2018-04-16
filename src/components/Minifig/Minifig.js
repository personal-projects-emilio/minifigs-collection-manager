import React from 'react';

import classes from './Minifig.css';

const minifig = (props) => (
	<div className={classes.Minifig}>
		<p><span>{props.reference+" "}</span>{props.name}</p>
		<p><a target="_blank" href={"https://brickset.com/minifigs/"+props.reference}>Brickset</a></p>
		<p><a target="_blank" href={"https://www.bricklink.com/v2/catalog/catalogitem.page?M="+props.reference}>Bricklink</a></p>
	</div>
)

export default minifig;
	