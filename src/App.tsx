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

interface Scores {
  [key: string]: { team1: number; team2: number };
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
  const [scores, setScores] = useState<Scores>(() => {
    const savedScores: Scores = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('matchup-') && key.endsWith('-scores')) {
        const index = key.replace('matchup-', '').replace('-scores', '');
        savedScores[index] = JSON.parse(localStorage.getItem(key) || '{}');
      }
    }
    return savedScores;
  });

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

  const updateScore = (matchupIndex: number, team: 'team1' | 'team2', increment: number) => {
    setScores(prev => {
      const newScores: Record<string, { team1: number; team2: number }> = {
        ...prev,
        [matchupIndex]: {
          ...prev[matchupIndex],
          [team]: (prev[matchupIndex]?.[team] || 0) + increment
        }
      };
      localStorage.setItem(`matchup-${matchupIndex}-scores`, JSON.stringify(newScores[matchupIndex]));
      return newScores;
    });
  };

  const resetScore = (matchupIndex: number) => {
    setScores(prev => {
      const newScores = { ...prev };
      newScores[matchupIndex] = { team1: 0, team2: 0 };
      localStorage.setItem(`matchup-${matchupIndex}-scores`, JSON.stringify(newScores[matchupIndex]));
      return newScores;
    });
  };

  const resetAllScores = () => {
    if (window.confirm("¿Estás seguro que quieres borrar todos los scores guardados?")) {
      setScores({});
      for (let i = 0; i < matchups.length; i++) {
        localStorage.removeItem(`matchup-${i}-scores`);
      }
    }
  };

  const copyLocalStorageKeys = () => {
    const keys = Object.keys(localStorage)
      .filter(key => key.startsWith('matchup-') && key.endsWith('-scores'))
      .map(key => `${key}: ${localStorage.getItem(key)}`)
      .join('\n');
    
    navigator.clipboard.writeText(keys)
      .then(() => alert('Local storage keys copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err));
  };

  const importScores = () => {
    const text = window.prompt('Pega los scores a importar:');
    if (!text) return; // User cancelled the prompt
    
    const lines = text.split('\n');
    const newScores: Scores = {};
    
    for (const line of lines) {
      const [key, value] = line.split(': ');
      if (key && value) {
        try {
          const index = key.replace('matchup-', '').replace('-scores', '');
          const scoreData = JSON.parse(value);
          newScores[index] = scoreData;
          localStorage.setItem(key, value);
        } catch (e) {
          console.error('Failed to parse line:', line);
        }
      }
    }

    if (Object.keys(newScores).length > 0) {
      setScores(prev => ({ ...prev, ...newScores }));
      alert('Scores imported successfully!');
    } else {
      alert('No valid scores found in the pasted text');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Carso Open - Paddle Match Organizer</h1>
        <Rankings players={PLAYERS} scores={scores} matchups={matchups} />
        <div className="button-container">
          <button
            className="reset-all-scores-button"
            onClick={resetAllScores}
          >
            Resetear Scores
          </button>
          <button
            className="copy-keys-button"
            onClick={copyLocalStorageKeys}
          >
            Copiar Scores
          </button>
          <button
            className="import-keys-button"
            onClick={importScores}
          >
            Importar Scores
          </button>
        </div>

        <div className="matchups-container">
          {matchups.map((matchup, index) => (
            <MatchupCard 
              key={index} 
              matchup={matchup} 
              index={index}
              scores={scores[index] || { team1: 0, team2: 0 }}
              onUpdateScore={updateScore}
              onResetScore={resetScore}
            />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
