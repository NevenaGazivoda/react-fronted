import React, { Component } from 'react';

import likeSrc from '../../assets/like.png';

 class Like extends Component {
     
    render() {
        return (               
                <img           
                    style={{width:25, height:25}}
                    alt="like icon"
                    src={likeSrc} />
            
        );
    }
}

export default Like