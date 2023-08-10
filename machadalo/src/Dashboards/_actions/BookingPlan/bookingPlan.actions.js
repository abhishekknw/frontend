import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useFetchWrapper } from '../../_helpers/fetch-wrapper';
import { Apis, Labels } from '../../app.constants';
import { useAlertActions } from '../alert.actions';
import { CampaignInventoryAtom, HeaderDataListAtom, OrganisationListAtom, UserMinimalListAtom, SupplierPhaseListAtom } from '../../_states';
import { errorAtom } from '../../_states/alert';

const BookinPlanActions = () => {
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setCampaignInventory = useSetRecoilState(CampaignInventoryAtom);
    const setHeaderDataList = useSetRecoilState(HeaderDataListAtom);
    const setOrganisationList = useSetRecoilState(OrganisationListAtom);
    const setUserMinimalList = useSetRecoilState(UserMinimalListAtom);
    const [supplierPhaseList, setSupplierPhaseList] = useRecoilState(SupplierPhaseListAtom)
    const CampaignProposalId = 'HDFHDF0789';


    const getCampaignInventories = (data) => {
        let params = 'page=' + (data.pageNo + 1) + "&supplier_type_code=" + data.supplierCode;
        return fetchWrapper.get(`v0/ui/website/${CampaignProposalId}/campaign-inventories/?${params}`).then((res) => {
            setCampaignInventory(res.data)
        });
    };

    const getHeaderData = (data) => {
        // let params = "?next_page=" + data.pageNo + '&search=' + data.search;
        return fetchWrapper.get(`${Apis.Get_Header_Data}`).then((res) => {
            setHeaderDataList(res.data);
            return res.data.ALL;
        });
    };
    const getRelationShipData = (data) => {
        let params = "supplier_id=" + data.object_id + "&supplier_code=" + data.supplier_code + "&campaign_id=" + data.proposal;
        return fetchWrapper.get(`${Apis.Get_Relationship_Data}${params}`).then((res) => {
            return res.data;
        });
    };

    const getContactDetailsData = (data) => {
        let params = "supplier_id=" + data?.object_id;
        return fetchWrapper.get(`${Apis.Get_Contact_Details}${params}`).then((res) => {
            return res.data;
        });
    };

    const getCommetByShortlistedId = (data, type) => {
        let params = `shortlisted_spaces_id=${data?.id}&related_to=${type === "externalComments" ? "EXTERNAL" : "INTERNAL"}`
        return fetchWrapper.get(`v0/ui/website/${data?.proposal}/comment/?${params}`).then((res) => {
            return res.data.general;
        });
    }
    const postCommentByShortlistedId = (data) => {
        return fetchWrapper.post(`v0/ui/website/${CampaignProposalId}/comment/`, data).then((res) => {
            if (res.status) {
                alertActions.success(res.data);
            }
            else {
                alertActions.error(res.data);
            }
        });
    }

    const getOrganisationList = (id) => {
        return fetchWrapper.get(`${Apis.Get_Organisation_List}`).then((res) => {
            if (res.status) {
                let newList = res.data.map(item => ({ ...item, label: item?.name, value: item?.organisation_id }));
                setOrganisationList(newList);
            }
            else {
                alertActions.error(Labels.Error);
            }
        });
    }
    const postBrandAssignment = (data) => {
        return fetchWrapper.post(`${Apis.Post_Brand_Assignment}`, data).then((res) => {
            if (res.status) {
                alertActions.success("Assigned successfully");
            }
            else {
                alertActions.error(Labels.Error);
            }
        });
    }

    const getUserMinimalList = () => {
        return fetchWrapper.get(`${Apis.Get_User_Minimal_List}`).then((res) => {
            if (res.status) {
                let newList = res.data.map(item => ({ ...item, label: item?.username, value: item?.id }));
                setUserMinimalList(newList)
            }
            else {
                alertActions.error(Labels.Error);
            }
        });
    }
    const postSupplierAssignment = (data) => {
        return fetchWrapper.post(`${Apis.Post_Supplier_Assignment}`, data).then((res) => {
            if (res.status) {
                alertActions.success("Assigned successfully");
            }
            else {
                alertActions.error(Labels.Error);
            }
        });           
    }
    const getPermissionBoxImages = (data) => {
        return fetchWrapper.get(`${Apis.Get_Permission_Box_Images}?campaign_id=${data?.campaign_id}&supplier_id=${data?.supplier_id}`).then((res) => {
            if (res.status) {
                return res.data;
            }
            else {
                alertActions.error(Labels.Error);
            }
        });
    }
    const postPermissionBoxImages = (file) => {
        return fetchWrapper.post(`v0/ui/website/hashtag-images/${CampaignProposalId}/${Apis.Post_permission_Box_Images}`, file, true).then((res) => {
            if (res?.status) {
                alertActions.success(Labels.Upload_Success);
            }
            else {
                alertActions.error(Labels.Error);
            }
        })
    }
    const getReceiptImages = (data) => {
        return fetchWrapper.get(`${Apis.Get_Receipt_Images}?campaign_id=${data?.campaign_id}&supplier_id=${data?.supplier_id}`).then((res) => {
            if (res.status) {
                return res.data;
            }
            else {
                alertActions.error(Labels.Error);
            }
        });
    }
    const postReceiptImages = (file) => {
        return fetchWrapper.post(`v0/ui/website/hashtag-images/${CampaignProposalId}/${Apis.Post_Receipt_Images}`, file, true).then((res) => {
            if (res?.status) {
                alertActions.success(Labels.Upload_Success);
            }
            else {
                alertActions.error(Labels.Error);
            }
        })
    }
    const getSupplierPhase = () => {
        return fetchWrapper.get(`${Apis.Get_Supplier_Phase}?campaign_id=${CampaignProposalId}`).then((res) => {
            if (res?.status) {
                setSupplierPhaseList(res?.data);
            }
            else {
                alertActions.error(Labels.Error);
            }
        })
    }
    return {
        getCampaignInventories,
        getHeaderData,
        getRelationShipData,
        getContactDetailsData,
        getCommetByShortlistedId,
        postCommentByShortlistedId,
        getOrganisationList,
        getUserMinimalList,
        postBrandAssignment,
        postSupplierAssignment,
        getPermissionBoxImages,
        postPermissionBoxImages,
        getReceiptImages,
        postReceiptImages,
        getSupplierPhase
    };
}
export { BookinPlanActions };