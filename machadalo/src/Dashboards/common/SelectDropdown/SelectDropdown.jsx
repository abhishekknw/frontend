import React from 'react';
import Select from 'react-select';

export default function SelectDropdown(props) {
  const { optionsData, selectedValue, placeholder, label, id, handleSelect } = props;
  return (
    <div>
      <Select
        className=""
        label={label}
        id={id}
        placeholder={placeholder}
        options={optionsData}
        value={optionsData.filter((obj) => obj.value === selectedValue)}
        onChange={handleSelect}
      />
    </div>
  );
}
