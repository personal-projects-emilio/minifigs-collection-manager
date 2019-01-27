import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
//import classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import Button  from '@material-ui/core/Button';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    componentDidMount () {
        if (this.props.authRedirectPath !== '/' ) {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }


    render () {
        let redirect = null;
        if (this.props.isAuth) {
            redirect = <Redirect to='/' />
        };
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
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
                <Button variant="contained"
                        //disabled={!this.state.formIsValid}
                        color="primary"
                        type="submit">Submit</Button>
            </form>
        )

        return (
            <div>{redirect}{form}</div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
    onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
    onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
});

export default connect( mapStateToProps, mapDispatchToProps )( Auth );