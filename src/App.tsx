import React, { useState, useEffect } from "react";
import "./App.css";

interface Player {
  id: number;
  name: string;
}

interface Matchup {
  team1: Player[];
  team2: Player[];
}

const PLAYERS: Player[] = [
  { id: 1, name: "Juan" },
  { id: 2, name: "Cedric" },
  { id: 3, name: "Alan" },
  { id: 4, name: "Jorge" },
  { id: 5, name: "Julio" },
];

function App() {
  const [matchups, setMatchups] = useState<Matchup[]>([]);

  useEffect(() => {
    const allMatchups: Matchup[] = [];

    // Generate all possible combinations of 2 players for team 1
    for (let i = 0; i < PLAYERS.length; i++) {
      for (let j = i + 1; j < PLAYERS.length; j++) {
        const team1 = [PLAYERS[i], PLAYERS[j]];

        // Generate all possible combinations of 2 players for team 2
        // from the remaining players
        for (let k = 0; k < PLAYERS.length; k++) {
          if (k !== i && k !== j) {
            for (let l = k + 1; l < PLAYERS.length; l++) {
              if (l !== i && l !== j) {
                const team2 = [PLAYERS[k], PLAYERS[l]];
                if (
                  !allMatchups.some(
                    (m) =>
                      m.team2.every((p) => team1.includes(p)) &&
                      m.team1.every((p) => team2.includes(p))
                  )
                ) {
                  allMatchups.push({ team1, team2 });
                }
              }
            }
          }
        }
      }
    }

    setMatchups(allMatchups);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Carso Open - Paddle Match Organizer</h1>

        <div className="matchups-container">
          {matchups.map((matchup, index) => (
            <div key={index} className="matchup-card">
              <h3>Matchup {index + 1}</h3>
              <div className="teams">
                <div className="team">
                  <h4>Team 1</h4>
                  <p>
                    {matchup.team1[0].name} & {matchup.team1[1].name}
                  </p>
                </div>
                <div className="vs">VS</div>
                <div className="team">
                  <h4>Team 2</h4>
                  <p>
                    {matchup.team2[0].name} & {matchup.team2[1].name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
