import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/minifigs';

import Input from '../../../components/UI/Input/Input';
import {updateObject, checkValidity} from '../../../shared/utility';

export class MinifigEdit extends Component {
    state = {
        minifigForm: {
            ref: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Minifig Reference'
                },
                value: '',
                validation: {
                    required: true,
                    isARef: null,
                    ref: null
                },
                valid: false,
                touched: false
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Minifig Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            characName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Character Name',
                    list: "characNames"
                },
                datalist: null,
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            // tags: {
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'text',
            //         placeholder: 'Tag',
            //         list: "tags"
            //     },
            //     datalist: null,
            //     value: '',
            //     tags: [],
            //     validation: {
            //         required: true
            //     },
            //     valid: false,
            //     touched: false
            // },
            possessed: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: false, displayValue: 'Missing' },
                        {value: true, displayValue: 'Possessed'}
                    ]
                },
                value: false,
                validation: {},
                valid: true
            }     
        },
        formIsValid: false
    }

    componentDidMount () {
        // We update the value of the form if we're in edit mode
        if (this.props.edit && this.props.minifig !== null) {
            const minifigForm = this.state.minifigForm;
            const minifig = this.props.minifig;
            const updatedMinifigRefValidation = updateObject(minifigForm["ref"].validation, {ref: minifig.ref})
            const updatedMinifigRef = updateObject(minifigForm["ref"], {value: minifig.ref, valid: true, validation: updatedMinifigRefValidation});
            const updatedMinifigName = updateObject(minifigForm["name"], {value: minifig.name, valid: true});
            const updatedMinifigcharacName = updateObject(minifigForm["characName"], {value: minifig.characterName, valid: true});
            const updatedMinifigPossession = updateObject(minifigForm["possessed"], {value: minifig.possessed, valid: true});
            const updatedMinifigForm = updateObject(minifigForm, {
                ref : updatedMinifigRef,
                name : updatedMinifigName,
                characName : updatedMinifigcharacName,
                possessed: updatedMinifigPossession
            });
            this.setState({minifigForm: updatedMinifigForm, formIsValid: true});
        }
    }

    componentDidUpdate() {
        if (this.props.minifigs && this.state.minifigForm["ref"].validation.isARef === null
            && this.props.characNames && this.state.minifigForm["characName"].datalist === null) {
            const updatedRefValidation = updateObject(this.state.minifigForm["ref"].validation, {isARef: Object.keys(this.props.minifigs)})
            const updatedRef = updateObject(this.state.minifigForm["ref"], {validation: updatedRefValidation});
            //const updatedTags = updateObject(this.state.minifigForm["tags"], {datalist: this.props.tags});
            const updatedcharacName = updateObject(this.state.minifigForm["characName"], {datalist: this.props.characNames})
            const updatedForm = updateObject(this.state.minifigForm, {ref: updatedRef, characName: updatedcharacName})
            this.setState({minifigForm: updatedForm});
        }
    }

    minifigHandler = (event) => {
        event.preventDefault();

        // Be carefull we are using JSON.stringify below so the order of the properties is important!!!!! 
        const minifigData = {
                ref: this.state.minifigForm.ref.value,
                characterName: this.state.minifigForm.characName.value,
                name: this.state.minifigForm.name.value,
                possessed: JSON.parse(this.state.minifigForm.possessed.value),
                tags: []
        }

        // We only edit if there was any change in edit mode or if we are adding a new minifig     
        if (JSON.stringify(minifigData) !== JSON.stringify(this.props.minifig)) {
            //this.props.editMinifigServer(this.props.minifig.ref, minifigData);
            const ref = this.props.minifig ? this.props.minifig.ref :null;
            this.props.editMinifig(ref, minifigData);
            
            const charcName = this.props.minifig ? this.props.minifig.characterName : null;
            if (!this.props.edit || (minifigData.characterName !== charcName)) {
                this.props.updateCharacNames(charcName, minifigData.characterName)
            }
        }
        this.props.onSubmit();
        const minifigForm = this.state.minifigForm;
        const updatedMinifigRef = updateObject(minifigForm["ref"], {value: "", valid: false, touched: false});
            const updatedMinifigName = updateObject(minifigForm["name"], {value: "", valid: false, touched: false});
            const updatedMinifigcharacName = updateObject(minifigForm["characName"], {value: "", valid: false, touched: false});
            const updatedMinifigPossession = updateObject(minifigForm["possessed"], {value: false, valid: true});
            const updatedMinifigForm = updateObject(minifigForm, {
                ref : updatedMinifigRef,
                name : updatedMinifigName,
                characName : updatedMinifigcharacName,
                possessed: updatedMinifigPossession
            });
            this.setState({minifigForm: updatedMinifigForm, formIsValid: false});
    }

    // Handler for the input change
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedMinifigElement = updateObject(this.state.minifigForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.minifigForm[inputIdentifier].validation),
            touched: true
        }) ;

        const updatedMinifigForm = updateObject(this.state.minifigForm, {
            [inputIdentifier] : updatedMinifigElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedMinifigForm) {
            formIsValid = updatedMinifigForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({minifigForm: updatedMinifigForm, formIsValid: formIsValid});
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.minifigForm){
            formElementArray.push({
                id: key,
                config: this.state.minifigForm[key]
            })
        }
        let form = (
            <form onSubmit={this.minifigHandler}>
                {formElementArray.map(formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.config.elementType}
                           id={formElement.id}
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value}
                           invalid={!formElement.config.valid}
                           shouldValidate={formElement.config.validation}
                           touched={formElement.config.touched}
                           datalist={formElement.config.datalist ? formElement.config.datalist : null}
                           changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <button disabled={!this.state.formIsValid}>Submit</button>
            </form>
        )
        return ( 
            <div>
                {form}
            </div>
        )
    }
}

//We get redux state and action
const mapStateToProps = state => {
	return {
        minifigs: state.minifigs,
        characNames: state.characNames,
        tags: state.tags
	}
}

const mapDispatchToProps = dispatch => {
	return {
        //editMinifigServer: (ref, updatedMinifig) => dispatch(actions.editMinifigServer(ref, updatedMinifig)),
        editMinifig: (ref, updatedMinifig) => dispatch(actions.editMinifig(ref, updatedMinifig)),
        updateCharacNames: (oldName, newName) => dispatch(actions.updateCharacNames(oldName, newName))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MinifigEdit);