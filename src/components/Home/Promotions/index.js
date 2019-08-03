import React from 'react'
import PromotionsAnimation from './Animation';
import Enroll from './Enroll';

export default function Promotions() {
    return (
        <div className="promotion_wrapper" style={{
            background: '#ffffff'
        }}>
            <div className="container">
                <PromotionsAnimation />
                <Enroll />
            </div>
        </div>
    )
}
