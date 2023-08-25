import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import BasicDetails from './BasicDetails';
import SupplierRelationship from './SupplierRelationship';
import InventorySummary from './InventorySummary';
import BasicPricingDetails from './BasicPricingDetails';
import FlatDetails from './FlatDetails';
import SocietyInventoryDetails from './SocietyInventoryDetails';
import PosterDetails from './PosterDetails';
import Fliers from './Fliers';
import StandeeBannerDetails from './StandeeBannerDetails';
import StallDetails from './StallDetails';
import SocietyAdditionalDetails from './SocietyAdditionalDetails';
import EventDetailsPage from './EventDetailsPage';
import AmmentiesDetails from './AmmentiesDetails';
import CommonImages from '../CommonImages';

export default function Society() {
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
        return <BasicDetails />;
      case 'relationship':
        return <SupplierRelationship />;
      case 'inventory':
        return <InventorySummary />;
      case 'pricing':
        return <BasicPricingDetails />;
      case 'flats':
        return <FlatDetails />;
      case 'towers':
        return <SocietyInventoryDetails />;
      case 'posters':
        return <PosterDetails />;
      case 'fliers':
        return <Fliers />;
      case 'standees':
        return <StandeeBannerDetails />;
      case 'stalls':
        return <StallDetails />;
      case 'other':
        return <SocietyAdditionalDetails />;
      case 'events':
        return <EventDetailsPage />;
      case 'ammenties':
        return <AmmentiesDetails />;
      case 'images':
        return <CommonImages type={'Society'} code={'RS'} />;
      default:
        return <BasicDetails />;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update the URL without actually navigating using the history API
    // if(tab !== 'basic') {
    //     history.replace(`society/${id}/${tab}`);
    // } else {
    //     window.history.pushState(null, null, `society/${id}`);
    // }
  };

  return (
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
            className={`${isTabActive('relationship') && 'active'}`}
            onClick={() => handleTabChange('relationship')}
          >
            <a role="button" className="lipadding">
              Supplier Relationship
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
            className={`${isTabActive('flats') && 'active'}`}
            onClick={() => handleTabChange('flats')}
          >
            <a role="button" className="lipadding">
              Flats
            </a>
          </li>
          <li
            className={`${isTabActive('towers') && 'active'}`}
            onClick={() => handleTabChange('towers')}
          >
            <a role="button" className="lipadding">
              Towers
            </a>
          </li>
          <li
            className={`${isTabActive('posters') && 'active'}`}
            onClick={() => handleTabChange('posters')}
          >
            <a role="button" className="lipadding">
              Posters
            </a>
          </li>
          <li
            className={`${isTabActive('fliers') && 'active'}`}
            onClick={() => handleTabChange('fliers')}
          >
            <a role="button" className="lipadding">
              Fliers
            </a>
          </li>
          <li
            className={`${isTabActive('standees') && 'active'}`}
            onClick={() => handleTabChange('standees')}
          >
            <a role="button" className="lipadding">
              Standees
            </a>
          </li>
          <li
            className={`${isTabActive('stalls') && 'active'}`}
            onClick={() => handleTabChange('stalls')}
          >
            <a role="button" className="lipadding">
              Stalls
            </a>
          </li>
          <li
            className={`${isTabActive('other') && 'active'}`}
            onClick={() => handleTabChange('other')}
          >
            <a role="button" className="lipadding">
              Other
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
          {/* <li ng-className="{ active: isActive('/society/{{societyId}}/images')}"><a ng-href="#/society/{{societyId}}/images" className="lipadding">Images</a></li> */}
        </ul>
        <button
          type="button"
          className="smallBtn backbtn back_btn_list"
          onClick={() => history.goBack()}
        >
          Back
        </button>
      </div>
      {/* <div className="error1">
                    <div className="error">{{ errorMsg }}</div>
                </div> */}
      <div className="dataShowBox" ui-view="">
        {renderTabContent()}
      </div>
    </div>
  );
}
