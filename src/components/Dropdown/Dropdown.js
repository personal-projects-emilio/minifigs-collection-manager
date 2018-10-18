import React from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

const dropdown = (props) => {
    // array: []<Tags or CharacNames>
    // type: "Tags" or "Character Names"
    // handler: function()
    
    let list = [<MenuItem value={null} key="null" primaryText={""}/>];

    if (props.array) {
        props.array.map(item => {
            return list.push(<MenuItem value={item.name} key={item.name} primaryText={item.name+" ("+item.amount+")"}/>)
        })
    }

    return (
        <Aux>
            <SelectField value={props.itemSelected} 
                         floatingLabelText={props.type}
                         onChange={props.handler}>
                    {list}
            </SelectField>
        </Aux>
    );

    // return (
    //     <FormControl classes={{width: '100%'}}>
    //         <InputLabel shrink htmlFor={props.type}>
    //             {props.type}
    //         </InputLabel>
    //         <Select value={props.itemSelected}
    //                 onChange={props.handler}
    //                 input={<Input name={props.type} id={props.type} />}
    //                 displayEmpty
    //                 name={props.type}>
    //             {list}
    //         </Select>
    //     </FormControl>
    // )
}
	

export default dropdown;

