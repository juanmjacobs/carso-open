import React, { useEffect, useState } from 'react';
import IndividualRanking from './IndividualRanking';

interface Player {
  id: number;
  name: string;
}

interface RankingsProps {
  players: Player[];
}

const Rankings: React.FC<RankingsProps> = ({ players }) => {
  const [playerPoints, setPlayerPoints] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Calculate points for each player
    const points: { [key: string]: number } = {};
    
    // Initialize points for all players
    players.forEach(player => {
      points[player.name] = 0;
    });

    // Calculate points from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('matchup-') && key.endsWith('-scores')) {
        const scores = JSON.parse(localStorage.getItem(key) || '{}');
        if(scores.team1) {
          // Add points for each scoring point
          points[players[0].name] += scores.team1;
          points[players[1].name] += scores.team1;
        }
        if(scores.team2) {
          points[players[2].name] += scores.team2;
          points[players[3].name] += scores.team2;
        }
      }
    }

    setPlayerPoints(points);
  }, [players]);

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