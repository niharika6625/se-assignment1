import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Capex from '../components/Capex';
import H2production from '../components/H2production';

interface HomeResponse {
  installation: number;
  hardware: number;
}

interface HomePageProps {
  data: HomeResponse;
}

interface H2ProductionResponse {
    data: number[];
  }
  
interface HydrogenPageProps {
    h2ProductionData: number[];
  }

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  return {
    props: {
    },
  };
};

const HomePage: React.FC<HomePageProps> = ({ 
}) => {
  const [capexData, setCapexData] = useState<object>({
    sizeMw: '',
    hardwareCostPerMw: '',
    installationCostPerMw: '',
  })

  const [h2ProductionData, setH2ProductionData] = useState<object>({
    energyInput: '',
    SEC: '',
    degradationPerYear: '',
    years: '',
  })

  const [resultCapexData, setResultCapexData] = useState<HomeResponse>({ installation: 0, hardware: 0 });
  const [resultH2ProductionData, setResultH2ProductionData] = useState<number[]>([]);
  const [lcohData, setLcohData] = useState({});
  const [capexErrors, setCapexErrors] = useState<Record<string, string>>({});
  const [h2ProductionErrors, setH2ProductionErrors] = useState<Record<string, string>>({});
  const [loader,setLoader] = useState(false);

  const validateCapexInput = () => {
    const errors: Record<string, string> = {};

    if (capexData.sizeMw <= 0) {
      errors.sizeMw = 'Size must be greater than 0';
    }
    if (capexData.hardwareCostPerMw <= 0) {
      errors.hardwareCostPerMw = 'Hardware cost must be greater than 0';
    }
    if (capexData.installationCostPerMw <= 0) {
      errors.installationCostPerMw = 'Installation cost must be greater than 0';
    }

    setCapexErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateH2ProductionInput = () => {
    const errors: Record<string, string> = {};

    if (h2ProductionData.energyInput <= 0) {
      errors.energyInput = 'Energy input must be greater than 0';
    }
    if (h2ProductionData.SEC <= 0) {
      errors.SEC = 'SEC must be greater than 0';
    }
    if (h2ProductionData.degradationPerYear <= 0) {
      errors.degradationPerYear = 'Degradation must be greater than 0';
    }
    if (h2ProductionData.years <= 0) {
      errors.years = 'Years must be greater than 0';
    }

    setH2ProductionErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCapexChange = (value: string, type: string = ''): void => {
    switch (type) {
      case 'size':
        setCapexData((prevState) => ({...prevState, sizeMw: value }))
        break;
      case 'hardware':
        setCapexData((prevState) => ({...prevState, hardwareCostPerMw: value }))
        break;
      case 'installation':
        setCapexData((prevState) => ({...prevState, installationCostPerMw: value }))
        break;
      default:
        break;
    }
  };

  const handleh2ProductionChange = (value: string, type: string = ''): void => {
    switch (type) {
      case 'energyInput':
        setH2ProductionData((prevState) => ({...prevState, energyInput: value }))
        break;
      case 'SEC':
        setH2ProductionData((prevState) => ({...prevState, SEC: value }))
        break;
      case 'degradationPerYear':
        setH2ProductionData((prevState) => ({...prevState, degradationPerYear: value }))
        break;
      case 'years':
        setH2ProductionData((prevState) => ({...prevState, years: value }))
        break;
      default:
        break;
    }
  };

  const handleCapexSubmit = async () => {
    if(validateCapexInput()){
      setLoader(true);
      const res = await fetch('http://localhost:3000/api/capex', {
        method: 'POST',
        body: JSON.stringify({
          sizeMw: capexData.sizeMw,
          hardwareCostPerMw: capexData.hardwareCostPerMw,
          installationCostPerMw: capexData.installationCostPerMw,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      setLoader(false);
      const { data } = await res.json() as { data: HomeResponse };
      setResultCapexData(data);
    }
  };

  const handleh2ProductionSubmit = async () => {

    if(validateH2ProductionInput()){
      setLoader(true);
      const h2ProductionRes = await fetch('http://localhost:3000/api/h2production', {
        method: 'POST',
        body: JSON.stringify({
          energyInput: h2ProductionData.energyInput,
          SEC: h2ProductionData.SEC,
          degradationPerYear: h2ProductionData.degradationPerYear,
          years: h2ProductionData.years,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      setLoader(false);
      const { data } = await h2ProductionRes.json() as { data: HomeResponse };
      setResultH2ProductionData(data);
    }
  };

  const handleLcohSubmit = async () => {
    handleCapexSubmit()
    handleh2ProductionSubmit()
  };

  useEffect( () => {
    if((resultCapexData && resultCapexData?.hardware)  && resultH2ProductionData && (resultH2ProductionData.length >0)){
      setLoader(true);
      fetch('http://localhost:3000/api/lcoh', {
        method: 'POST',
        body: JSON.stringify({
          capex: resultCapexData,
          yearlyH2Production: resultH2ProductionData
        }),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json()).then((result) => {
        const {data} = result;
        setLcohData(data);
        setLoader(false)
      }).catch((err) => {
        setLoader(false)
      });
    }
  }, [resultCapexData, resultH2ProductionData])

  return (
    <div className="homePageWrap">
      <div>
        <h1 className='header'><b>The Southern Lights - Frontend Assignment</b></h1>
      </div>
      <Capex capexData={capexData} handleCapexChange={handleCapexChange} capexErrors={capexErrors}  />
      <H2production h2ProductionData={h2ProductionData} handleh2ProductionChange={handleh2ProductionChange} h2ProductionErrors={h2ProductionErrors}/>
  
      <div className='buttonWrap'>
          <button className="button" id="submitButton" onClick={() =>handleLcohSubmit()}>Calculate LCOH</button> 
          {loader && (<span className="loader"></span>)}
      </div>
      <div className='sectionWrap'>
        <div className="title">
          <h2>LCOH Data-</h2>
        </div>
        <div className='output'>
          <p>LCOH: {lcohData?.LCOH}</p>
          <p>Installation Cost Proportion: {lcohData?.installationCostProportion}</p>
          <p>Hardware Cost Proportion: {lcohData?.hardwareCostProportion}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
