import React from 'react';

interface IndividualRankingProps {
  name: string;
  points: number;
  rank: number;
}

const IndividualRanking: React.FC<IndividualRankingProps> = ({ name, points, rank }) => {
  return (
    <div className="individual-ranking">
      <span className="rank">{rank}</span>
      <span className="name">{name}</span>
      <span className="points">{points}</span>
    </div>
  );
};

export default IndividualRanking; 