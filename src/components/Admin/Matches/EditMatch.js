import React, { Component } from 'react'
import AdminLayout from '../../../Hoc/AdminLayout';
import FormFields from '../../../Ui/formFields';
import { validate } from '../../../Ui/misc';
import { firebaseTeams, firebaseDB, firebaseMatches } from '../../../Firebase';
import { firebaseLooper } from '../../../Ui/misc';
export default class EditMatch extends Component {
    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formdata: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event Date',
                    name: 'date_input',
                    type: 'date'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a local team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a Away team',
                    name: 'select_away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Away',
                    name: 'result_away_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Team Result',
                    name: 'select_result',
                    type: 'select',
                    options: [
                        { key: 'W', value: 'W' },
                        { key: 'L', value: 'L' },
                        { key: 'D', value: 'D' },
                        { key: 'n/a', value: 'n/a' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game Played',
                    name: 'select_played',
                    type: 'select',
                    options: [
                        { key: 'Yes', value: 'Yes' },
                        { key: 'No', value: 'No' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
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
    updateFields(match, teamOptions, teams, type, matchId) {
        const newFormdata = {
            ...this.state.formdata
        }
        for (let key in newFormdata) {
            if (match) {
                newFormdata[key].value = match[key];
                newFormdata[key].valid = true;
            }
            if (key === 'local' || key === 'away') {
                newFormdata[key].config.options = teamOptions
            }

        }
        this.setState({
            matchId,
            formType: type,
            formdata: newFormdata,
            teams
        })
    }
    componentDidMount() {
        const matchId = this.props.match.params.id;
        const getTeams = (match, type) => {
            firebaseTeams.once('value').then((snapshot) => {
                const teams = firebaseLooper(snapshot);
                const teamOptions = [];
                snapshot.forEach((childSnapShot) => {
                    teamOptions.push({
                        key: childSnapShot.val().shortName,
                        value: childSnapShot.val().shortName
                    });
                    // console.log(teamOptions);
                    this.updateFields(match, teamOptions, teams, type, matchId)
                })
            })
        }
        if (!matchId) {
            getTeams(false, 'Add Match')
        } else {
            firebaseDB.ref(`matches/${matchId}`).once('value').then((snapshot) => {
                const match = snapshot.val();
                // console.log(match);
                getTeams(match, 'Edit Match')
            })
        }
        // console.log(matchId);
    }
    successForm(message) {
        this.setState({
            formSuccess: message
        });
        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
        }, 2000)
    }
    submitForm(event) {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;
        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }
        this.state.teams.forEach((team) => {
            if (team.shortName === dataToSubmit.local) {
                dataToSubmit['localThmb'] = team.thmb
            }
            if (team.shortName === dataToSubmit.away) {
                dataToSubmit['awayThmb'] = team.thmb
            }
        })
        if (formIsValid) {
            if (this.state.formType === 'Edit Match') {
                firebaseDB.ref(`matches/${this.state.matchId}`)
                    .update(dataToSubmit).then(() => {
                        this.successForm('Updated')
                    }).catch((e) => {
                        this.setState({
                            formError: true
                        })
                    })
            } else {
                firebaseMatches.push(dataToSubmit).then(() => {
                    this.props.history.push('/admin_match');
                }).catch((e) => {
                    this.setState({
                        formError: true
                    })
                })
            }
            // console.log(dataToSubmit);

        } else {
            this.setState({
                formError: true
            })
        }
    }
    render() {
        return (
            <AdminLayout>

                <div className="editmatch_dialog_wrapper">
                    <h2>{this.state.formType}</h2>
                    <div>
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormFields
                                id={'date'}
                                formdata={this.state.formdata.date}
                                change={(element) => this.updateForrm(element)}
                            />
                            <div className="select_team_layout">
                                <div className="label_inputs">Local</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormFields
                                            id={'local'}
                                            formdata={this.state.formdata.local}
                                            change={(element) => this.updateForrm(element)}
                                        />
                                    </div>
                                    <div>
                                        <FormFields
                                            id={'resultLocal'}
                                            formdata={this.state.formdata.resultLocal}
                                            change={(element) => this.updateForrm(element)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormFields
                                            id={'away'}
                                            formdata={this.state.formdata.away}
                                            change={(element) => this.updateForrm(element)}
                                        />
                                    </div>
                                    <div>
                                        <FormFields
                                            id={'resultAway'}
                                            formdata={this.state.formdata.resultAway}
                                            change={(element) => this.updateForrm(element)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="split_fields">
                                <FormFields
                                    id={'referee'}
                                    formdata={this.state.formdata.referee}
                                    change={(element) => this.updateForrm(element)}
                                />
                                <FormFields
                                    id={'stadium'}
                                    formdata={this.state.formdata.stadium}
                                    change={(element) => this.updateForrm(element)}
                                />
                            </div>
                            <div className="split_fields last">
                                <FormFields
                                    id={'result'}
                                    formdata={this.state.formdata.result}
                                    change={(element) => this.updateForrm(element)}
                                />
                                <FormFields
                                    id={'final'}
                                    formdata={this.state.formdata.final}
                                    change={(element) => this.updateForrm(element)}
                                />
                            </div>
                            <div className="success_label">{this.state.formSuccess}</div>
                            {this.state.formError ?
                                <div className="error_label">Something is wrong</div>
                                : null
                            }
                            <div className="admin_submit">
                                <button onClick={(event) => this.submitForm(event)}>
                                    {this.state.formType}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        )
    }
}
