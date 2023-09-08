export const Labels = {
  Success: 'success',
  Error: 'error',
  Login_Success: 'Login successfully',
  Upload_Success: 'Uploaded successfully',
  Email_Success: 'Email Sent Successfully',
  Save_Success: 'Save Successfully',
  Delete_Success: 'Delete Successfully',
};
export const BaseImageUrl = 'https://androidtokyo.s3.amazonaws.com/';

export const ANG_APIS = {
  GETSTATE: 'v0/ui/state/',
  GET_SUPPLIER_META: 'v0/ui/suppliers-meta/',
  GET_LIST: 'v0/ui/supplier-generic/?supplier_type_code=',
  GET_LIST_GENERIC: 'v0/ui/supplier-generic/',
  GET_CITIES: 'v0/ui/create_supplier/load_initial_data/',
  GET_AREA: 'v0/ui/locations/',
  CREATE_SUPPLIER: 'v0/ui/supplier/generate_id/',
  GET_IMAGE_MAPPING: 'v0/ui/image-mapping/?supplier_id=',
  GET_PRICING: 'v0/ui/society/',
  UPDATE_PRICING: 'v0/ui/society/',
  GET_CORPORATE_AMMENITY: 'v0/ui/website/supplier-amenity/?supplier_id=',

  GET_SOCIETY_DETAILS: 'v0/ui/society/',
  GET_SUPPLIER_RELATIONSHIP:
    'v0/ui/website/society-supplier-relationship/?supplier_type=RE&society_id=GCBLPDLCHTB&type=INPREMISES',
  GET_SOCIETY_LIST: 'v0/ui/society/list/',
  GET_ORGANIZATIONS: 'v0/ui/website/organisation/?category=SUPPLIER_AGENCY',
  GET_CORPORATE_LIST: 'supplier-generic/?supplier_type_code=CP&page=',
  GET_INVENTORY_SUMMARY: 'v0/ui/society/GCBLPDLCHTB/inventory_summary/?supplierTypeCode=RS',
  GET_BASIC_PRICING: `/basic_pricing/?supplierTypeCode=`,
  GET_FLAT_DETAILS: 'v0/ui/society/GCBLPDLCHTB/flat/',
  GET_TOWER: 'v0/ui/society/GCBLPDLCHTB/tower/?supplierTypeCode=RS',
  GET_POSTER: 'v0/ui/society/GCBLPDLCHTB/posters/?supplierTypeCode=RS',
  GET_FLIER: 'v0/ui/society/GCBLPDLCHTB/fliers/?supplierTypeCode=RS',
  GET_STANDEES_BANNER: 'v0/ui/society/GCBLPDLCHTB/standee_banners/?supplierTypeCode=RS',
  GET_STALLS: 'v0/ui/society/GCBLPDLCHTB/stalls/?supplierTypeCode=RS',
  GET_OTHER: 'v0/ui/society/GCBLPDLCHTB/other_inventory/',
  GET_EVENT: 'v0/ui/event/?supplier_id=GCBLPDLCHTB&supplier_type_code=RS',
  GET_AMMENITY: 'v0/ui/website/amenity-list/?type=RS',
};
