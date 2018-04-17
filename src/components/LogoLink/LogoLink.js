import React from 'react';

import bricklinkLogo from '../../assets/images/logo/bricklink.png';
import bricksetLogo from '../../assets/images/logo/brickset.png';
import classes from './LogoLink.css';

const logoLink = (props) => {
	let logo = null;
	switch(props.type) {
		case 'bricklink':
			logo =  <a 	className={classes.LogoLink} 
						href={"https://www.bricklink.com/v2/catalog/catalogitem.page?M="+props.minifigRef} 
						target="_blank">
							<img alt='bricklink logo' src={bricklinkLogo} />
					</a>
			break;
		case 'brickset':
			logo =  <a 	className={classes.LogoLink} 
						href={'https://brickset.com/minifigs/'+props.minifigRef} 
						target="_blank">
							<img alt='brickset logo' src={bricksetLogo} />
					</a>
			break;
		default: break;
	}

	return logo;
}

export default logoLink;
	