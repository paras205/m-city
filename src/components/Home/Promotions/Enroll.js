import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import FormFields from '../../../Ui/formFields';
import { validate } from '../../../Ui/misc';
import { firebasePromotions } from '../../../Firebase';

export default class Enroll extends Component {
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
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once("value")
                .then((snapshot) => {
                    if (snapshot.val() === null) {
                        firebasePromotions.push(dataToSubmit);
                        this.resetFormSuccess(true);
                    } else {
                        this.resetFormSuccess(false);
                    }
                })
            // this.resetFormSuccess()
        } else {
            this.setState({
                formError: true
            })
        }
    }
    resetFormSuccess(type) {
        const newFormdata = {
            ...this.state.formdata
        }
        for (let key in newFormdata) {
            newFormdata[key].value = '';
            newFormdata[key].valid = false;
            newFormdata[key].validationMessage = false;
        }
        this.setState({
            formError: false,
            formdata: newFormdata,
            formSuccess: type ? 'Congratulations' : 'Already on the database'
        })
        this.clearSuccessMessage();
    }
    clearSuccessMessage() {
        setTimeout(() => {
            this.setState({
                formSuccess: ''
            })
        }, 2000)
    }

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <div className="enroll_title">Enter Your Email</div>
                        <div className="enroll_input">
                            <FormFields
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element) => this.updateForrm(element)}
                            />
                            {this.state.formError ?
                                <div className="error_label">
                                    something is wrong
                                </div> : null}
                            <div className="success_label">{this.state.formSuccess}</div>
                            <button onClick={(event) => this.submitForm(event)}>Enroll</button>
                        </div>
                    </form>
                </div>
            </Fade>
        )
    }
}
