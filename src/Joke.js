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
        let className = '';

        if(this.state.votes < 0) {
            className="fa-face-frown";
        } else if (this.state.votes < 3) {
            className="fa-face-meh";
        } else if (this.state.votes >= 3 && this.state.votes <= 6) {
            className="fa-face-smile";
        } else if (this.state.votes > 6 && this.state.votes < 9) {
            className="fa-face-grin";
        } else if (this.state.votes === 9) {
            className="fa-face-laugh";
        } else if (this.state.votes >= 10) {
            className="fa-face-grin-squint-tears";
        } 

        return <i className={`fa-solid ${className}`}></i>;
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
                    <div className="Joke-voter-up" onClick={voteUp}>
                        <i className="fa-regular fa-thumbs-up"></i>
                    </div>
                    <div className="Joke-voter-score">{this.state.votes}</div>
                    <div className="Joke-voter-down" onClick={voteDown}>
                        <i className="fa-regular fa-thumbs-down"></i>
                    </div>
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
