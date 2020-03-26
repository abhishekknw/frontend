import React from 'react';
import { get } from 'lodash';
import CampaignBadge from '../../CampaignBadge';

const getEntityList = () => {
  return [
    {
      dataField: 'name',
      text: 'Name',
      width: '350px',
      sort: true,
      formatter: (cell, row) => {
        let { name, society_name } = row;
        if (society_name) name = society_name;
        return name;
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
        return address || '';
      },
    },
  ];
};

export default getEntityList;
