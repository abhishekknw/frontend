angular
  .module('catalogueApp').
  constant('constants',{
    //amazon keys
    // base_url : 'http://coreapi-test.3j6wudg4pu.ap-southeast-1.elasticbeanstalk.com/',
    base_url: Config.APIBaseUrl,
    url_base : 'v0/ui/website/',
    url_base_leads : 'v0/ui/leads/',
    AWSAccessKeyId : 'AKIAI6PVCXJEAXV6UHUQ',
    policy : "eyJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsgCiAgICB7ImJ1Y2tldCI6ICJtZGltYWdlcyJ9LCAKICAgIFsic3RhcnRzLXdpdGgiLCAiJGtleSIsICIiXSwKICAgIHsiYWNsIjogInB1YmxpYy1yZWFkIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiIl0sCiAgICBbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwgMCwgNTI0Mjg4MDAwXQogIF0KfQoK",
    acl : 'public-read',
    signature : "GsF32EZ1IFvr2ZDH3ww+tGzFvmw=",
    content_type : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //amazon server
    aws_bucket_url : 'https://mdimages.s3.amazonaws.com/',
    aws_campaign_images_url : 'https://androidtokyo.s3.amazonaws.com/',
    account_email_id : 'tejas.pawar@machaddalo.com',
    //general
    name : '',
    success : 'success',
    error : 'error',
    warning : 'warning',
    errorMsg : 'Error Occured',
    server_connection_error : 'Server is down, Please Try again',
    emptyResponse : 'No results Found',
    btn_success : 'btn-success',
    warn_user_msg : 'Are You Sure?',
    save_success : 'Saved successfully',
    assign_success : 'Assigned successfully',
    delete_success : 'Deleted Successfully',
    save_error : 'Some error occured, Data not saved',
    shortlisted : 'Shortlisted',
    removed : 'Removed',
    buffered : 'Buffered',
    finalized: 'Finalized',
    statusCode_shortlisted : 'S',
    statusCode_buffered : 'B',
    statusCode_removed : 'R',
    statusCodeFinalized: 'F',
    showSystemError: true,
    create_success : 'Created Successfully',
    update_success : 'Updated Successfully',
    standard_organisation : 'MACHADALO',
    add_data_success : 'Added Successfully',
    update_leads_data_success : 'Updated Leads Successfully',
    captcha_error : 'Please resolve the captcha and submit!',
    login_error : 'Username or Password is Incorrect',
    email_success : 'Email sent Successfully',
    image_empty : 'No Images Found',
    image_success : 'Image Uploaded Successfully',
    proposal_update_success : "Proposal Updated Successfully",
    //createproposal
    geo_location_error : 'Address or Pincode Incorrect, Please Provide Correct Information',
    center_warning : 'Do you want to create only one center ?',
    //mapview
    importfile_error : 'Please select correct file',
    save_success : 'Saved successfully',
    save_error : 'Some error occured, Data not saved',
    importfile_error : 'Some error occurred while importing file.',
    uploadfile_success : 'File Uploaded successfully',
    uploadfile_error  : 'Error occured, Please check your internet connection and Try again',
    request_proposal_success : 'Request for proposal is sent, Machadalo team will contact you soon',
    request_proposal_error : 'Error occured, Please check your internet connection or Valid Email Id is not provided',
    save_proposal_success : 'Your proposal is saved successfully',
    supplier_status_error : 'Sorry, There is some error in saving supplier status',
    amenity_error : 'Error in getting Amenities',
    client_email_error : 'Error occured while sending Email to Client',
    bdhead_email_error : 'Error occured while sending Email to BDHead',
    upload_error : 'error occured while uploading file',
    deletefile_error : 'Error occured, File not deleted',
    finalize : 'F',
    buffer : 'B',
    remove : 'R',
    supplierCode_all : 'All',
    RS:'Residential Society',
    CP:'Corporate',
    BS:'Bus Shelter',
    GY:'Gym',
    SA:'Saloon',
    RE:'Retail Store',
    All:'All',

    //auditReleasePlan
    positive_number_error : 'Enter Positive Number Only',
    //opsDashboard
    onhold_success : 'BD team has been notified',
    onhold_error : 'Error occured, Please check your internet connection',
    assign_user_success : 'The Proposal is converted to campaign and assigned to user',
    assign_user_error : 'Some error occured in asigning proposal to user',
    accept_proposal_error : 'Error occured while converting proposal to campaign',
    decline_proposal_error : 'Error occured while declining campaign, Please ensure that you are declining campaign which is not on hold',
    emptyProposalMsg : 'No Proposals Found',
    email_error : 'Error while sending Email, Try Again',
    sleepTime : '3000',
    //campaignList
    emptyCampaignList : 'No Campaigns Found',
    //releaseplan
    updateData_success : 'Data updated successfully',
    updateData_error : 'Error occured while saving data',
    already_exist : 'Supplier Already Present',
    upload_permission_box_image_url : '/upload_permission_box_image/',
    upload_receipt_url : '/upload_receipt_image/',
    booking_completion_status:"Can not be completed until booking status is not 'Confirmed Booking' or 'Meeting Converted' ",
    //auditReleasePlan
    inventory_date_success : 'Inventory Dates are saved successfully',
    inventory_date_error : 'Error occured while saving dates',
    //currentProposal or proposal summary
    invoice_confirm : 'Do You really want to confirm Invoice Details?',
    invoice_success : 'Your Invoice details are saved successfully',
    invoice_error : 'Error occured, Invoice details are not saved',
    //opsExecution
    reAssign_success : 'Reassign is Successful',
    reAssign_error : 'Error occured while reassigning, Please Try again',
    images_download_error : 'Download Failed, Retry later',
    no_image_error : 'There are no images available to download',
    upload_image_activity_url : 'upload-inventory-activity-image-amazon/',
    //createAccount
    account_success : 'Account Details saved successfully',
    account_error : 'Error occured in saving account details',
    //CreateCampaign
    business_success : 'Business Details saved successfully',
    business_error : 'Error occured in saving business details',
    campaign_manager : 'campaign_manager',
    proposalMaking : 'PM',
    proposalRequested : 'PR',
    proposalFinalized : 'PF',
    proposalConverted : 'PTC',
    proposalOnHold : 'POH',
    proposalDeclined : 'PNC',
    PTC : 'Converted',
    PR : 'Requested',
    PF : 'Finalized',
    POH : 'On-Hold',
    PNC : 'Declined',
    //manage user
    createUser_success : 'Successfully Created',
    create_group_success : 'Group Created Successfully',
    create_group_error : 'Error Occured in creating group',
    password_error : 'Must match to password',
    delete_confirm_user : 'Do you really want to delete this user?',
    delete_confirm : 'Yes! Delete it!',
    delete_confirm_group : 'Do you really want to delete this Group?',
    delete_profile : 'Do you really want to delete this Profile?',
    changePassword_success : 'Password changed Successfully',
    

    //guestPage
    location_error : 'Please enter accurate location',

    //permissions
    bd_manager : 'BD Manager',
    campaign_manager : 'Campaign Manager',

    //errorMsg
    show_system : true,
    show_general : true,

    //permissions error
    permission_error : 'You do not have sufficient permission to perform this action, Please contact Machadalo Admin',
    profile_error : 'You do not have profile attached, Please Contact Your Organisation Admin',
    forbidden_error_code : 403,
    forbidden_title : 'FORBIDDEN : 403',
    //roles
    role_assignment_error : 'Can not assign same Role to both parent and child',
    //DashBoard
    BK  : 'Booked',
    NBK : 'Not Booked',
    no_phase : 'Remaining',
    //proposalToCampaign
    proposal_to_campaign : 'Campaign Created Successfully',
    //dashboard
    inventories : {
      GA : 'GATEWAY ARCH',
      PO : 'POSTER',
      ST : 'STANDEE',
      SL : 'STALL',
      FL : 'FLYER'
    },

    supplierBookingStatus : {
      '' : 'Not Initiated',
      BK : 'Booked',
      PB : 'Phone Booked',
      VB : 'Visit Booked',
      SR : 'Rejected',
      SE : 'Email Required',
      DP : 'Decision Pending',
      VR : 'Visit Required',
      CR : 'Call Required',
      TB : 'Tentative Booking'

    },
    
    supplierTypeCode:[{name:'ALL', value:'all'},
    {name:'Residential Society', value:'RS'},
      {name:'Corporate', value:'CP'},
      {name:'Bus Shelter', value:'BS'},
      {name:'Gym', value:'GY'},
      {name:'Saloon', value:'SA'},
      {name:'Retail Store', value:'RE'},
      {name:'Mix', value:'mix'},
      ],

      supplierTypeCodePerformanceDetail:[
        {name:'Select Supplier Type', value:'all'},
      {name:'Residential Society', value:'RS'},
        {name:'Corporate', value:'CP'},
        {name:'Bus Shelter', value:'BS'},
        {name:'Gym', value:'GY'},
        {name:'Saloon', value:'SA'},
        {name:'Retail Store', value:'RE'},
        ],

    distanceLimit : 500,
    release : 'RELEASE',
    closure : 'CLOSURE',
    audit : 'AUDIT',
    colorKey1 : '#FAEF11',
    colorKey2 : '#6BCA56',
    colorKey3 : '#6098c7',
    colorKey4 : '#c3d5ee',
    booking_status : {
      'BK' : 'Booked',
      'NB' : 'Not Booked',
      'TB' : 'Tentative Booked',
      'PB' : 'Phone Booked',
      'VB' : 'Visit Booked',
      'VR' : 'Visit Required'
    },
    inventoryNames : [
      {name : 'POSTER'},
      {name : 'STANDEE'},
      {name : 'STALL'},
      {name : 'FLYER'},
      {name : 'GATEWAY ARCH'},
    ],
    comments_type : [
      'INTERNAL',
      'EXTERNAL'
    ],
    booking_related_comment : 'INTERNAL',
    execution_related_comment : 'EXTERNAL',
    no_comments_msg : 'No Comments Available',
    flatCountHeader:{'RS':'Flat Count','RE':'Footfall Count ','CP':'Employees Count','GY':'Footfall Count','BS':'Footfall Count','EI':'Students Count'},
    towerCountHeader:{'RS':'Flat Count','RE':'Weekday Footfall Count','CP':'Companies Count','GY':'Weekday Footfall Count','BS':'Weekday Footfall Count','EI':'Teachers Count'}

  });
