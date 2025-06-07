import React, { useState, useEffect } from "react";
import "./App.css";
import MatchupCard from "./components/MatchupCard";
import Rankings from "./components/Rankings";

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
        <Rankings players={PLAYERS} />
        <button
          className="reset-all-scores-button"
          onClick={() => {
            if (
              window.confirm(
                "¿Estás seguro que quieres borrar todos los scores guardados?"
              )
            ) {
              // Clear all matchup scores from localStorage
              for (let i = 0; i < matchups.length; i++) {
                localStorage.removeItem(`matchup-${i}-scores`);
              }
              // Force a re-render of all matchups
              setMatchups([...matchups]);
              window.location.reload();
            }
          }}
        >
          Resetear Scores
        </button>

        <div className="matchups-container">
          {matchups.map((matchup, index) => (
            <MatchupCard key={index} matchup={matchup} index={index} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
