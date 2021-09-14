import React, { Component } from 'react';

import dislikeSrc from '../../assets/dislike.png';

 class Dislike extends Component {
    render() {
        return (
                           
                <img           
                    style={{width:25, height:25}}
                    alt="like icon"
                    src={dislikeSrc} />
            
        );
    }
}

export default Dislike