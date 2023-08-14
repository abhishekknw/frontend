import React from 'react'
import { useRecoilState } from 'recoil';
import { CampaignInventoryAtom } from '../../_states';


const BookingFunctions = () => {
    const [campaignInventory, setCampaignInventory] = useRecoilState(CampaignInventoryAtom);

    const handleSelectPriority = (select, row) => {
        let newList = campaignInventory.shortlisted_suppliers.map(item =>
            item?.id === row?.id
                ? { ...item, booking_priority: select?.value }
                : item
        );
        setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList })
    }

    const handleSelectPhase = (select, row) => {
        let newList = campaignInventory.shortlisted_suppliers.map(item =>
            item?.id === row?.id
                ? { ...item, phase_no: select?.value, phase: select?.label }
                : item
        );
        setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList })
    }
    const handleNextActionDate = (event, row) => {
        console.log(event.target.value, row)
        let newList = campaignInventory.shortlisted_suppliers.map(item =>
            item?.id === row?.id
                ? { ...item, next_action_date: event?.target?.value }
                : item
        );
        setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList })
    }
    const handlePaymentStatus = (select, row) => {
        let newList = campaignInventory.shortlisted_suppliers.map(item =>
            item?.id === row?.id
                ? { ...item, payment_status: select?.value }
                : item
        );
        setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList })
    }
    const handlePaymentmethod = (method, row) => {
        let newList = campaignInventory.shortlisted_suppliers.map(item =>
            item?.id === row?.id
                ? { ...item, payment_method: method }
                : item
        );
        setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList })
    }
    const handleCompletionStatus = (check, row) => {
        let newList = campaignInventory.shortlisted_suppliers.map(item =>
            item?.id === row?.id
                ? { ...item, is_completed: check }
                : item
        );
        setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList })
    }

    return {
        handleSelectPriority,
        handleSelectPhase,
        handleNextActionDate,
        handlePaymentStatus,
        handlePaymentmethod,
        handlePaymentmethod,
        handleCompletionStatus,
    }
}
export { BookingFunctions };
