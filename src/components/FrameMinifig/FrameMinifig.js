import React from 'react';
import classes from './FrameMinifig.css';

const frame = (props) => {
    let content = null;
    if (props.minifig) {
        content = (
            <React.Fragment>
            <img className={classes.Picture} 
                 src={'https://img.bricklink.com/ItemImage/MN/0/'+props.minifig+'.png'} 
                 alt={props.minifig + ' pictures'} />
            {props.name ?<a className={classes.Name}>{props.name}</a> : null}
            <a>{props.minifig}</a>
            <a>{props.set}</a>
            </React.Fragment>
        );
    } else {
        content = <div className={classes.Empty}></div>;
    }

    return (
        <div className={classes.FrameMinifig}>
            {content}
        </div>
    );

}

export default frame;