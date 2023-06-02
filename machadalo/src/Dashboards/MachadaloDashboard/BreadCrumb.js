import { useRecoilState,useRecoilValue } from "recoil";
import { breadcrumbAtom,showHideTable } from '../Recoil/States/Machadalo';
const BreadCrumbData = () => {

    const [breadCrumb,setBreadCrumb] = useRecoilState(breadcrumbAtom);
    const showHideTableObj = useRecoilValue(showHideTable);

    const GetDataArray =(btnName)=>{
        console.log(showHideTableObj);
        if(!showHideTableObj.ViewClientWise){
            setBreadCrumb([...breadCrumb,btnName]);
        }
        else if(!showHideTableObj.ViewCampaignWise){
            setBreadCrumb([...breadCrumb,btnName]);
        }
        }
    return {
        GetDataArray,
    }

}


export {BreadCrumbData};