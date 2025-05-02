import React, { useState } from "react";

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
}

const MatchupCard: React.FC<MatchupCardProps> = ({ matchup, index }) => {
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

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
            <span>Ganados: {team1Score}</span>
            <div className="score-buttons">
              <button onClick={() => setTeam1Score(team1Score - 1)}>-</button>
              <button onClick={() => setTeam1Score(team1Score + 1)}>+</button>
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
            <span>Ganados: {team2Score}</span>
            <div className="score-buttons">
              <button onClick={() => setTeam2Score(team2Score - 1)}>-</button>
              <button onClick={() => setTeam2Score(team2Score + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchupCard;
