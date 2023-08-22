import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useFetchWrapper } from '../../_helpers/fetch-wrapper';
import { Apis, Labels } from '../../app.constants';
import { useAlertActions } from '../alert.actions';
import {
    CampaignInventoryAtom,
    HeaderDataListAtom,
    OrganisationListAtom,
    UserMinimalListAtom,
    SupplierPhaseListAtom,
    BookingStatusAtom,
    supplierSearchListAtom,
    filtersCheckBoxAtom,
    finalSupplierListAtom,
    ContactListAtom,
    InventoryListAtom
} from '../../_states';
import { errorAtom } from '../../_states/alert';
import dayjs from 'dayjs';
import API_URL from '../../../config';

const BookinPlanActions = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setErrorAtom = useSetRecoilState(errorAtom);
    const [campaignInventory, setCampaignInventory] = useRecoilState(CampaignInventoryAtom);
    const setHeaderDataList = useSetRecoilState(HeaderDataListAtom);
    const setOrganisationList = useSetRecoilState(OrganisationListAtom);
    const setUserMinimalList = useSetRecoilState(UserMinimalListAtom);
    const [supplierPhaseList, setSupplierPhaseList] = useRecoilState(SupplierPhaseListAtom);
    const setBookinStatus = useSetRecoilState(BookingStatusAtom);
    const setSupplierSearch = useSetRecoilState(supplierSearchListAtom)
    const filtersCheckbox = useRecoilValue(filtersCheckBoxAtom);
    const finalSupplierList = useRecoilValue(finalSupplierListAtom);
    const [contactList, setContactList] = useRecoilState(ContactListAtom);
    const setInventoryList = useSetRecoilState(InventoryListAtom)

    const CampaignProposalId = queryParameters.get("campaignId");
    // 'HDFHDF0789';
    // 'TESTESBD56'

    const getCampaignInventories = (data) => {
        let params = 'page=' + (data.pageNo + 1) + "&supplier_type_code=" + data.supplier_type_code;
        if (data?.booking_status_code) params += '&booking_status_code=' + data?.booking_status_code;
        if (data?.phase_id) params += "&phase_id=" + data?.phase_id;
        if (data?.assigned) params += "&assigned=" + data?.assigned;
        if (data?.start_date && data?.end_date) {
            params += "&start_date=" + dayjs(data.start_date).format('YYYY-MM-DD') + "&end_date=" + dayjs(data.start_date).format('YYYY-MM-DD');
        }
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
                setContactList(res?.data);
            } else {
                alertActions.error(Labels.Error);
            }
        });
    };

    const deletContact = (data) => {
        console.log(data, "TESTESBD56")
        return fetchWrapper.get(`${Apis.Get_Contact_Details}`).then((res) => {
            if (res?.status) {
                alertActions.success(Labels.Success);
            } else {
                alertActions.error(Labels.Error);
            }
        });
    }

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
    // ?proposal_id=TESTESBD56
    const getProposalMapping = () => {
        return fetchWrapper.get(`${Apis.Get_Proposal_Centre_Mapping}?proposal_id=${CampaignProposalId}`).then((res) => {
            if (res.status) {
                return res.data;
            }
            else {
                alertActions.error(Labels.Error);
            }
        });
    }

    const uploadBookingPlan = (file) => {
        return fetchWrapper.post(`v0/ui/website/import-sheet-in-existing-campaign/`, file, true).then((res) => {
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
    const updateChequeDetail = (data) => {
        return fetchWrapper.post(`${Apis.Update_Cheque_Detail}`, data).then((res) => {
            if (res) {
                alertActions.success(Labels.Save_Success);
            }
            else {
                alertActions.error(Labels.Error);
            }
        })
    }

    const putAssignSupplierUser = (data) => {
        return fetchWrapper.put(`${Apis.Put_Assign_Supplier_User}`, data).then((res) => {
            if (res?.status) {
                alertActions.success(Labels.Update_Success)
            } else {
                alertActions.error(Labels.Error)
            }
        })
    }

    const getAreaBycity = (city) => {
        return fetchWrapper.get(`${Apis.Get_Area_By_city}${city}`).then((res) => {
            if (res?.status) {
                return res?.data
            } else {
                alertActions.error(Labels.Error)
            }
        })
    }
    const getSubAreaByArea = (area) => {
        return fetchWrapper.get(`${Apis.Get_Sub_Area}${area}/?type=sub_areas`).then((res) => {
            return res;
        })
    }
    const deletInventory = (id) => {
        let data = [id];
        return fetchWrapper.post(`${Apis.Delete_Camapign_Inventory}`, data).then((res) => {
            if (res?.status) {
                alertActions.success(Labels.Delete_Success)
                let newList = campaignInventory.shortlisted_suppliers.filter((item) => item.id !== id);
                setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList })

            } else {
                alertActions.error(Labels.Error)
            }
            return res;
        })
    }
    const SupplierSearch = (data) => {
        let params = "supplier_type_code=" + data?.supplier_type_code;
        params += "&supplier_center=" + data?.supplier_center;
        params += "&supplier_area=" + data?.supplier_area;
        params += "&search=" + data?.search;
        params += "&supplier_area_subarea=" + data?.supplier_area_subarea;
        params += "&proposal_id=" + data?.proposal_id
        return fetchWrapper.get(`${Apis.Supplier_Search}?${params}`).then((res) => {
            if (res?.status) {
                setSupplierSearch(res?.data)
            } else {
                alertActions.error(Labels.Error)
            }
        })
    }

    const submitSupplierList = () => {
        let filters = [];
        let center_data = {};
        let data = {};
        filtersCheckbox.map((item, index) => {
            if (item?.checked) {
                filters.push({ id: item?.value });
            }
        });
        finalSupplierList.map((supplier, index) => {
            let code = '';
            if (supplier.supplier_code) {
                code = supplier.supplier_code;
            }
            if (supplier.supplier_type) {
                code = supplier.supplier_type;
            }
            let supplierKeyValueData = {
                id: supplier.supplier_id,
                status: 'F',
            };
            if (!center_data[code]) {
                center_data[code] = {};
                center_data[code]['supplier_data'] = [];
                center_data[code]['filter_codes'] = filters;
            }
            if (code != null) center_data[code]['supplier_data'].push(supplierKeyValueData);
            data = {
                campaign_id: CampaignProposalId,
                center_data: center_data,
            };

            if (filters.length) {
                return fetchWrapper.post(`${Apis.Post_Supplier_List}`, data).then((res) => {
                    if (res?.status) {
                        alertActions.success(Labels.Success)
                    } else {
                        alertActions.error(Labels.Error)
                    }
                })
            } else {
                alertActions.error("Atleast One Supplier and One Filter is required to Continue")
            }
        });
    }

    const getInvetoryList = (id) => {
        return fetchWrapper.get(`${Apis.Get_Inventory_List}?shortlisted_spaces_id=${id}`).then((res) => {
            if (res?.status) {
                setInventoryList(res?.data);
            } else {
                alertActions.error(Labels.Error)
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
        postEmailPaymentDetail,
        getProposalMapping,
        updateChequeDetail,
        putAssignSupplierUser,
        getAreaBycity,
        getSubAreaByArea,
        SupplierSearch,
        submitSupplierList,
        deletInventory,
        getInvetoryList,
        deletContact
    };
}
export { BookinPlanActions };