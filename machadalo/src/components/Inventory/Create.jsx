import React from 'react';

import CreateBaseInventory from './CreateBaseInventory';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Create extends React.Component {
  render() {
    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Create Base Inventory </h3>
        </div>
        <Tabs>
          <TabList>
            <Tab className="react-tabs__tab inventory-tab">Inventory</Tab>
          </TabList>

          <TabPanel>
            <br />
            <CreateBaseInventory {...this.props} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
