import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useFetchWrapper } from '../../_helpers/fetch-wrapper';
import { Apis, Labels } from '../../app.constants';
import { useAlertActions } from '../alert.actions';
import { CampaignInventoryAtom, HeaderDataListAtom, OrganisationListAtom, UserMinimalListAtom, SupplierPhaseListAtom, BookingStatusAtom } from '../../_states';
import { errorAtom } from '../../_states/alert';
const BookinPlanActions = () => {
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setErrorAtom = useSetRecoilState(errorAtom);
    const setCampaignInventory = useSetRecoilState(CampaignInventoryAtom);
    const setHeaderDataList = useSetRecoilState(HeaderDataListAtom);
    const setOrganisationList = useSetRecoilState(OrganisationListAtom);
    const setUserMinimalList = useSetRecoilState(UserMinimalListAtom);
    const [supplierPhaseList, setSupplierPhaseList] = useRecoilState(SupplierPhaseListAtom);
    const setBookinStatus = useSetRecoilState(BookingStatusAtom);
    const CampaignProposalId = 'HDFHDF0789';


    const getCampaignInventories = (data) => {
        //     pageNo: 0,
        // supplier_type_code: 'ALL',
        // search: '',
        // booking_status_code: '',
        // phase_id: '',
        // assigned: '',
        // start_date: new Date(),
        // end_date: new Date(),
        let params = 'page=' + (data.pageNo + 1) + "&supplier_type_code=" + data.supplier_type_code;
        params += '&booking_status_code=' + data?.booking_status_code;
        params += "&phase_id=" + data?.phase_id;
        params += "&start_date=" + data?.start_date + "&end_date=" + data?.end_date;
        params += + "&assigned=" + data?.assigned;
        setErrorAtom(true);
        return fetchWrapper.get(`v0/ui/website/${CampaignProposalId}/campaign-inventories/?${params}`).then((res) => {
            if (res?.status) {
                setCampaignInventory(res.data);
            } else {
                alertActions.error(Labels.Error);
            }
            setErrorAtom(false);
        });
    };

    const getBookingStatus = () => {
        return fetchWrapper.get(`${Apis.Get_Booking_Status}${CampaignProposalId}`).then((res) => {
            if (res.status) {
                let newList = res.data.map(item => ({ ...item, label: item?.name, value: item?.code }));
                setBookinStatus(newList);
            } else {
                alertActions.error(Labels.Error);
            }
        });
    }

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
            if (res?.status) {
                return res?.data;
            } else {
                alertActions.error(Labels.Error);
            }
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

    const updateCampaignInventories = (data) => {
        return fetchWrapper.put(`/v0/ui/website/${CampaignProposalId}/campaign-inventories/`, data).then((res) => {
            if (res?.status) {
                alertActions.success(res.data);
            }
            else {
                alertActions.error(Labels.Error);
            }
        })
    }

    const uploadBookingPlan = (file) => {
        return fetchWrapper.post(``, file, true).then((res) => {
            if (res?.status) {
                alertActions.success(Labels.Upload_Success);
            }
            else {
                alertActions.error(Labels.Error);
            }
        })
    }

    const saveSupplierPhaseList = (data) => {
        return fetchWrapper.post(`${Apis.Post_Supplier_Phase}?campaign_id=${CampaignProposalId}`, data).then((res) => {
            if (res?.status) {
                alertActions.success(Labels.Save_Success);
                getSupplierPhase();
            }
            else {
                alertActions.error(Labels.Error);
            }
        })
    }
    const getSupplierPhase = () => {
        return fetchWrapper.get(`${Apis.Get_Supplier_Phase}?campaign_id=${CampaignProposalId}`).then((res) => {
            if (res?.status) {
                let newList = res.data.map(item => ({ ...item, label: item?.phase_no, value: item?.id }));
                setSupplierPhaseList(newList);
            }
            else {
                alertActions.error(Labels.Error);
            }
        })
    }
    const deletSupplierPhase = (row) => {
        return fetchWrapper.delete(`${Apis.Delete_Supplier_Phase}${row?.id}/`).then((res) => {
            if (res.status) {
                alertActions.success(Labels.Delete_Success);
                let newList = supplierPhaseList.filter(item => item.id !== row?.id);
                setSupplierPhaseList(newList);
            }
            else {
                alertActions.error(Labels.Error);
            }
        });
    }

    const postEmailPaymentDetail = (data) => {
        return fetchWrapper.post(`${Apis.Send_Email_Payment_Detail}`, data).then((res) => {
            if (res?.status) {
                alertActions.success(Labels.Email_Success);
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
        getSupplierPhase,
        getBookingStatus,
        updateCampaignInventories,
        uploadBookingPlan,
        saveSupplierPhaseList,
        deletSupplierPhase,
        postEmailPaymentDetail
    };
}
export { BookinPlanActions };