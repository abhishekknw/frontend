import React from 'react';

export default function CreateSupplier() {
  const name = 'Residential';
  return (
    <>
      <h2 class="heading">Supplier Initial Details {name}</h2>
      <button type="button" class="smallBtn backbtn">
        Back to Dashboard
      </button>
      <div class="createSection">
        <form name="form" class="" role="form">
          <label>City</label>
          <select name="city" class="field">
            <option value="">Select City</option>
            <option required></option>
          </select>
          <span class="error">Select a City</span>
          <label>Area</label>
          <select name="areas" class="field">
            <option value="">Select Area</option>
            <option required></option>
          </select>
          <span class="error">Select an Area </span>
          <label>Sub Area</label>
          <select name="subareas" class="field">
            <option value="">Select Sub-Area</option>
            <option required></option>
          </select>
          <span class="error">Select a Sub-Area </span>
          <label>Supplier Name</label>
          <input type="text" name="supplier_name" class="field" placeholder="Supplier Name" />
          <span class="error">incorrect name</span>

          <button type="submit" class="submit-btn">
            Create & Continue{' '}
          </button>
        </form>
      </div>
    </>
  );
}
