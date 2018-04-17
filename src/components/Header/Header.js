import React from 'react';

import classes from './Header.css';

const header = (props) => (
	<header className={classes.Header}>
		<h1 className={classes.Title}>Minifigs Collection Manager</h1>
	</header>
);

export default header;