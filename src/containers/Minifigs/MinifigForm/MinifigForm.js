import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import Input from '../../../components/UI/Input/Input';
import {updateObject, checkValidity} from '../../../shared/utility';
import Button from '@material-ui/core/Button';

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
            tags: {
                elementType: 'input-list',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Tag',
                    list: "tags"
                },
                datalist: null,
                value: '',
                tags: [],
                validation: {},
                valid: true,
                touched: false
            },
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
            const minifigRef = this.props.minifigRef;
            const updatedefValidation = updateObject(minifigForm["ref"].validation, {ref: minifigRef})
            const updatedRef = updateObject(minifigForm["ref"], {value: minifigRef, valid: true, validation: updatedefValidation});
            const updatedName = updateObject(minifigForm["name"], {value: minifig.name, valid: true});
            const updatedcharacName = updateObject(minifigForm["characName"], {value: minifig.characterName, valid: true});
            const updatedTags = updateObject(this.state.minifigForm["tags"], {tags: minifig.tags});
            const updatedPossession = updateObject(minifigForm["possessed"], {value: minifig.possessed, valid: true});
            const updatedForm = updateObject(minifigForm, {
                ref : updatedRef,
                name : updatedName,
                characName : updatedcharacName,
                tags: updatedTags,
                possessed: updatedPossession
            });
            this.setState({minifigForm: updatedForm, formIsValid: true});
        }
    }

    componentDidUpdate() {
        if (this.props.minifigs && JSON.stringify(this.state.minifigForm["ref"].validation.isARef) !== JSON.stringify(Object.keys(this.props.minifigs))
            && this.props.characNames && JSON.stringify(this.state.minifigForm["characName"].datalist) !== JSON.stringify(this.props.characNames)
            && this.props.tags && JSON.stringify(this.state.minifigForm["tags"].datalist) !== JSON.stringify(this.props.tags)) {
            const updatedRefValidation = updateObject(this.state.minifigForm["ref"].validation, {isARef: Object.keys(this.props.minifigs)})
            const updatedRef = updateObject(this.state.minifigForm["ref"], {validation: updatedRefValidation});
            const updatedTags = updateObject(this.state.minifigForm["tags"], {datalist: this.props.tags});
            const updatedcharacName = updateObject(this.state.minifigForm["characName"], {datalist: this.props.characNames})
            const updatedForm = updateObject(this.state.minifigForm, {ref: updatedRef, characName: updatedcharacName, tags: updatedTags})
            this.setState({minifigForm: updatedForm});
        }
    }

    tagHandler = (tag, action) => {
        let tags = [...this.state.minifigForm["tags"].tags];
        let value = this.state.minifigForm["tags"].value;
        let tagTrim = tag.trim();
        if (tagTrim !== "") {
            if (action === "remove") {
                const index = tags.indexOf(tagTrim);
                tags.splice(index, 1);
            }
            if (action === "add") {
                if (tags.indexOf(tagTrim) === -1) {
                    tags.push(tagTrim)
                }
                value = "";
            }
        }
        tags.sort();
        const updatedTags = updateObject(this.state.minifigForm["tags"], {tags: tags, value: value} );
        const updatedForm = updateObject(this.state.minifigForm, {tags: updatedTags})
        this.setState({minifigForm: updatedForm});
    }

    submitHandler = (event) => {
        event.preventDefault();
        const minifigRef = this.state.minifigForm.ref.value.trim();
        const minifigData = {
                characterName: this.state.minifigForm.characName.value.trim(),
                name: this.state.minifigForm.name.value.trim(),
                possessed: JSON.parse(this.state.minifigForm.possessed.value),
                tags: this.state.minifigForm.tags.tags
        }
        
        // If a change was made
        if (JSON.stringify(minifigData) !== JSON.stringify(this.props.minifig)
        || minifigRef !== this.props.minifigRef) {
            const oldMinifigRef = minifigRef === this.props.minifigRef ? null : this.props.minifigRef;
            this.props.minifigFormHandler(minifigRef, oldMinifigRef, minifigData, this.props.edit);
        }
        this.props.onSubmit();
        this.resetForm();
    }

    resetForm = () => {
        const minifigForm = this.state.minifigForm;
        const updatedMinifigRef = updateObject(minifigForm["ref"], {value: "", valid: false, touched: false});
        const updatedMinifigName = updateObject(minifigForm["name"], {value: "", valid: false, touched: false});
        const updatedMinifigcharacName = updateObject(minifigForm["characName"], {value: "", valid: false, touched: false});
        const updatedMinifigTags = updateObject(minifigForm["tags"], {value: "", valid: false, touched: false, tags: []});
        const updatedMinifigPossession = updateObject(minifigForm["possessed"], {value: false, valid: true});
        const updatedMinifigForm = updateObject(minifigForm, {
                ref : updatedMinifigRef,
                name : updatedMinifigName,
                characName : updatedMinifigcharacName,
                tags: updatedMinifigTags,
                possessed: updatedMinifigPossession
            });
        this.setState({minifigForm: updatedMinifigForm, formIsValid: false});
    }
    
    inputChangedHandler = (event, inputIdentifier) => {
        // We update the element with the value, we check for validity and we set touched to true
        const updatedMinifigElement = updateObject(this.state.minifigForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.minifigForm[inputIdentifier].validation),
            touched: true
        }) ;
        // We update the form
        const updatedMinifigForm = updateObject(this.state.minifigForm, { [inputIdentifier] : updatedMinifigElement });
        // We check is the formIsValid   
        let formIsValid = true;
        for (let inputIdentifier in updatedMinifigForm) {
            formIsValid = updatedMinifigForm[inputIdentifier].valid && formIsValid;
        }
        // We set the state with our updated form
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
            <form onSubmit={this.submitHandler}>
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
                           tags={formElement.config.tags ? formElement.config.tags : null}
                           tagHandler={(tag, action) => this.tagHandler(tag, action)}
                    />
                ))}
                <Button disabled={!this.state.formIsValid}
                        variant="contained"
                        color="primary"
                        type="submit">Submit</Button>
            </form>
        )
        return form;
    }
}

//We get redux state and action
const mapStateToProps = state => {
	return {
        minifigs: state.minifigs.minifigs,
        characNames: state.minifigs.characNames,
        tags: state.minifigs.tags
	}
}

const mapDispatchToProps = dispatch => {
	return {
        minifigFormHandler: (minifigRef, oldMinifigRef, minifigData, edit) => {
            dispatch(actions.minifigFormHandler(minifigRef, oldMinifigRef, minifigData, edit))
        }        
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MinifigEdit);