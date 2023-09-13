import React, { useEffect } from 'react';
import { RequirementActions } from '../../_actions/Requirement/Requirement.actions';
import SelectDropdown from '../../common/SelectDropdown/SelectDropdown';
import { useRecoilValue } from 'recoil';
import { LeadsBySectorAtom, SectorListByNumberAtom } from '../../_states';
import getRequirementHeader from './RequirementListConfig';
import ReactBootstrapTable from '../../Table/React-Bootstrap-table/ReactBootstrapTable';
export default function RequirementData() {
  const RequirementApi = RequirementActions();
  const sectorList = useRecoilValue(SectorListByNumberAtom);
  const LeadsData = useRecoilValue(LeadsBySectorAtom);

  const handleSector = (event) => {
    console.log(event);
    RequirementApi.getLeadsBySector(event);
  };

  useEffect(() => {
    RequirementApi.getSectorByNumber();
  }, []);
  console.log(getRequirementHeader(), 'getRequirementHeader');
  return (
    <>
      <SelectDropdown
        optionsData={sectorList?.sectors}
        selectedValue={''}
        placeholder="Sector"
        label="Sector"
        id="Sector"
        handleSelect={handleSector}
      />
      {LeadsData && LeadsData.length > 0 && (
        <ReactBootstrapTable headerData={getRequirementHeader} rowData={LeadsData} />
      )}
    </>
  );
}
