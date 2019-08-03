import React from 'react'
import { Icons } from '../../Ui/Icons';

export default function Footer() {
    return (
        <footer className="bck_blue">
            <div className="footer_logo">
                <Icons
                    width="70px"
                    height="70px"
                    link={true}
                    linkTo="/"
                />
            </div>
            <div className="footer_discl">
                Manchester City 2019. All Rights Reserved.
            </div>
        </footer>
    )
}
