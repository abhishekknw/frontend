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
                ? { ...item, booking_priority: select?.value }
                : item
        );
    }
    return {
        handleSelectPriority,
        handleSelectPhase
    }
}
export { BookingFunctions };
