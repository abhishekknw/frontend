import React from 'react';
import Select from 'react-select';
import './selectdropdown.css';

export default function SelectDropdown(props) {
  const { optionsData, selectedValue, placeholder, label, id, handleSelect, rowData, className } =
    props;
  return (
    <div>
      <Select
        className={`machadalo-select-box ${className}`}
        label={label}
        id={id}
        placeholder={placeholder}
        options={optionsData}
        value={optionsData.filter((obj) => obj.value === selectedValue)}
        onChange={(e) => {
          handleSelect(e, rowData);
        }}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? '' : '',
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'rgb(178, 212, 255)',
            primary: '#3e59e3',
          },
        })}
      />
    </div>
  );
}

// rowData props use for table 
{
  /* <SelectDropdown
optionsData={supplierTypeCode}
selectedValue={
  supplierTypeCode.find((item) => item.value === filters.supplier_type).value
}
placeholder="Supplier Type"
label="Supplier Type"
id="supplier_type"
handleSelect={handleSupplier}
/> */
}