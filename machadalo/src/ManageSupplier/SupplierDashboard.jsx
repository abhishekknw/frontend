import React, { useEffect, useState } from 'react';
import MachadaloHeader from '../Dashboards/common/header/Header';
import './styles/main.css';
import './styles/login.css';
import './styles/style.css';
import './styles/machadalo.css';
import './bootstrap/css/bootstrap.css';
import { supplierRepository } from './repository';
import {
  CORPORATE_HOME,
  CREATE_SUPPLIER,
  MANAGE_SUPPLIER,
  SOCIETY_HOME,
} from '../constants/routes.constants';
import { useHistory } from 'react-router';
import { dashboardRepository } from './repository/dashboard.repo';
import { useFetchWrapper } from '../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from './api.constants';
import { useRecoilState } from 'recoil';
import { SupplierTypeAtom } from './supplier.atom';

export default function SupplierDashboard() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [value, setValue] = useState();
  const fetchWrapper = useFetchWrapper();
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
    history.push(MANAGE_SUPPLIER + type_full + '/home');
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
                  value="Create"
                />
              </td>
              <td>
                <input
                  type="button"
                  className="linkBtn"
                  onClick={() => history.push(SOCIETY_HOME)}
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
                >
                  <option value="">All</option>
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
                >
                  <option value="">All</option>
                  {state.length > 0 &&
                    state.map((item, key) => {
                      return (
                        <option key={key} value={item.state_name}>
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
