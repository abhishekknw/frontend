import React from 'react';
import { Link } from 'react-router-dom';

import EntityList from './EntityList';
import EntityTypeList from './EntityTypeList';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Create extends React.Component {
  render() {
    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Entity/Entity Type List</h3>
        </div>
        <Tabs>
          <TabList>
            <Tab className="react-tabs__tab entity-tab">Entity Type</Tab>
            <Tab className="react-tabs__tab entity-tab">Entity</Tab>
          </TabList>

          <TabPanel>
            <br />
            <EntityTypeList {...this.props} />
          </TabPanel>
          <TabPanel>
            <br />
            <EntityList {...this.props} />
          </TabPanel>
        </Tabs>
        <div className="list__actions">
          <Link to={'/r/entity/create'} className="btn btn--danger">
            Create Entity/Entity Type
          </Link>
        </div>
      </div>
    );
  }
}
