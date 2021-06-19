import './App.css';
import React from 'react';

function FutureMatch(props){
  const m = props.match;
  let homeTeam = props.teams.find((t) => t.id === m.home_team);
  let awayTeam = props.teams.find((t) => t.id === m.away_team);

  // Get stadium info
  const stadium = props.stadiums.find((s) => (s.id === m.stadium))

  // Get team info
  let homeTeamStr, awayTeamStr;
  if (homeTeam === undefined) {
   homeTeam = {name: 'To be decided', flag: {unicode: ''}}
  }
  if (awayTeam === undefined) {
    awayTeam = {name: 'To be decided', flag: {unicode: ''}}
  }
   
  
  return (
    <div>
       <div className="names">
        <div className="home flag">{homeTeam.flag.unicode}</div>
        <div className="home name">{homeTeam.name}</div>
        <div className="vs"> vs </div>
        <div className="away flag left">{awayTeam.flag.unicode}</div>
        <div className="away name">{awayTeam.name}</div>
        <div className="away flag right">{awayTeam.flag.unicode}</div>
      </div>
      <div className="desc">
        <div>{new Date(m.date).toLocaleString()}</div>
        <div>{stadium.name}, {stadium.city}</div>
      </div>
    </div>
  )
}

function PastMatch(props){
  const m = props.match;
  const homeTeam = props.teams.find((t) => t.id === m.home_team);
  const awayTeam = props.teams.find((t) => t.id === m.away_team);
  return (
    <div>
      <div className="names">
        <div className="home flag">{homeTeam.flag.unicode}</div>
        <div className="home name">{homeTeam.name}</div>
        <div className="vs"> vs </div>
        <div className="away flag left">{awayTeam.flag.unicode}</div>
        <div className="away name">{awayTeam.name}</div>
        <div className="away flag right">{awayTeam.flag.unicode}</div>
      </div>
      <div className="score">{m.home_result} : {m.away_result}</div>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: null,
      filteredMatches: null,
      i: null,
      now2h: null
    };

    this.prevMatch = this.prevMatch.bind(this);
    this.nextMatch = this.nextMatch.bind(this);
    this.filterByTeam = this.filterByTeam.bind(this);
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/lsv/uefa-euro-2020/master/data.json')
    .then(response => response.json())
    .then(data => {
      let matches = []
      // Get matches from all groups
      for (let i=0; i<data.groups.length; i++) {
        matches = matches.concat(data.groups[i].matches)
      };
      // Get matches from knockout phases
      for (let round in data.knockoutphases) {
        matches = matches.concat(
          data.knockoutphases[round].matches
        );
      }
      // Sort matches by date
      matches = matches.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })

      // Get current time
      const now2h = new Date();
      now2h.setHours(now2h.getHours() - 2);
      
      // Update state
      this.setState({
        matches: matches,
        filteredMatches: matches,
        teams: data.teams,
        stadiums: data.stadiums,
        i: this.currentMatchIndex(matches, now2h),
        now2h: now2h
      });
    });
  }

  currentMatchIndex(matches, now2h){
    let nextMatch = matches.length - 1;
    for (let i=0; i<matches.length; i++){
      if(new Date(matches[i].date) > now2h) {
        nextMatch = i;
        break;
      };
    };
    return nextMatch
  }

  nextMatch() {
    this.setState((state) => {
      if (state.i + 1 >= state.filteredMatches.length){
        return {i: state.filteredMatches.length - 1}
      } else {
        return {i: state.i + 1}
      }
    })
  }

  prevMatch() {
    this.setState((state) => {
      if (state.i - 1 <= 0){
        return {i: 0}
      } else {
        return {i: state.i - 1}
      }
    })
  }

  filterByTeam(e) {
    const teamID = e.target.value;
    if (teamID === ''){
      this.setState((state) => ({
        filteredMatches: state.matches,
        i: this.currentMatchIndex(state.matches, state.now2h)
      }))
    } else {
      this.setState((state) => {
        const filtered = state.matches.filter((m) => m.home_team === teamID || m.away_team === teamID)
        return {
          filteredMatches: filtered, 
          i: this.currentMatchIndex(filtered, state.now2h)
        }
      })
    }
  }

  render() {
    if (this.state.matches === null){
      console.log('loading');
      return <div className="loading">Loading</div>
    }

    const match = this.state.filteredMatches[this.state.i];

    let matchInfo;
    if (new Date(match.date) > this.state.now2h){
      matchInfo = (
        <FutureMatch
          match={match}
          teams={this.state.teams}
          stadiums={this.state.stadiums}
        />
      )
    } else {
      matchInfo = <PastMatch match={match} teams={this.state.teams} />
    }

    return (
      <div className="App">
        <div className="box">
          <div>
            <select onChange={this.filterByTeam}>
              <option value="">All matches</option>
              {this.state.teams.sort((a, b) => a.name.localeCompare(b.name)).map((team, i) => <option value={team.id} key={i}>{team.name}</option>)}
            </select>
          </div>
          <div className="match">
            {matchInfo}
          </div>
          <div className="navigation">
            <div>{this.state.i !== 0 ? <button onClick={this.prevMatch}>Prev match</button> : '' }</div>
            <div>{this.state.i === this.state.filteredMatches.length - 1 ? '' : <button onClick={this.nextMatch}>Next match</button>}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
