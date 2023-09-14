// import React from 'react';
// import CampaignBadge from '../../CampaignBadge';
// import config from '../../../config';
// const getEntityList = (entityDetails) => {
//   let isSociety = false;
//   let unit_count = 'Unit Count';
//   let type = 'Type';
//   if (entityDetails && entityDetails.length > 0) {
//     isSociety = entityDetails[0].isSociety;
//     if (isSociety) {
//       unit_count = 'Flat Count';
//       type = 'Society Type';
//     }
//   }

//   return [
//     {
//       dataField: 'supplier_id',
//       text: 'Supplier Id',
//       sort: true,
//       formatter: (cell, row) => {
//         let { supplier_id } = row;
//         return supplier_id || '-';
//       },
//     },
//     {
//       dataField: 'name',
//       text: 'Name',
//       width: '250px',
//       sort: true,
//       formatter: (cell, row) => {
//         let { supplier_id, name, society_name, supplierTypeCode } = row;
//         if (society_name) name = society_name;
//         let supplier_type = 'society';
//         switch (supplierTypeCode) {
//           case 'CP':
//             supplier_type = 'corporate';
//             break;
//           case 'RE':
//             supplier_type = 'retailshop';
//             break;
//           case 'GY':
//             supplier_type = 'gym';
//             break;
//           case 'EI':
//             supplier_type = 'educational';
//             break;
//           case 'BS':
//             supplier_type = 'busshelter';
//             break;
//           default:
//             supplier_type = 'society';
//         }
//         const supplierFormUrl = `${config.mainSiteUrl}/#/${supplier_type}/${supplier_id}`;
//         // const supplierFormUrl = `https://forms.machadalo.com/#/${supplier_type}/${supplier_id}`;
//         return (
//           <a href={supplierFormUrl} style={{ color: '#e8578d' }} target="_blank">
//             {name}
//           </a>
//         );
//       },
//     },
//     {
//       dataField: 'flat_count',
//       text: unit_count,
//       sort: true,
//       formatter: (cell, row) => {
//         let { flat_count } = row;
//         if (flat_count) flat_count = flat_count;
//         return flat_count || '-';
//       },
//     },
//     {
//       dataField: 'society_type',
//       text: type,
//       sort: true,
//       formatter: (cell, row) => {
//         let { society_type } = row;
//         if (society_type) society_type = society_type;
//         return society_type || '-';
//       },
//     },
//     {
//       dataField: 'area',
//       text: 'Area',
//       sort: true,
//       formatter: (cell, row) => {
//         let { area, society_locality } = row;
//         if (society_locality) area = society_locality;
//         return area || '-';
//       },
//     },
//     {
//       dataField: 'subarea',
//       text: 'Sub Area',
//       sort: true,
//       formatter: (cell, row) => {
//         let { subarea, society_subarea } = row;
//         if (society_subarea) subarea = society_subarea;
//         return subarea || '-';
//       },
//     },
//     {
//       dataField: 'city',
//       text: 'City',
//       sort: true,
//       formatter: (cell, row) => {
//         let { city, society_city } = row;
//         if (society_city) city = society_city;
//         return city || '-';
//       },
//     },
//     {
//       dataField: 'address',
//       text: 'Address',
//       sort: true,
//       width: '350px',
//       formatter: (cell, row) => {
//         let { address1, society_address1 } = row;
//         let address = address1;
//         if (society_address1) address = society_address1;
//         return address || '-';
//       },
//     },
//     {
//       dataField: 'contact_name',
//       text: 'Contact Name',
//       sort: true,
//       formatter: (cell, row) => {
//         const { contact_name } = row;
//         return contact_name || '-';
//       },
//     },
//     {
//       dataField: 'contact_number',
//       text: 'Contact Number',
//       sort: true,
//       formatter: (cell, row) => {
//         const { contact_number } = row;
//         return contact_number || '-';
//       },
//     },
//     {
//       dataField: 'contact_type',
//       text: 'Designation',
//       sort: true,
//       formatter: (cell, row) => {
//         const { contact_type } = row;
//         const type = contact_type ? contact_type.toLowerCase().replace(/ /g, '_') : contact_type;
//         let variant = 'success';
//         switch (type) {
//           case 'chairman':
//             variant = 'success';
//             break;
//           case 'secretary':
//             variant = 'primary';
//             break;
//           case 'manager':
//             variant = 'warning';
//             break;
//           case 'treasurer':
//             variant = 'info';
//             break;
//           case 'committe_member':
//             variant = 'danger';
//             break;
//           default:
//             variant = 'default';
//             break;
//         }
//         return <CampaignBadge variant={variant}>{type}</CampaignBadge>;
//       },
//     },
//   ];
// };

