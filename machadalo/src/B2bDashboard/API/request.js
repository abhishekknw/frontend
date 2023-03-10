export const Apis = {
  // Lead Basic APis
  leadDecisionPending: 'v0/ui/b2b/lead-decision-panding',
  clientStatusList: 'v0/ui/b2b/machadalo-client-status-list',
  acceptDecline: 'v0/ui/b2b/update-client-decision-status',

  // Lead Details APIs
  currentCampaign: 'v0/ui/b2b/lead-distribution-campaign',
  campaignViewLeads: 'v0/ui/b2b/lead-form-headers',
  sendEmails: 'v0/ui/b2b/email-leads-summary',
  getCampaignCityList: 'v0/ui/b2b/city-list',
  getLeadDetailsData: 'v0/ui/b2b/lead-details',
  uploadComments: 'v0/ui/b2b/upload-lead-comments',

  templateList: 'v0/ui/template/?campaign_id=',
  updateTemplate: 'v0/ui/template',

  // Both lead Basic and Lead Detail APis
  updateClientStatus: 'v0/ui/b2b/update-machadalo-client-status',
  commentList: 'v0/ui/b2b/basic-client-comment',

  // New-Lead-Tab-APIs
  leadCountByDate: 'v0/ui/b2b/lead-count-by-date',
  leadCampaignData: 'v0/ui/b2b/lead-campaign-data',
  getSupplierByCampaign: 'v0/ui/b2b/supplier-by-campaign',
};
