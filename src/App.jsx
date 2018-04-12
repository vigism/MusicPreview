import React,{Component} from 'react';
import './App.css'
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      query: '',
      artist: null,
      tracks:[]
    }
  }

  search(){
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL=BASE_URL+'q='+this.state.query+
                  '&type=artist&limit=1';
    const ALBUM_URL='https://api.spotify.com/v1/artists/';
    console.log(FETCH_URL);
    const accessToken='BQD0V7tbyEbo4kWWebEjiDb3nOyYGxhrptAAAUGqeFHXv78P9b572664-Hw75Ssb1L38s_-2TAlA2GueLAHd4QG9BGNoRxdPFJxcTQVZAOz-OJtXwtlGzu_QDIJK6-3FcK5pCGbk0SQcjR_7LbIEeuWiQpAPsw-r&refresh_token=AQATf-ozg8nXjWMWXjpLxMYG9qR98LFkeex05GBs7BvKAGPfMqP5hB1m6AyHonw40JOCf2fP1NUPc2zLP_TjWhJ47HV1dMNOt_duYBKqEqAsqUwpmOkHQ2lmoMivZmt23as';

    let myOptions={
      method:'GET',
      headers:{
        'Authorization':'Bearer '+accessToken
      },
      mode:'cors',
      cache:'default'
    };

    fetch(FETCH_URL,myOptions).then(response => response.json())
    .then(json=>{
      const artist=json.artists.items[0];
      this.setState({artist});

      FETCH_URL=`${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      fetch(FETCH_URL,myOptions).then(response=>response.json()).then(json=>{
        console.log(json);
        const tracks=json.tracks;
        this.setState({tracks});
      })
    });

  }

render(){
  return(
    <div className="App">
      <div className="App-title">Music Master</div>
      <FormGroup>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search for an artist"
            value={this.state.query}
            onChange={event => {this.setState({query:event.target.value})}}
            onKeyPress={event => {
              if(event.key==='Enter'){
                this.search();
              }
            }}
          />
          <InputGroup.Addon onClick={() => this.search()}>
            <Glyphicon glyph="search"></Glyphicon>
          </InputGroup.Addon>
        </InputGroup>

      </FormGroup>
      {
        this.state.artist!==null?
        <div>
          <Profile
            artist={this.state.artist}
          />
          <Gallery
          tracks={this.state.tracks}/>
        </div>
        : <div></div>

      }
    </div>

  )
}

}

export default App;
