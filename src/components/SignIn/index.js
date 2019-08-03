import React, { Component } from 'react';
import { firebase } from '../../Firebase';

import FormFields from '../../Ui/formFields';
import { validate } from '../../Ui/misc';

export default class SignIn extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Enter Your Email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Enter Your Password'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    }
    updateForrm(element) {
        // console.log(element);
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        newElement.value = element.event.target.value;
        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        newFormdata[element.id] = newElement;
        // console.log(newFormdata);
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }
    submitForm(event) {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;
        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }
        if (formIsValid) {
            firebase.auth()
                .signInWithEmailAndPassword(
                    dataToSubmit.email,
                    dataToSubmit.password
                ).then(() => {
                    this.props.history.push('/dashboard');
                }).catch(error => {
                    this.setState({
                        formError: true
                    })
                })
        } else {
            this.setState({
                formError: true
            })
        }
    }
    render() {
        return (
            <div className="container">
                <div className="signin_wrapper" style={{
                    margin: "100px"
                }}>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <h2>Please Login </h2>
                        <FormFields
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element) => this.updateForrm(element)}
                        />
                        <FormFields
                            id={'password'}
                            formdata={this.state.formdata.password}
                            change={(element) => this.updateForrm(element)}
                        />
                        {this.state.formError ?
                            <div className="error_label">
                                something is wrong
                                </div> : null}
                        <button onClick={(event) => this.submitForm(event)}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}
