import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FormInput from '../../FormInput';
import SocietyTowerTabPanel from './SocietyTowerTabPanel';

export default function SocietyInventoryDetails() {
  const errorMsg = false;
  const inventory_errorMsg = false;
  const count_errorMsg = false;
  const fetchWrapper = useFetchWrapper();
  const [tower, setTower] = useState();
  const [towerTabs, setTowerTabs] = useState([]);

  const getTower = () => {
    fetchWrapper.get(ANG_APIS.GET_TOWER).then((res) => {
      setTower(res.data);
    });
  };

  useEffect(() => {
    getTower();
  }, []);

  const handleNewClick = () => {
    let data = {
      id: '',
    };
    setTowerTabs([...towerTabs, data]);
  };

  return (
    <>
      <Tabs>
        <TabList>
          {towerTabs.length > 0 &&
            towerTabs.map((tab, key) => {
              return <Tab key={key}>Tower {key}</Tab>;
            })}
        </TabList>
        <p onClick={handleNewClick}>+New</p>
        {towerTabs.length > 0 &&
          towerTabs.map((tab, key) => {
            return <SocietyTowerTabPanel key={key} />;
          })}
      </Tabs>
    </>
  );
}
