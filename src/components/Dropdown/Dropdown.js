import React from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

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
}
	

export default dropdown;

