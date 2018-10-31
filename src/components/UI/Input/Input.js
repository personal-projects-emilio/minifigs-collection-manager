import React from 'react';

import classes from './Input.css';

const input = ( props ) => {
    let inputElement = null;
    let label = null;
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input' ):
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