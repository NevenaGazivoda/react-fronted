import React, {Component} from 'react';

import likeSrc from '../assets/like.png';
import dislikeSrc from '../assets/dislike.png';


class LikesQ extends Component {
  constructor(props) {
    super(props);
        this.state = {
        fk_UserId: '',
        fk_QuestionId: '',
        reaction: true,
        logedUser: null,
        qid: null,
        positive: 0,
        negative:0,
        questionNow: null,
        questionNowObj: null
        }    
    this.incFav = this.incFav.bind(this);
    this.decFav = this.decFav.bind(this);
    
  }

  async componentDidMount() {

    this.setState({qid: this.props.fk_QuestionId})
    this.setState({fk_UserId: this.props.fk_UserId})
    this.setState({positive: this.props.positive})
    this.setState({negative: this.props.negative})
    
  }

  async incFav() {
    this.setState(prevState => ({ likes: prevState.likes + 1 }));


      const fk_UserId = this.state.fk_UserId;
      const fk_QuestionId = this.state.qid;
      const reaction= true;
      

      var response =  await fetch(`http://localhost:8082/usersquestions`, {
            method: 'POST',
            body: JSON.stringify({
                reaction,
                fk_UserId,
                fk_QuestionId
            })
        });

        var data = await response.json();
        
        await this.setState({ positive : data.positive})
        await this.setState({ negative : data.negative})
  }

  async decFav() {
    this.setState(prevState => ({ likes: prevState.likes - 1 }));


      const fk_UserId = this.state.fk_UserId;
      const fk_QuestionId = this.state.qid;
      const reaction= false;
      

      var response = await fetch(`http://localhost:8082/usersquestions`, {
            method: 'POST',
            body: JSON.stringify({
                reaction,
                fk_UserId,
                fk_QuestionId
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

export default LikesQ;