import { useRecoilState, useRecoilValue } from 'recoil';
import { showHideBreadcrumbsAtom, showHideTable, scrollAtom } from '../_states';
import React, { useRef, useEffect } from 'react';

const BreadCrumbData = () => {
  const scroll = useRef(null);
  const [showHideBreadCrumbs, setShowHideBreadCrumbs] = useRecoilState(showHideBreadcrumbsAtom);
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [showHideBreadCrumbs]);
  function handleClick(btnName) {
    if (btnName === 'View Client Wise' || btnName === 'View Agency Wise') {
      setShowHideBreadCrumbs({
        ...showHideBreadCrumbs,
        first: { show: true, tableName: btnName },
        second: { show: false, tableName: '' },
        third: { show: false, tableName: '' },
        fourth: { show: false, tableName: '' },
      });

      setshowHideTableObj({
        ...showHideTableObj,
        ViewClientWise: true,
        ViewEndCustomerWise: false,
        ViewLeadDetail: false,
        ViewCampaignWise: false,
      });
    } else if (btnName === 'View Campaign Wise') {
      setShowHideBreadCrumbs({
        ...showHideBreadCrumbs,
        second: { show: true, tableName: btnName },
        third: { show: false, tableName: '' },
        fourth: { show: false, tableName: '' },
      });

      setshowHideTableObj({
        ...showHideTableObj,
        ViewClientWise: false,
        ViewEndCustomerWise: false,
        ViewLeadDetail: false,
        ViewCampaignWise: true,
      });
    } else if (btnName === 'View End Customer' || btnName === 'View City') {
      setShowHideBreadCrumbs({
        ...showHideBreadCrumbs,
        third: { show: true, tableName: btnName },
        fourth: { show: false, tableName: '' },
      });

      setshowHideTableObj({
        ...showHideTableObj,
        ViewClientWise: false,
        ViewEndCustomerWise: true,
        ViewLeadDetail: false,
        ViewCampaignWise: false,
      });
    }
  }
  return (
    <>
      <nav ref={scroll}>
        <ol className="breadcrumb">
          {showHideBreadCrumbs.first.show && (
            <li>
              <a>
                <span
                  onClick={(e) => {
                    handleClick(showHideBreadCrumbs.first.tableName);
                  }}
                >
                  {showHideBreadCrumbs.first.tableName}
                </span>
              </a>
            </li>
          )}
          {showHideBreadCrumbs.second.show && (
            <li>
              <a>
                <span
                  onClick={(e) => {
                    handleClick(showHideBreadCrumbs.second.tableName);
                  }}
                >
                  {showHideBreadCrumbs.second.tableName}
                </span>
              </a>
            </li>
          )}
          {showHideBreadCrumbs.third.show && (
            <li>
              <a>
                <span
                  onClick={(e) => {
                    handleClick(showHideBreadCrumbs.third.tableName);
                  }}
                >
                  {showHideBreadCrumbs.third.tableName}
                </span>
              </a>
            </li>
          )}
          {showHideBreadCrumbs.fourth.show && (
            <li>
              <a>
                <span
                  onClick={(e) => {
                    handleClick(showHideBreadCrumbs.fourth.tableName);
                  }}
                >
                  {showHideBreadCrumbs.fourth.tableName}
                </span>
              </a>
            </li>
          )}
        </ol>
      </nav>
    </>
  );
};

export { BreadCrumbData };
