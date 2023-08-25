import React from 'react';
import { Link } from 'react-router-dom';

const getRequirementHeader = () => {
      return [
            {
                  title: '#',
                  accessKey: 'index',
                  action: function (row, index) {
                        return index + 1;
                  },
            },
            {
                  title: 'LEAD DATE',
                  accessKey: 'index',
                  action: function (row, index) {
                        return index + 1;
                  },
            },
            {
                  title: 'LEAD ID',
                  accessKey: 'index',
                  action: function (row, index) {
                        return index + 1;
                  },
            },
            {
                  title: 'VERIFIED',
                  accessKey: 'index',
                  action: function (row, index) {
                        return index + 1;
                  },
            },
            {
                  title: 'VERIFIED BY',
                  accessKey: 'index',
                  action: function (row, index) {
                        return index + 1;
                  },
            },
      ]
}

export default getRequirementHeader;
