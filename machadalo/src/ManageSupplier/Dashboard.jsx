import React from 'react';
import MachadaloHeader from '../Dashboards/common/header/Header';

export default function ManageSupplier() {
  const data = [
    { type: 'Society' },
    { type: 'Corporate' },
    { type: 'Gym' },
    { type: 'Salon' },
    { type: 'Bus Shelter' },
    { type: 'Retail Shop' },
    { type: 'Educational Institute' },
    { type: 'Hording' },
    { type: 'Bus' },
    { type: 'Gantry' },
    { type: 'Radio Channel' },
    { type: 'Tv Channel' },
    { type: 'Corporates' },
    { type: 'Hospital' },
  ];

  return (
    <>
      <div className="container ">
        <MachadaloHeader />
      </div>
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
            {data.map((ele, key) => {
              return (
                <tr key={key}>
                  <td>{ele.type}</td>
                  <td></td>
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
                      ng-click="gotohome('RS',society.state_name.value)"
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
                      <img id="spinner" ng-if="loading[1]" src="/images/loading.gif" />
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
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="messagesBox">
          <div ng-if="isSuperUser">
            <p>
              <small>*</small>You have access to all cities.{' '}
            </p>
          </div>
          <div ng-hide="isSuperUser == null || isSuperUser == true">
            <p>
              <small>*</small>You have access to these cities:{' '}
            </p>
            <p>
              <span ng-repeat="city in authcities"></span>
            </p>
          </div>
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
