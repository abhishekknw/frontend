import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import InventorySummary from './InventorySummary';
import CommonImages from '../CommonImages';
import BasicDetailsHording from './BasicDetailsHording';
import CommonPricingDetails from '../CommonPricingDetails';

export default function Hording() {
  const { id } = useParams();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('basic');

  const isTabActive = (tab) => {
    if (tab === activeTab) {
      return true;
    } else {
      return false;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicDetailsHording />;
      case 'inventory':
        return <InventorySummary />;
      case 'pricing':
        return <CommonPricingDetails code={'HO'} />;
      case 'images':
        return <CommonImages type={'Hording'} code={'HO'} />;
      default:
        return <BasicDetails />;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="middle-section">
        <div className="navbar-collapse tabBox" ng-controller="HeaderCtrl">
          <ul className="nav nav-pills" ng-if="isSupplierSelected()">
            <li
              className={`${isTabActive('basic') && 'active'}`}
              onClick={() => handleTabChange('basic')}
            >
              <a role="button" className="lipadding">
                Basic
              </a>
            </li>
            <li
              className={`${isTabActive('inventory') && 'active'}`}
              onClick={() => handleTabChange('inventory')}
            >
              <a role="button" className="lipadding">
                Inventory Summary
              </a>
            </li>
            <li
              className={`${isTabActive('pricing') && 'active'}`}
              onClick={() => handleTabChange('pricing')}
            >
              <a role="button" className="lipadding">
                Pricing
              </a>
            </li>
            <li
              className={`${isTabActive('images') && 'active'}`}
              onClick={() => handleTabChange('images')}
            >
              <a role="button" className="lipadding">
                Images
              </a>
            </li>
          </ul>
          <button
            onClick={() => history.goBack()}
            type="button"
            className="smallBtn backbtn back_btn_list"
            ng-click="back_to()"
          >
            Back
          </button>
        </div>
        {/* <div className="error1">
                <div className="error">{errorMsg}</div>
            </div> */}
        <div className="dataShowBox" ui-view="">
          {renderTabContent()}
        </div>
      </div>
    </>
  );
}
