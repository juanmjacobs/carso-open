import React from 'react';
import IndividualRanking from './IndividualRanking';

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

interface RankingsProps {
  players: Player[];
  scores: Scores;
  matchups: Matchup[];
}

const Rankings: React.FC<RankingsProps> = ({ players, scores, matchups }) => {
  // Calculate points for each player
  const playerPoints: { [key: string]: number } = {};
  
  // Initialize points for all players
  players.forEach(player => {
    playerPoints[player.name] = 0;
  });

  // Calculate points from scores
  Object.entries(scores).forEach(([matchupIndex, matchupScores]) => {
    const matchup = matchups[parseInt(matchupIndex)];
    if (matchup) {
      if (matchupScores.team1) {
        matchup.team1.forEach(player => {
          playerPoints[player.name] += matchupScores.team1;
        });
      }
      if (matchupScores.team2) {
        matchup.team2.forEach(player => {
          playerPoints[player.name] += matchupScores.team2;
        });
      }
    }
  });

  // Sort players by points
  const sortedPlayers = [...players].sort((a, b) => 
    (playerPoints[b.name] || 0) - (playerPoints[a.name] || 0)
  );

  return (
    <div className="rankings">
      <h2>Rankings</h2>
      <div className="rankings-header">
        <span className="rank">Rank</span>
        <span className="name">Player</span>
        <span className="points">Points</span>
      </div>
      {sortedPlayers.map((player, index) => (
        <IndividualRanking
          key={player.id}
          name={player.name}
          points={playerPoints[player.name] || 0}
          rank={index + 1}
        />
      ))}
    </div>
  );
};

export default Rankings; 