export const Labels = {
    Success: 'success',
    Error: 'error',
    Login_Success: "Login successfully",
    Upload_Success: "Uploaded successfully",
    Update_Success: 'Update Successfully',
    Email_Success: "Email Sent Successfully",
    Save_Success: 'Save Successfully',
    Delete_Success: 'Delete Successfully'
}
export const BaseImageUrl = 'https://androidtokyo.s3.amazonaws.com/';

export const Apis = {
    New_Leads_Campaign: "v0/ui/b2b/get-basic-lead-distribution-campaign/?tabname=basic",
    Lead_By_Campaign: 'v0/ui/b2b/get-dynamic-basic-lead-form-headers/',
    Client_Status_By_Campaign: 'v0/ui/b2b/machadalo-client-status-list/?campaign_id=',
    SendEmail_By_Campaign: "v0/ui/b2b/email-leads-summary/",
    Update_Client_Status: "v0/ui/b2b/update-machadalo-client-status/",
    Get_Comment_List: "v0/ui/b2b/basic-client-comment/",
    Accept_Decline_Leads: 'v0/ui/b2b/update-client-decision-status/',
    Upload_Comments_File: 'v0/ui/b2b/upload-lead-comments/',
    Get_Leads_By_Supplier: "v0/ui/b2b/supplier-leads-decision-pending/?supplier_id=",

    // Campaign
    Get_Invoice_Proposals: "v0/ui/website/proposal/invoice_proposals/",
    Get_Organisations: 'v0/ui/website/organisation/get_organisations_for_assignment/',
    Get_User_Minimal_List: 'v0/ui/website/get-users-minimal-list/',
    Get_Organisation_List: 'v0/ui/website/organisation/',

    // Campaign List
    Get_Campaign_Assignment: 'v0/ui/website/campaign-assignment/',

    // Booking Plan
    Get_Header_Data: 'v0/ui/getHeaderData',
    Get_Relationship_Data: "v0/ui/website/get-relationship-and-past-campaigns-data/?",
    Get_Contact_Details: 'v0/ui/website/inventory-contact-details/?',
    Post_Brand_Assignment: "v0/ui/website/brand-assignment/",
    Post_Supplier_Assignment: "v0/ui/website/supplier-assignment/",
    Get_Permission_Box_Images: "v0/ui/website/hashtag-images/get_permission_box_images/",
    Post_permission_Box_Images: "upload_permission_box_image/",
    Get_Receipt_Images: 'v0/ui/website/hashtag-images/get_receipt_images/',
    Post_Receipt_Images: 'upload_receipt_image/',
    Get_Supplier_Phase: 'v0/ui/website/supplier-phase/',
    Get_Booking_Status: 'v0/ui/website/booking-status/',
    Post_Supplier_Phase: 'v0/ui/website/supplier-phase/',
    Delete_Supplier_Phase: 'v0/ui/website/supplier-phase/',
    Send_Email_Payment_Detail: 'v0/ui/website/mail/',
    Get_Proposal_Centre_Mapping: 'v0/ui/website/proposal-center-mapping/',
    Update_Cheque_Detail: 'v0/ui/society/',
    Put_Assign_Supplier_User: 'v0/ui/website/assign-supplier-users/',
    Get_Area_By_city: 'v0/ui/getCityArea?search=',
    Get_Sub_Area: 'v0/ui/locations/',
    Supplier_Search: 'v0/ui/website/supplier-search/',
    Post_Supplier_List: 'v0/ui/website/add-suppliers-direct-to-campaign/',
    Delete_Camapign_Inventory: 'v0/ui/website/delete-shortlisted-spaces/',
    Get_Inventory_List: 'v0/ui/website/short-listed-inventories/',

    // REQUIREMENTS
    Get_Sector_List: 'v0/ui/b2b/sector-list/',
    Get_Leads_By_Sector: 'v0/ui/b2b/sector-wise-lead-details/'
}

