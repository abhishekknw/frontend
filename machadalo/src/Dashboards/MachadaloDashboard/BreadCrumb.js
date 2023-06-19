import { useRecoilState, useRecoilValue } from "recoil";
import { showHideBreadcrumbsAtom, showHideTable } from '../_states';
import React from 'react';

const BreadCrumbData = () => {
  const [showHideBreadCrumbs, setShowHideBreadCrumbs] = useRecoilState(showHideBreadcrumbsAtom);
  const [showHideTableObj, setshowHideTableObj] = useRecoilState(showHideTable);


  function handleClick(btnName) {
    console.log(showHideBreadCrumbs)
    if (btnName === "View Client Wise" || btnName === "View Agency Wise") {
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
    }


  }
  return (
    <>
      <nav>
        <ol className="breadcrumb">
          {showHideBreadCrumbs.first.show && (
            <li>
              <a>
                <span onClick={(e) => { handleClick(showHideBreadCrumbs.first.tableName) }}>{showHideBreadCrumbs.first.tableName}</span>
              </a>
            </li>
          )}
          {showHideBreadCrumbs.second.show && (
            <li>
              <a>
                <span>{showHideBreadCrumbs.second.tableName}</span>
              </a>
            </li>
          )}
          {showHideBreadCrumbs.third.show && (
            <li>
              <a>
                <span>{showHideBreadCrumbs.third.tableName}</span>
              </a>
            </li>
          )}
          {showHideBreadCrumbs.fourth.show && (
            <li>
              <a>
                <span>{showHideBreadCrumbs.fourth.tableName}</span>
              </a>
            </li>
          )}
        </ol>
      </nav>
    </>
  )

}


export { BreadCrumbData };