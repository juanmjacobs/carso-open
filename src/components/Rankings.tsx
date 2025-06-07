import React from 'react';
import IndividualRanking from './IndividualRanking';
import TeamRanking from './TeamRanking';

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

  // Calculate team points
  const teamPoints: { [key: string]: { team: Player[], points: number } } = {};
  
  // Initialize team points
  matchups.forEach(matchup => {
    const team1Key = `${matchup.team1[0].id}-${matchup.team1[1].id}`;
    const team2Key = `${matchup.team2[0].id}-${matchup.team2[1].id}`;
    
    if (!teamPoints[team1Key]) {
      teamPoints[team1Key] = { team: matchup.team1, points: 0 };
    }
    if (!teamPoints[team2Key]) {
      teamPoints[team2Key] = { team: matchup.team2, points: 0 };
    }
  });

  // Calculate team points from scores
  Object.entries(scores).forEach(([matchupIndex, matchupScores]) => {
    const matchup = matchups[parseInt(matchupIndex)];
    if (matchup) {
      const team1Key = `${matchup.team1[0].id}-${matchup.team1[1].id}`;
      const team2Key = `${matchup.team2[0].id}-${matchup.team2[1].id}`;
      
      if (matchupScores.team1) {
        teamPoints[team1Key].points += matchupScores.team1;
      }
      if (matchupScores.team2) {
        teamPoints[team2Key].points += matchupScores.team2;
      }
    }
  });

  // Sort teams by points
  const sortedTeams = Object.values(teamPoints).sort((a, b) => b.points - a.points);

  return (
    <div className="rankings">
      <div className="individual-rankings">
        <h2>Individual Rankings</h2>
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

      <div className="team-rankings">
        <h2>Team Rankings</h2>
        <div className="rankings-header">
          <span className="rank">Rank</span>
          <span className="name">Team</span>
          <span className="points">Points</span>
        </div>
        {sortedTeams.map((teamData, index) => (
          <TeamRanking
            key={`${teamData.team[0].id}-${teamData.team[1].id}`}
            team={teamData.team}
            points={teamData.points}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Rankings; 