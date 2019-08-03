import React from 'react'
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { firebase } from '../../Firebase';

export default function AdminNav() {
    const logOutHandler = () => {
        firebase.auth().signOut().then(() => {
            console.log('logout');
        }, (error) => {
            console.logo('error')
        })
    }
    const links = [
        {
            title: 'Matches',
            linkTo: '/admin_match'
        },
        {
            title: 'Add Match',
            linkTo: '/admin_match/add_match'
        },
        {
            title: 'Players',
            linkTo: './admin_players'
        },
        {
            title: 'Add Players',
            linkTo: './admin_players/add_players'
        },
    ]

    const renderItems = () => (
        links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button style={{
                    color: '#ffffff',
                    fontWeight: '300',
                    borderBottom: '1px solid #353535',
                    padding: '15px 25px',
                    display: 'block',
                    fontSize: '14px'
                }}>
                    {link.title}
                </ListItem>
            </Link>
        ))
    )
    return (
        <div>
            {renderItems()}
            <ListItem button style={{
                color: '#ffffff',
                fontWeight: '300',
                borderBottom: '1px solid #353535',
                padding: '15px 25px',
                display: 'block',
                fontSize: '14px'
            }} onClick={() => logOutHandler()}>
                Log Out
            </ListItem>
        </div>
    )
}
