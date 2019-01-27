import React from 'react';
import classes from './Dropdown.css';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { IconButton, Icon } from '@material-ui/core';

const dropdown = (props) => {
    // array: []<Tags or CharacNames>
    // type: "Tags" or "Character Names"
    // handler: function()

    // List of MenuItem from our props.array with a empty value
    let list = [<MenuItem value={""} key={props.type+"-null"}>None</MenuItem>];
    if (props.array) {
        props.array.forEach(item =>
            list.push(<MenuItem value={item.name} key={item.name}>{item.name+" ("+item.amount+")"}</MenuItem>)
        )
    }

    // We show a clear icon button if there is a selected item
    let clearButton = null;
    if (props.itemSelected !== "") {
        clearButton = (
            <IconButton color="primary" onClick={props.handler}>
                    <Icon>clear</Icon>
            </IconButton>
        )
    }

    return (
        <div className={classes.Dropdown}>
            <FormControl fullWidth>
                <InputLabel shrink htmlFor={props.type}>
                    {props.type}
                </InputLabel>
                <Select value={props.itemSelected}
                        onChange={props.handler}
                        displayEmpty
                        autoWidth
                        input={<Input name={props.type} id={props.type} />}>
                    {list}
                </Select>
            </FormControl>
            {clearButton}
        </div>

    )
}


export default dropdown;

