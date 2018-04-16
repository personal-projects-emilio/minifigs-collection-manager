import React from 'react';

import classes from './Header.css';

const header = (props) => (
	<header className={classes.header}>
		<h1 className={classes.title}>Minifigs Collection Manager</h1>
	</header>
);

export default header;