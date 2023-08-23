const getTypeCode = (type) => {
  switch (type) {
    case 'corporate':
      return 'CP';
    case 'gym':
      return 'GY';
    case 'salon':
      return 'SA';
    case 'busshelter':
      return 'BS';
    case 'retailshop':
      return 'RE';
    case 'education-institute':
      return 'EI';
    case 'hording':
      return 'HO';
    case 'bus':
      return 'BU';
    case 'gantry':
      return 'GN';
    case 'radio-channel':
      return 'RC';
    case 'tv-channel':
      return 'TV';
    case 'corporates':
      return 'CO';
    case 'hospital':
      return 'HL';
    default:
      return '';
  }
};

const getSupplierType = (type) => {
  switch (type) {
    case 'corporate':
      return 'Corporate';
    case 'gym':
      return 'Gym';
    case 'salon':
      return 'Salon';
    case 'busshelter':
      return 'Bus Shelter';
    case 'retailshop':
      return 'Retail Shop';
    case 'education-institute':
      return 'Education Institute';
    case 'hording':
      return 'Hording';
    case 'bus':
      return 'Bus';
    case 'gantry':
      return 'Gantry';
    case 'radio-channel':
      return 'Radio Channel';
    case 'tv-channel':
      return 'Tv Channel';
    case 'corporates':
      return 'Corporates';
    case 'hospital':
      return 'Hospital';
    default:
      return '';
  }
};

const getSupplierTypeName = (type) => {
  switch (type) {
    case 'RS':
      return 'Residential';
    case 'CP':
      return 'Corporate Parks';
    case 'GY':
      return 'Gym';
    case 'SA':
      return 'Salon';
    case 'BS':
      return 'Bus Shelter';
    case 'RE':
      return 'Retail Shop';
    case 'EI':
      return 'Education Institute';
    case 'HO':
      return 'Hording';
    case 'BU':
      return 'Bus';
    case 'GN':
      return 'Gantry';
    case 'RC':
      return 'Radio Channel';
    case 'TV':
      return 'Tv Channel';
    case 'CO':
      return 'Corporates';
    case 'HL':
      return 'Hospital';
    default:
      return '';
  }
};

export { getTypeCode, getSupplierType, getSupplierTypeName };
