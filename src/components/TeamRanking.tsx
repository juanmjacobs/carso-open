import React from 'react';

interface Player {
  id: number;
  name: string;
}

interface TeamRankingProps {
  team: Player[];
  points: number;
  rank: number;
}

const TeamRanking: React.FC<TeamRankingProps> = ({ team, points, rank }) => {
  return (
    <div className="team-ranking">
      <span className="rank">{rank}</span>
      <span className="name">{team[0].name} & {team[1].name}</span>
      <span className="points">{points}</span>
    </div>
  );
};

export default TeamRanking; 