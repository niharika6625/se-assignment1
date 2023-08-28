import React, { ChangeEvent } from 'react';

interface H2ProductionProps {
    h2ProductionData: {
      energyInput: number;
      SEC: number;
      degradationPerYear: number;
      years: number;
    };
    h2ProductionErrors: {
      energyInput?: string;
      SEC?: string;
      degradationPerYear?: string;
      years?: string;
    };
    handleh2ProductionChange: (value: number, type: string) => void;
  }

  const H2production: React.FC<H2ProductionProps> = ({ h2ProductionData, h2ProductionErrors, handleh2ProductionChange }) => {
    return  (
        <div>
            <div className="sectionWrap">
      <div className="title">Enter values below to get hydrogen production data:</div>
          <div className="fieldWrap">
            <label>Energy:</label>
            <input
              type="number"
              name="energyInput"
              min="0"
              value={h2ProductionData.energyInput}
              placeholder="Enter energy value"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleh2ProductionChange(Number(e.target.value), 'energyInput')
              }
            />
            {h2ProductionErrors?.energyInput && <div className="error">{h2ProductionErrors.energyInput}</div>}
          </div>
          <div className="fieldWrap">
            <label>SEC:</label>
            <input
              type="number"
              name="SEC"
              min="0"
              value={h2ProductionData.SEC}
              placeholder="Enter SEC value"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleh2ProductionChange(Number(e.target.value), 'SEC')
              }
            />
            {h2ProductionErrors?.SEC && <div className="error">{h2ProductionErrors.SEC}</div>}
          </div>
          <div className="fieldWrap">
            <label>Degradation per year:</label>
            <input
              type="number"
              name="degradationPerYear"
              min="0"
              value={h2ProductionData.degradationPerYear}
              placeholder="Enter the degradation value"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleh2ProductionChange(Number(e.target.value), 'degradationPerYear')
              }
            />
            {h2ProductionErrors?.degradationPerYear && <div className="error">{h2ProductionErrors.degradationPerYear}</div>}
          </div>
          <div className="fieldWrap">
            <label>No. of years:</label>
            <input
              type="number"
              name="years"
              min="0"
              value={h2ProductionData.years}
              placeholder="Enter the years"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleh2ProductionChange(Number(e.target.value), 'years')
              }
            />
            {h2ProductionErrors?.years && <div className="error">{h2ProductionErrors.years}</div>}
          </div>
      </div>
        </div>
    )
}

export default H2production