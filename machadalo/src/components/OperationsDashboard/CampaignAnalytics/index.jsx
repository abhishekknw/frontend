import React from 'react';
// import '../../bootstrap-iso.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
import request from 'superagent';
import config from '../../../config';
import getCampaignColumn from './CampaignGridColumnConfig';
import Grid from '../../Grid';
import SupplierAnalytics from '../SupplierAnalytics';
import LoadingWrapper from '../../Shared/LoadingWrapper';

import readXlsxFile from 'read-excel-file';

class CampaignAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierData: {},
      selectedCampaign: '',
      token: '',
      typeOfCampaign: '',
    };
  }
  componentDidMount() {
    this.props.getTappingDetails();
  }

  isExpandableRow = (row) => {
    return row.campaign_id == this.state.selectedCampaign ? true : false;
  };

  expandComponent = () => {
    return (
      <SupplierAnalytics
        supplierData={this.state.supplierData}
        token={this.state.token}
        campaignType={this.state.typeOfCampaign}
      />
    );
  };

  getSupplierCampaignDetails = (campaignId, typeOfCampaign) => {
    const { tappingData } = this.props.tappingDetails;
    console.log(typeOfCampaign);
    const { token } = tappingData;
    this.setState({
      selectedCampaign: campaignId,
      token,
      typeOfCampaign,
    });
    request
      .get(`${config.API_URL}/v0/ui/ops/campaign/supplier-count/?campaign_id=${campaignId}`)
      .set('Authorization', `JWT ${token}`)
      .then((resp) => {
        this.setState({
          supplierData: resp.body.data,
        });
      })
      .catch((ex) => {
        console.log('Failed to get data');
      });
  };

  fileUpload(e) {
    var fileSelect = e.target.files[0];

    readXlsxFile(fileSelect).then((rows) => {
      let fileData = [];
      if (rows && rows.length > 1) {
        let header = rows[0];
        for (var i = 1; i < rows.length; i++) {
          var obj = {};
          var currentline = rows[i];
          for (var j = 0; j < header.length; j++) {
            obj[header[j]] = currentline[j];
          }
          fileData.push(obj);
        }
      }
      // return JSON.stringify(fileData);
      this.fetchAreaData(fileData);
    });
  }

  fetchAreaData = (fileData) => {
    const { token } = this.props.auth;
    request
      .post(`${config.API_URL}/v0/ui/bulk-locations/`)
      .set('Authorization', `JWT ${token}`)
      .send(fileData)
      .then((resp) => {
        this.setState({
          supplierData: resp.body.data,
        });
      })
      .catch((ex) => {
        console.log('Failed to get data');
      });
  };

  render() {
    const { tappingData, isFetchingTappingList } = this.props.tappingDetails;
    const { data } = tappingData;
    const listData = [];
    if (data) {
      Object.keys(data).map((key) => {
        listData.push(data[key]);
      });
    }

    return (
      <div className="bootstrap-iso">
        <span className="pull-right">
          <label>Upload Area/Subarea Excel </label>
          <input type="file" id="upload_file" onChange={(e) => this.fileUpload(e)} />
          <br />
          <a href="/sample_files/area_subarea.xlsx" download>
            Download demo{' '}
          </a>
        </span>

        {isFetchingTappingList ? (
          <LoadingWrapper />
        ) : (
          <Grid
            columns={getCampaignColumn()}
            data={listData}
            headerValue="Campaign Report"
            exportCsv={false}
            search={true}
            pagination={true}
            onRowClick={(row) => {
              this.getSupplierCampaignDetails(row.campaign_id, row.type_of_end_customer);
            }}
            isExpandableRow={this.isExpandableRow}
            expandComponent={this.expandComponent}
          />
        )}
      </div>
    );
  }
}

export default CampaignAnalytics;
