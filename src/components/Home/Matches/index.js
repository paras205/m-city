import React from 'react'
import { Tag } from '../../../Ui/misc';
import Blocks from './Blocks';

export default function MatchesHome() {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag
                    bck="#0e1731"
                    size="50px"
                    color="#fff"
                >
                    Matches
                </Tag>
                <Blocks />
                <Tag
                    bck="#fff"
                    size="22px"
                    color="#0e1731"
                    link={true}
                    linkTo="/the_team"
                >
                    see more matches
              </Tag>
            </div>
        </div>
    )
}
