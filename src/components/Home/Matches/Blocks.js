import React, { Component } from 'react'
import { firebaseMatches } from '../../../Firebase';
import { firebaseLooper, reverseArray } from '../../../Ui/misc';
import MatchesBlock from '../../../Ui/MatchesBlock';
import Slide from 'react-reveal/Slide';
export default class Blocks extends Component {
    state = {
        matches: []
    }
    componentDidMount() {
        firebaseMatches.limitToLast(6).once('value').then((snapshot) => {
            const matches = firebaseLooper(snapshot)
            // console.log(matches)
            this.setState({
                matches: reverseArray(matches)
            })
        })
    }
    showMatches = (matches) => (
        matches ?
            matches.map((match) => (
                <Slide bottom key={match.id}>
                    <div className="item">
                        <div className="wrapper">
                            <MatchesBlock match={match} />
                        </div>
                    </div>
                </Slide>
            )) : null
    )
    render() {
        return (
            <div className="home_matches">
                {this.showMatches(this.state.matches)}
            </div>
        )
    }
}
