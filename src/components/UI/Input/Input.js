import React from 'react';
import classes from './Input.css';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Aux from '../../../hoc/Auxilliary/Auxilliary';

const input = ( props ) => {
    let inputElement = null;
    let label = null;
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    let tags = null;
    if (props.tags !== null) {
        tags = props.tags.sort().map(tag => (
            <Button color="default"
                    key={tag}
                    style={{margin:6}} 
                    onClick={() => props.tagHandler(tag, "remove")}
                    variant="contained">{tag}<Icon className={classes.Icon}>delete</Icon></Button>
        ))
    }

    switch ( props.elementType ) {
        case ( 'input-list' ):
            inputElement = (
                <Aux>
                    <div className={classes.TagsInput}>
                        <input className={inputClasses.join(' ')}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed} />
                        <Button color="default"
                                style={{margin:6}} 
                                onClick={() => props.tagHandler(props.value, "add")}
                                variant="contained"><Icon className={classes.Icon}>add_circle</Icon></Button>
                    </div>
                    {tags.length ? tags : <p>You can add a tag by clicking on the + button</p>}
                </Aux>
                
            );
            break;
        case ('input'): 
            inputElement = <input className={inputClasses.join(' ')}
                                  {...props.elementConfig}
                                  value={props.value}
                                  onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea className={inputClasses.join(' ')}
                                     {...props.elementConfig}
                                     value={props.value}
                                     onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                        ))}
                </select>
            );
            break;
        case ('checkbox'):
            inputElement = (
                <input className={inputClasses.join(' ')}
                       {...props.elementConfig}
                       value={props.value}
                       onChange={props.changed}
                />
            );
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')}
                                  {...props.elementConfig}
                                  value={props.value}
                                  onChange={props.changed} />;
    }

    switch (props.id) {
        case('ref'): label = "Reference"; break;
        case('name'): label = "Name"; break;
        case('characName'): label = "Character Name"; break;
        case('tags'): label = "Tags"; break;
        case('possessed'): label = "Collection status"; break;
        default: label = null;
    }
    let datalist = null;
    if (props.datalist !== null) {
        datalist = (
            <datalist id={props.elementConfig.list}>
                {props.datalist.map(option => <option value={option.name} key={option.name} />)}
            </datalist>
        )
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
            {datalist}
        </div>
    );

};

export default input;