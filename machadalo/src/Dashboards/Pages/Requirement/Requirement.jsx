import React, { useEffect } from 'react';
import { RequirementActions } from '../../_actions/Requirement/Requirement.actions';

export default function RequirementDash() {
  const RequirementApi = RequirementActions();

  useEffect(() => {
    RequirementApi.getSectorByNumber();
  }, []);
  return <div>Requirement</div>;
}
