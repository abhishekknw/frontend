import React from 'react';
import Select from 'react-select';
import './selectdropdown.css';

export default function SelectDropdown(props) {
  const { optionsData, selectedValue, placeholder, label, id, handleSelect, rowData, className } =
    props;
  return (
    <div>
      <Select
        className={className}
        label={label}
        id={id}
        placeholder={placeholder}
        options={optionsData}
        value={optionsData.filter((obj) => obj.value === selectedValue)}
        onChange={(e) => {
          handleSelect(e, rowData);
        }}
      />
    </div>
  );
}

// rowData props use for table 
