import React from 'react';

import CreateType from './CreateType';
import CreateEntity from './CreateEntity';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Create extends React.Component {
  render() {
    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Create Entity/Entity Type </h3>
        </div>
        <Tabs>
          <TabList>
            <Tab className="react-tabs__tab entity-tab">Entity Type</Tab>
            <Tab className="react-tabs__tab entity-tab">Entity</Tab>
          </TabList>

          <TabPanel>
            <br />
            <CreateType {...this.props} />
          </TabPanel>
          <TabPanel>
            <br />
            <CreateEntity {...this.props} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
