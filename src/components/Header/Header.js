import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Header.css';

const header = (props) => (
	<header className={classes.Header}>
		<div>
            <NavLink to="/"><h1 className={classes.Title}>Minifigs Collection Manager</h1></NavLink>
        </div>
        <nav>
            <ul className={classes.Nav}>
                <li className={classes.Link}>
                    <NavLink to="/">Minifigs</NavLink>
                </li>
                <li className={classes.Link}>
                    <NavLink to="/frames">Frames</NavLink>
                </li>
            </ul>
        </nav>
	</header>
);

export default header;