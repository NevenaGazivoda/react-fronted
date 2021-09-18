import React, {Component} from 'react';

import likeSrc from '../assets/like.png';
import dislikeSrc from '../assets/dislike.png';


class LikesR extends Component {
  constructor(props) {
    super(props);
        this.state = {
        fk_UserId: '',
        fk_ReplyId: '',
        reaction: true,
        logedUser: null,
        rid: null,
        positive: 0,
        negative:0
        }    
    this.incFav = this.incFav.bind(this);
    this.decFav = this.decFav.bind(this);
    
  }

  async componentDidMount() {

    this.setState({rid: this.props.fk_ReplyId})
    this.setState({fk_UserId: this.props.fk_UserId})
    this.setState({positive: this.props.positive})
    this.setState({negative: this.props.negative})
    
  }

  async incFav() {

      const fk_UserId = this.state.fk_UserId;
      const fk_ReplyId = this.state.rid;
      const reaction= true;
      

      var response = await fetch(`http://localhost:8082/usersreplies`, {
            method: 'POST',
            body: JSON.stringify({
                reaction,
                fk_UserId,
                fk_ReplyId
            })
        });

        
        
        var data = await response.json();
        
        await this.setState({ positive : data.positive})
        await this.setState({ negative : data.negative})
  }

  async decFav() {

      const fk_UserId = this.state.fk_UserId;
      const fk_ReplyId = this.state.rid;
      const reaction= false;
      

      var response = await fetch(`http://localhost:8082/usersreplies`, {
            method: 'POST',
            body: JSON.stringify({
                reaction,
                fk_UserId,
                fk_ReplyId
            })
        });

        
        
        var data = await response.json();
        
        await this.setState({ positive : data.positive})
        await this.setState({ negative : data.negative})
  }

  render() {
    return(
        <div>
        <img    onClick={this.incFav}       
        style={{width:25, height:25}}
        alt="like icon"
        src={likeSrc} />{this.state.positive}
                    
        <img      onClick={this.decFav}        
        style={{width:25, height:25}}
        alt="dislike icon"
        src={dislikeSrc} />{this.state.negative}
        </div>
    );
  }
}

export default LikesR;