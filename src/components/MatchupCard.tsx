import React from "react";

interface Player {
  id: number;
  name: string;
}

interface Matchup {
  team1: Player[];
  team2: Player[];
}

interface MatchupCardProps {
  matchup: Matchup;
  index: number;
  scores: { team1: number; team2: number };
  onUpdateScore: (matchupIndex: number, team: 'team1' | 'team2', increment: number) => void;
  onResetScore: (matchupIndex: number) => void;
}

const MatchupCard: React.FC<MatchupCardProps> = ({ 
  matchup, 
  index, 
  scores,
  onUpdateScore,
  onResetScore
}) => {
  return (
    <div className="matchup-card">
      <h3>Matchup {index + 1}</h3>
      <div className="teams">
        <div className="team">
          <h4>Team 1</h4>
          <p>
            {matchup.team1[0].name} & {matchup.team1[1].name}
          </p>
          <div className="score">
            <span>Ganados: {scores.team1}</span>
            <div className="score-buttons">
              <button onClick={() => onUpdateScore(index, 'team1', -1)}>-</button>
              <button onClick={() => onUpdateScore(index, 'team1', 1)}>+</button>
            </div>
          </div>
        </div>
        <div className="vs">VS</div>
        <div className="team">
          <h4>Team 2</h4>
          <p>
            {matchup.team2[0].name} & {matchup.team2[1].name}
          </p>
          <div className="score">
            <span>Ganados: {scores.team2}</span>
            <div className="score-buttons">
              <button onClick={() => onUpdateScore(index, 'team2', -1)}>-</button>
              <button onClick={() => onUpdateScore(index, 'team2', 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
      <button 
        className="reset-button"
        onClick={() => {
          if (window.confirm('¿Estás seguro que quieres resetear los scores?')) {
            onResetScore(index);
          }
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default MatchupCard;
