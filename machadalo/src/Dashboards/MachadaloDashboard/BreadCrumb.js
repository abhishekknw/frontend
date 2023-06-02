import { useRecoilState,useRecoilValue } from "recoil";
import { showHideBreadcrumbsAtom} from '../Recoil/States/Machadalo';
import React from 'react';

const BreadCrumbData = () => {
    const [showHideBreadCrumbs, setShowHideBreadCrumbs] = useRecoilState(showHideBreadcrumbsAtom);

    return(
        <>
        <nav>
          <ol className="breadcrumb">
            {showHideBreadCrumbs.first.show && (
              <li>
                <a>
                  <span>{showHideBreadCrumbs.first.tableName}</span>
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


export {BreadCrumbData};