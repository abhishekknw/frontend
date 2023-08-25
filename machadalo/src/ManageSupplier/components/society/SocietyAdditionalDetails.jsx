import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';

export default function SocietyAdditionalDetails() {
  const fetchWrapper = useFetchWrapper();
  const [other, setOther] = useState();

  const getAdditional = () => {
    fetchWrapper.get(ANG_APIS.GET_OTHER).then((res) => {
      setOther(res.data);
    });
  };

  useEffect(() => {
    getAdditional();
  }, []);

  return (
    <>
      <div style={{ marginTop: '30px' }}></div>
      <div ng-controller="AdditionalInventoryDetailCtrl">
        <form
          name="myForm"
          sf-schema="schema"
          sf-form="form"
          sf-model="model"
          role="form"
          ng-submit="onSubmit(myForm)"
        ></form>
      </div>
    </>
  );
}
