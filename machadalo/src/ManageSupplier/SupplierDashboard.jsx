import React, { useEffect, useState } from 'react';
import { MANAGE_SUPPLIER, SOCIETY_HOME } from '../constants/routes.constants';
import { useHistory } from 'react-router';
import { dashboardRepository } from './repository/dashboard.repo';
import { useFetchWrapper } from '../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from './api.constants';
import { useRecoilState } from 'recoil';
import { SupplierTypeAtom } from './supplier.atom';

export default function SupplierDashboard() {
  const history = useHistory();
  const fetchWrapper = useFetchWrapper();
  const [state, setState] = useState([]);
  const [value, setValue] = useState();
  const [searchState, setSearchState] = useState([]);
  const [supplierType, setSupplierType] = useRecoilState(SupplierTypeAtom);

  const getState = () => {
    fetchWrapper
      .get(ANG_APIS.GETSTATE)
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCounts = () => {
    fetchWrapper
      .get(ANG_APIS.GET_SUPPLIER_META)
      .then((res) => {
        setValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getState();
    getCounts();
  }, []);

  const handleViewAllClick = (type_short, type_full) => {
    setSupplierType(type_short);
    const existingIndex = searchState.findIndex((item) => item.supplier_type === type_short);
    if (existingIndex !== -1) {
      history.push(MANAGE_SUPPLIER + type_full + '/home/' + searchState[existingIndex].state_name);
    } else {
      history.push(MANAGE_SUPPLIER + type_full + '/home');
    }
  };

  const handleSocietyClick = () => {
    const existingIndex = searchState.findIndex((item) => item.supplier_type === 'RS');
    if (existingIndex !== -1) {
      history.push(SOCIETY_HOME + '/' + searchState[existingIndex].state_name);
    } else {
      history.push(SOCIETY_HOME);
    }
  };

  const handleSelectState = (event, supplier_type) => {
    const existingIndex = searchState.findIndex((item) => item.supplier_type === supplierType);
    let state_name = event.target.value;
    if (existingIndex !== -1) {
      const newData = [...searchState];
      newData[existingIndex] = { ...newData[existingIndex], state_name };
      setSearchState(newData);
    } else {
      setSearchState((prevData) => [...prevData, { supplier_type, state_name }]);
    }
  };

  const handleCreateClick = (type) => {
    history.push(MANAGE_SUPPLIER + 'create/' + type);
  };

  return (
    <>
      <div className="middle-section">
        <h2 className="heading">Dashboard</h2>
        <table className="table-data layoutfixed">
          <thead>
            <tr>
              <th>Supplier Type</th>
              <th>Total Count</th>
              <th>Create Supplier</th>
              <th>View Supplier</th>
              <th>Upload</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Society</td>
              <td>{value?.RS.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('RS')"
                  onClick={() => handleCreateClick('RS')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  onClick={handleSocietyClick}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[1]"
                    ngf-select="uploadFiles($file, 1)"
                    className="buttonfile"
                    accept=".xlsx"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="society.state_name"
                  ng-change="stateChange('RS',society.state_name)"
                  onChange={(event) => handleSelectState(event, 'RS')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Corporate</td>
              <td>{value?.CP.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('CP')"
                  onClick={() => handleCreateClick('CP')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('CP',corporate.state_name.value)"
                  onClick={() => handleViewAllClick('CP', 'corporate')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[2]"
                    className="buttonfile"
                    ngf-select="uploadFiles($file, 2)"
                    accept=".xlsx"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="corporate.state_name"
                  ng-change="stateChange('CP',corporate.state_name)"
                  onChange={(event) => handleSelectState(event, 'CP')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Gym</td>
              <td>{value?.GY.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('GY')"
                  onClick={() => handleCreateClick('GY')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('GY',gym.state_name.value)"
                  onClick={() => handleViewAllClick('GY', 'gym')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[3]"
                    className="buttonfile"
                    ngf-select="uploadFiles($file, 3)"
                    accept=".xlsx"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="gym.state_name"
                  ng-change="stateChange('GY',gym.state_name)"
                  onChange={(event) => handleSelectState(event, 'GY')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Salon</td>
              <td>{value?.SA.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('SA')"
                  onClick={() => handleCreateClick('SA')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('SA',salon.state_name.value)"
                  onClick={() => handleViewAllClick('SA', 'salon')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    className="buttonfile[4]"
                    ngf-select="uploadFiles($file, 4)"
                    accept=".xlsx"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="salon.state_name"
                  ng-change="stateChange('SA',salon.state_name)"
                  onChange={(event) => handleSelectState(event, 'SA')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Bus Shelter</td>
              <td>{value?.BS.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('BS')"
                  onClick={() => handleCreateClick('BS')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('BS',busshelter.state_name.value)"
                  onClick={() => handleViewAllClick('BS', 'busshelter')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[5]"
                    className="buttonfile"
                    ngf-select="uploadFiles($file, 5)"
                    accept=".xlsx"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="busshelter.state_name"
                  ng-change="stateChange('BS',busshelter.state_name)"
                  onChange={(event) => handleSelectState(event, 'BS')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>

            <tr>
              <td>Retail Shop</td>
              <td>{value?.RE.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('RE')"
                  onClick={() => handleCreateClick('RE')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('RE',retailshop.state_name.value)"
                  onClick={() => handleViewAllClick('RE', 'retailshop')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[6]"
                    className="buttonfile"
                    accept=".xlsx"
                    ngf-select="uploadFiles($file, 6)"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="retailshop.state_name"
                  ng-change="stateChange('RE',retailshop.state_name)"
                  onChange={(event) => handleSelectState(event, 'RE')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Educational Institute</td>
              <td>{value?.EI.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('EI')"
                  onClick={() => handleCreateClick('EI')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('EI',educationinsti.state_name.value)"
                  onClick={() => handleViewAllClick('EI', 'education-institute')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[8]"
                    className="buttonfile"
                    accept=".xlsx"
                    ngf-select="uploadFiles($file, 8)"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="educationinsti.state_name"
                  ng-change="stateChange('EI',educationinsti.state_name)"
                  onChange={(event) => handleSelectState(event, 'EI')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Hording</td>
              <td>{value?.HO.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('HO')"
                  onClick={() => handleCreateClick('HO')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('HO',hording.state_name.value)"
                  onClick={() => handleViewAllClick('HO', 'hording')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[9]"
                    className="buttonfile"
                    ngf-select="uploadFiles($file, 9)"
                    accept=".xlsx"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="hording.state_name"
                  ng-change="stateChange('HO',hording.state_name)"
                  onChange={(event) => handleSelectState(event, 'HO')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Bus</td>
              <td>{value?.BU.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('BU')"
                  onClick={() => handleCreateClick('BU')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('BU',bus.state_name.value)"
                  onClick={() => handleViewAllClick('BU', 'bus')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[10]"
                    className="buttonfile"
                    ngf-select="uploadFiles($file, 10)"
                    accept=".xlsx"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="bus.state_name"
                  ng-change="stateChange('BU',bus.state_name)"
                  onChange={(event) => handleSelectState(event, 'BU')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Gantry</td>
              <td>{value?.GN.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('GN')"
                  onClick={() => handleCreateClick('GN')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('GN',gantry.state_name.value)"
                  onClick={() => handleViewAllClick('GN', 'gantry')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[11]"
                    className="buttonfile"
                    ngf-select="uploadFiles($file, 11)"
                    accept=".xlsx"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="gantry.state_name"
                  ng-change="stateChange('GN',gantry.state_name)"
                  onChange={(event) => handleSelectState(event, 'GN')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Radio Channel</td>
              <td>{value?.RC.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('RC')"
                  onClick={() => handleCreateClick('RC')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('RC',radionChannel.state_name.value)"
                  onClick={() => handleViewAllClick('RC', 'radio-channel')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[12]"
                    className="buttonfile"
                    ngf-select="uploadFiles($file, 12)"
                    accept=".xlsx"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="radionChannel.state_name"
                  ng-change="stateChange('RC',radionChannel.state_name)"
                  onChange={(event) => handleSelectState(event, 'RC')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Tv Channel</td>
              <td>{value?.TV.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('TV')"
                  onClick={() => handleCreateClick('TV')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('TV',radionChannel.state_name.value)"
                  onClick={() => handleViewAllClick('TV', 'tv-channel')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[13]"
                    className="buttonfile"
                    ngf-select="uploadFiles($file, 13)"
                    accept=".xlsx"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="tvChannel.state_name"
                  ng-change="stateChange('TV',tvChannel.state_name)"
                  onChange={(event) => handleSelectState(event, 'TV')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Corporates</td>
              <td>{value?.CO.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('CO')"
                  onClick={() => handleCreateClick('CO')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('CO',radionChannel.state_name.value)"
                  onClick={() => handleViewAllClick('CO', 'corporates')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[13]"
                    className="buttonfile"
                    ngf-select="uploadFiles($file, 13)"
                    accept=".xlsx"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="corporates.state_name"
                  ng-change="stateChange('CO',corporates.state_name)"
                  onChange={(event) => handleSelectState(event, 'CO')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
            <tr>
              <td>Hospital</td>
              <td>{value?.HL.count}</td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotocreate('HL')"
                  onClick={() => handleCreateClick('HL')}
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  ng-click="gotohome('HL',radionChannel.state_name.value)"
                  onClick={() => handleViewAllClick('HL', 'hospital')}
                  value="View All"
                />
              </td>
              <td>
                <div className="upload">
                  <span>Upload File</span>
                  <input
                    type="file"
                    ng-if="!loading[13]"
                    className="buttonfile"
                    ngf-select="uploadFiles($file, 13)"
                    accept=".xlsx"
                  />
                </div>
                <span className="attachedFileName"></span>
                <div>
                  <a href="/sample_files/supplier_upload.xlsx" download>
                    Sample file
                  </a>
                </div>
              </td>
              <td>
                <select
                  className="field"
                  ng-options="state.label for state in state_names"
                  ng-model="hospital.state_name"
                  ng-change="stateChange('HL',hospital.state_name)"
                  onChange={(event) => handleSelectState(event, 'HL')}
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_code}>
                          {item.state_name}
                        </option>
                      );
                    })}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="messagesBox">
          <div ng-if="isSuperUser">
            <p>
              <small>*</small>You have access to all cities.{' '}
            </p>
          </div>
          {/* <div ng-hide="isSuperUser == null || isSuperUser == true">
            <p>
              <small>*</small>You have access to these cities:{' '}
            </p>
            <p>
              <span ng-repeat="city in authcities"></span>
            </p>
          </div> */}
          <div ng-show="noServer">
            <p style={{ color: '#e84a73' }}>
              <strong> !!</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
