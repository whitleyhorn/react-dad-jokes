import React , { Component } from 'react';
import './Joke.css';

class Joke extends Component {
    constructor(props) {
        super(props);
        this.state = { votes: 0 };

        this.getEmoji = this.getEmoji.bind(this);
        this.vote = this.vote.bind(this);
    } 

    getEmoji(){
        if(this.state.votes < 0) {
            return "sad";
        } else if (this.state.votes < 3) {
            return "neutral";
        } else if (this.state.votes >= 3 && this.state.votes <= 6) {
            return "smile";
        } else if (this.state.votes > 6 && this.state.votes < 9) {
            return "big-smile";
        } else if (this.state.votes === 9) {
            return "laughing";
        } else if (this.state.votes >= 10) {
            return "rofl";
        } else {
            return "";
        }
    }

    vote(type) {
        if(type === 'up') {
            this.setState(st => {return {votes: st.votes + 1}});
        } else {
            this.setState(st => {return {votes: st.votes - 1}});
        }
    }

    render() {
        let voteUp = this.vote.bind(null, 'up');
        let voteDown = this.vote.bind(null, 'down');

        return (
            <div className="Joke">
                <div className="Joke-voter">
                    <div className="Joke-voter-up" onClick={voteUp}>^</div>
                    <div className="Joke-voter-score">{this.state.votes}</div>
                    <div className="Joke-voter-down" onClick={voteDown}>v</div>
                </div>
                <div className="Joke-text">{this.props.data.joke}</div>
                <div className="Joke-emoji">
                    { this.getEmoji() }
                </div>
            </div>
        );    
    } 

}

export default Joke;
