import React, { useEffect } from 'react';
import { RequirementActions } from '../../_actions/Requirement/Requirement.actions';
import SelectDropdown from '../../common/SelectDropdown/SelectDropdown';
import { useRecoilValue } from 'recoil';
import { SectorListByNumberAtom } from '../../_states';

export default function RequirementDash() {
  const RequirementApi = RequirementActions();
  const sectorList = useRecoilValue(SectorListByNumberAtom);

  const handleSector = (event) => {
    console.log(event);
  };

  useEffect(() => {
    RequirementApi.getSectorByNumber();
  }, []);
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
    </>
  );
}
