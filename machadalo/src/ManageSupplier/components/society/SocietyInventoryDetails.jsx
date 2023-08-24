import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';

export default function SocietyInventoryDetails() {
  const errorMsg = false;
  const inventory_errorMsg = false;
  const count_errorMsg = false;
  const fetchWrapper = useFetchWrapper();
  const [tower, setTower] = useState();

  const getTower = () => {
    fetchWrapper.get(ANG_APIS.GET_TOWER).then((res) => {
      setTower(res.data);
    });
  };

  useEffect(() => {
    getTower();
  }, []);

  return (
    <>
      <div style={{ marginTop: '20px' }}></div>
      {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
      {inventory_errorMsg && (
        <div ng-show="inventory_errorMsg != undefined " style={{ color: 'red' }}>
          {{ inventory_errorMsg }}
        </div>
      )}
      {count_errorMsg && (
        <div ng-show="count_errorMsg != undefined " style="color:red">
          {{ count_errorMsg }}
        </div>
      )}
      <div>
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
