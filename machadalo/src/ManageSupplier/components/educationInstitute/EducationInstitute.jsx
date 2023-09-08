import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import CommonImages from '../CommonImages';
import BasicDetailsEducationInstitute from './BasicDetailsEducationInstitute';
import CommonPricingDetails from '../CommonPricingDetails';
import CommonInventorySummary from '../CommonInventory';

export default function EducationInstitute() {
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
        return <BasicDetailsEducationInstitute />;
      case 'inventory':
        return <CommonInventorySummary code={'EI'} />;
      case 'pricing':
        return <CommonPricingDetails code={'EI'} />;
      case 'images':
        return <CommonImages type={'Education Institute'} code={'EI'} />;
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
