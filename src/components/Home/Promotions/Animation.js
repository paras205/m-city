import React from 'react'
import Zoom from 'react-reveal/Zoom';
import jersey from '../../../Resources/images/jersey.jpg';

export default function PromotionAnimation() {
    return (
        <div className="promotion_animation">
            <div className="left">
                <Zoom>
                    <div>
                        <span>Win a jersey</span>
                    </div>
                </Zoom>
            </div>
            <div className="right">
                <Zoom>
                    <div style={{
                        background: `url(${jersey}) no-repeat`
                    }}></div>
                </Zoom>
            </div>
        </div>
    )
}
