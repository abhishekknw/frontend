import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CampaignInventoryAtom, BookingStatusAtom } from '../../_states';

const BookingFunctions = () => {
  const [campaignInventory, setCampaignInventory] = useRecoilState(CampaignInventoryAtom);
  const bookingStatus = useRecoilValue(BookingStatusAtom);

  const handleSelectPriority = (select, row) => {
    let newList = campaignInventory.shortlisted_suppliers.map((item) =>
      item?.id === row?.id ? { ...item, booking_priority: select?.value } : item
    );
    setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList });
  };

  const handleSelectPhase = (select, row) => {
    let newList = campaignInventory.shortlisted_suppliers.map((item) =>
      item?.id === row?.id ? { ...item, phase_no: select?.value, phase: select?.label } : item
    );
    setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList });
  };
  const handleNextActionDate = (date, row) => {
    let newList = campaignInventory.shortlisted_suppliers.map((item) =>
      item?.id === row?.id ? { ...item, next_action_date: new Date(date) } : item
    );
    setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList });
  };
  const handlePaymentStatus = (select, row) => {
    let newList = campaignInventory.shortlisted_suppliers.map((item) =>
      item?.id === row?.id ? { ...item, payment_status: select?.value } : item
    );
    setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList });
  };
  const handlePaymentmethod = (method, row) => {
    let newList = campaignInventory.shortlisted_suppliers.map((item) =>
      item?.id === row?.id ? { ...item, payment_method: method } : item
    );
    setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList });
  };
  const handleCompletionStatus = (check, row) => {
    let newList = campaignInventory.shortlisted_suppliers.map((item) =>
      item?.id === row?.id ? { ...item, is_completed: check } : item
    );
    setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList });
  };

  const handleSelectBookingStatus = (status, row) => {
    let newList = campaignInventory.shortlisted_suppliers.map((item) =>
      item?.id === row?.id ? { ...item, booking_status: status?.value } : item
    );
    setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList });
  };
  const handleBookingSubStatus = (status, row) => {
    let newList = campaignInventory.shortlisted_suppliers.map((item) =>
      item?.id === row?.id ? { ...item, booking_sub_status: status?.value } : item
    );
    setCampaignInventory({ ...campaignInventory, shortlisted_suppliers: newList });
  };

  const getBookingSubStatusList = (id) => {
    let data = bookingStatus.filter((obj) => obj.value === id);
    let response = data[0]?.booking_substatus?.map((item) => ({
      ...item,
      label: item?.name,
      value: item?.code,
    }));
    return response;
  };

  return {
    handleSelectPriority,
    handleSelectPhase,
    handleNextActionDate,
    handlePaymentStatus,
    handlePaymentmethod,
    handlePaymentmethod,
    handleCompletionStatus,
    handleSelectBookingStatus,
    handleBookingSubStatus,
    getBookingSubStatusList,
  };
};
export { BookingFunctions };