// export default getEntityList;

import React from 'react';
import CampaignBadge from '../../CampaignBadge';
import config from '../../../config';
const getEntityList = (entityDetails) => {
  let isSociety = false;
  let unit_count = 'Unit Count';
  let type = 'Type';
  if (entityDetails && entityDetails.length > 0) {
    isSociety = entityDetails[0].isSociety;
    if (isSociety) {
      unit_count = 'Flat Count';
      type = 'Society Type';
    }
  }

  return [
    {
      dataField: 'supplier_id',
      text: 'Supplier Id',
      sort: true,
      // style: { width: '10%' },
      formatter: (cell, row) => {
        let { supplier_id } = row;
        return supplier_id || '-';
      },
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      // style: { width: '10%' },
      formatter: (cell, row) => {
        let { supplier_id, name, society_name, supplierTypeCode } = row;
        if (society_name) name = society_name;
        let supplier_type = 'society';
        switch (supplierTypeCode) {
          case 'CP':
            supplier_type = 'corporate';
            break;
          case 'RE':
            supplier_type = 'retailshop';
            break;
          case 'GY':
            supplier_type = 'gym';
            break;
          case 'EI':
            supplier_type = 'educational';
            break;
          case 'BS':
            supplier_type = 'busshelter';
            break;
          default:
            supplier_type = 'society';
        }
        const supplierFormUrl = `${config.mainSiteUrl}/#/${supplier_type}/${supplier_id}`;
        return (
          <a href={supplierFormUrl} style={{ color: '#e8578d' }} target="_blank">
            {name}
          </a>
        );
      },
    },
    {
      dataField: 'flat_count',
      text: unit_count,
      sort: true,
      formatter: (cell, row) => {
        let { flat_count } = row;
        if (flat_count) flat_count = flat_count;
        return flat_count || '-';
      },
    },
    {
      dataField: 'society_type',
      text: type,
      sort: true,
      formatter: (cell, row) => {
        let { society_type } = row;
        if (society_type) society_type = society_type;
        return society_type || '-';
      },
    },
    {
      dataField: 'area',
      text: 'Area',
      sort: true,
      formatter: (cell, row) => {
        let { area, society_locality } = row;
        if (society_locality) area = society_locality;
        return area || '-';
      },
    },
    {
      dataField: 'subarea',
      text: 'Sub Area',
      sort: true,
      formatter: (cell, row) => {
        let { subarea, society_subarea } = row;
        if (society_subarea) subarea = society_subarea;
        return subarea || '-';
      },
    },
    {
      dataField: 'city',
      text: 'City',
      sort: true,
      formatter: (cell, row) => {
        let { city, society_city } = row;
        if (society_city) city = society_city;
        return city || '-';
      },
    },
    {
      dataField: 'address',
      text: 'Address',
      sort: true,
      formatter: (cell, row) => {
        let { address1, society_address1 } = row;
        let address = address1;
        if (society_address1) address = society_address1;
        return address || '-';
      },
    },
    {
      dataField: 'contact_name',
      text: 'Contact Name',
      sort: true,
      formatter: (cell, row) => {
        const { contact_name } = row;
        return contact_name || '-';
      },
    },
    {
      dataField: 'contact_number',
      text: 'Contact Number',
      sort: true,
      formatter: (cell, row) => {
        const { contact_number } = row;
        return contact_number || '-';
      },
    },
    {
      dataField: 'contact_type',
      text: 'Designation',
      sort: true,
      formatter: (cell, row) => {
        const { contact_type } = row;
        const type = contact_type ? contact_type.toLowerCase().replace(/ /g, '_') : contact_type;
        let variant = 'success';
        switch (type) {
          case 'chairman':
            variant = 'success';
            break;
          case 'secretary':
            variant = 'primary';
            break;
          case 'manager':
            variant = 'warning';
            break;
          case 'treasurer':
            variant = 'info';
            break;
          case 'committe_member':
            variant = 'danger';
            break;
          default:
            variant = 'default';
            break;
        }
        return <CampaignBadge variant={variant}>{type}</CampaignBadge>;
      },
    },
  ];
};

export default getEntityList;

