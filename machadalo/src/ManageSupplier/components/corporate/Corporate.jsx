import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import BasicDetailsCorporate from './BasicDetailsCorporate';
import EventDetailsPage from './EventDetailsPage';
import AmmentiesDetails from './AmmentiesDetails';
import CommonImages from '../CommonImages';
import CommonPricingDetails from '../CommonPricingDetails';
import CommonInventorySummary from '../CommonInventory';

export default function Corporate({ corporateCount }) {
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
        return <BasicDetailsCorporate />;
      case 'inventory':
        return <CommonInventorySummary code={'CP'} />;
      case 'pricing':
        return <CommonPricingDetails code={'CP'} />;
      case 'events':
        return <EventDetailsPage />;
      case 'ammenties':
        return <AmmentiesDetails />;
      case 'images':
        return <CommonImages type={'Corporate'} code={'CP'} />;
      default:
        return <BasicDetailsCorporate />;
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
              className={`${isTabActive('events') && 'active'}`}
              onClick={() => handleTabChange('events')}
            >
              <a role="button" className="lipadding">
                Events
              </a>
            </li>
            <li
              className={`${isTabActive('ammenties') && 'active'}`}
              onClick={() => handleTabChange('ammenties')}
            >
              <a role="button" className="lipadding">
                Ammenties
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
