import React, { ChangeEvent } from 'react';

interface CapexProps {
    capexData: {
      sizeMw: number;
      hardwareCostPerMw: number;
      installationCostPerMw: number;
    };
    capexErrors: {
      sizeMw?: string;
      hardwareCostPerMw?: string;
      installationCostPerMw?: string;
    };
    handleCapexChange: (value: number, type: string) => void;
  }

const Capex: React.FC<CapexProps> = ({ capexData, capexErrors, handleCapexChange }) => {
    return  (
        <div><div className="sectionWrap">
        <div className="title">Enter values below to calculate capex data: </div>
        <div className="fieldWrap">
          <label>Size:</label>
          <input
            type="number"
            name="sizeMw"
            min="0"
            value={capexData.sizeMw}
            placeholder="Enter the size"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleCapexChange(Number(e.target.value), 'size')}
          />
          {capexErrors?.sizeMw && <div className="error">{capexErrors.sizeMw}</div>}
        </div>
        <div className="fieldWrap">
          <label>Hardware cost per Mw:</label>
          <input
            type="number"
            name="hardwareCostPerMw"
            min="0"
            value={capexData.hardwareCostPerMw}
            placeholder="Enter the hardware cost"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleCapexChange(Number(e.target.value), 'hardware')}
          />
          {capexErrors?.hardwareCostPerMw && <div className="error">{capexErrors.hardwareCostPerMw}</div>}
        </div>
        <div className="fieldWrap">
          <label>Installation cost per Mw:</label>
          <input
            type="number"
            name="installationCostPerMw"
            min="0"
            value={capexData.installationCostPerMw}
            placeholder="Enter the installation cost"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleCapexChange(Number(e.target.value), 'installation')}
          />
          {capexErrors?.installationCostPerMw && <div className="error">{capexErrors.installationCostPerMw}</div>}
        </div>
      </div>
</div>
    )
} 
export default Capex