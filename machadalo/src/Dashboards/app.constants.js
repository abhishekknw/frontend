export const Labels = {
  Success: 'success',
  Error: 'error',
  Login_Success: 'Login successfully',
  Upload_Success: 'Uploaded successfully',
  Email_Success: 'Email Sent Successfully',
};

export const Apis = {
  New_Leads_Campaign: 'v0/ui/b2b/get-basic-lead-distribution-campaign/?tabname=basic',
  Lead_By_Campaign: 'v0/ui/b2b/get-dynamic-basic-lead-form-headers/',
  Client_Status_By_Campaign: 'v0/ui/b2b/machadalo-client-status-list/?campaign_id=',
  SendEmail_By_Campaign: 'v0/ui/b2b/email-leads-summary/',
  Update_Client_Status: 'v0/ui/b2b/update-machadalo-client-status/',
  Get_Comment_List: 'v0/ui/b2b/basic-client-comment/',
  Accept_Decline_Leads: 'v0/ui/b2b/update-client-decision-status/',
  Upload_Comments_File: 'v0/ui/b2b/upload-lead-comments/',
  Get_Leads_By_Supplier: 'v0/ui/b2b/supplier-leads-decision-pending/?supplier_id=',

  // Campaign
  Get_Invoice_Proposals: 'v0/ui/website/proposal/invoice_proposals/',
  Get_Organisations: 'v0/ui/website/organisation/get_organisations_for_assignment/',
  Get_User_Minimal_List: 'v0/ui/website/get-users-minimal-list/',

  // Booking Plan
  Get_Header_Data: '/v0/ui/getHeaderData',
};
