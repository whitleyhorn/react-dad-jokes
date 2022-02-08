import React, { Component } from 'react';
import Joke from './Joke';
import { v4 as uuid } from 'uuid';
import './DadJokes.css';

class DadJokes extends Component {
    constructor(props){
        super(props);
        this.state = {
            jokes: [], 
        };

        this.newJokes = this.newJokes.bind(this);
    }

    componentDidMount(){ 
        this.newJokes();
    }

    async newJokes(){
        let jokes = [];
        let attempts = 0;
        while(attempts < 10) {
            let joke = await fetch('https://icanhazdadjoke.com', {
                headers: {       
                    'Accept': 'application/json'      
                }
            });
            joke = await joke.json();
            console.log(this.state.jokes);
            if(!this.state.jokes.find(j => j.id === joke.id)) {
                let picked = (({ id, joke }) => ({ id, joke }))(joke);
                picked.uuid = uuid();
                console.log('picked', picked);
                jokes.push(picked);
                attempts++;
            }
        }
        this.setState(st => {
            return {jokes: [...st.jokes, ...jokes]}
        });
    }

    render() {
        return (
            <div className="DadJokes">
                <h1>Dad Jokes</h1>
                <button onClick={this.newJokes}>New Jokes</button>
                <div className="DadJokes-list">
                    { this.state.jokes.length === 0 ? <div id="loading" /> : "" }
                    { this.state.jokes.map( j => <Joke data={j} key={j.uuid}/> ) }
                </div>
            </div>
        );
    }
}

export default DadJokes;
