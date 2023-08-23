import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useFetchWrapper } from '../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from './api.constants';
import { getSupplierTypeName } from './common.utils';
import { DASHBOARD_SUPPLIER } from '../constants/routes.constants';

export default function CreateSupplier() {
  const { type } = useParams();
  const fetchWrapper = useFetchWrapper();
  const history = useHistory();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [selectedSubArea, setSelectedSubArea] = useState();
  const [name, setName] = useState();
  const [areas, setAreas] = useState([]);
  const [subAreas, setSubAreas] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [areaError, setAreaError] = useState(false);
  const [subAreaError, setSubAreaError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const getCities = () => {
    fetchWrapper.get(ANG_APIS.GET_CITIES).then((res) => {
      setCities(res.cities);
    });
  };

  const getAreas = (id) => {
    fetchWrapper.get(ANG_APIS.GET_AREA + id + '/?type=areas').then((res) => {
      setAreas(res);
    });
  };

  const getSubAreas = (id) => {
    fetchWrapper.get(ANG_APIS.GET_AREA + id + '/?type=sub_areas').then((res) => {
      setSubAreas(res);
    });
  };

  useEffect(() => {
    getCities();
  }, []);

  const handleSelectCity = (e) => {
    setSelectedCity(e.target.value);
    getAreas(e.target.value);
  };

  const handleSelectArea = (e) => {
    setSelectedArea(e.target.value);
    getSubAreas(e.target.value);
  };

  const handleSelectSubArea = (e) => {
    setSelectedSubArea(e.target.value);
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous errors
    setCityError(false);
    setAreaError(false);
    setSubAreaError(false);
    setNameError(false);

    let hasErrors = false;
    if (!selectedCity) {
      setCityError(true);
      hasErrors = true;
    }
    if (!selectedArea) {
      setAreaError(true);
      hasErrors = true;
    }
    if (!selectedSubArea) {
      setSubAreaError(true);
      hasErrors = true;
    }
    if (!name) {
      setNameError(true);
      hasErrors = true;
    }

    if (!hasErrors) {
      let body = {
        area_id: selectedArea,
        city_id: selectedCity,
        subarea_id: selectedSubArea,
        supplier_name: name,
        supplier_type: type,
        supplier_type_name: getSupplierTypeName(type),
      };

      fetchWrapper
        .post(ANG_APIS.CREATE_SUPPLIER, body)
        .then((res) => {
          history.push(DASHBOARD_SUPPLIER);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <h2 class="heading">Supplier Initial Details ({getSupplierTypeName(type)})</h2>
      <button type="button" class="smallBtn backbtn" onClick={() => history.goBack()}>
        Back to Dashboard
      </button>
      <div class="createSection">
        <form name="form" class="" role="form" onSubmit={handleSubmit}>
          <label>City</label>
          <select name="city" class="field" onChange={handleSelectCity}>
            <option value="">Select City</option>
            {cities.length > 0 &&
              cities.map((city, key) => {
                return (
                  <option value={city?.id} key={key}>
                    {city?.city_name}
                  </option>
                );
              })}
          </select>
          <span class="error">{cityError && 'Select a City'}</span>
          <label>Area</label>
          <select name="areas" class="field" onChange={handleSelectArea}>
            <option value="">Select Area</option>
            {areas.length > 0 &&
              areas.map((area, key) => {
                return (
                  <option value={area?.id} key={key}>
                    {area?.label}
                  </option>
                );
              })}
          </select>
          <span class="error">{areaError && 'Select an Area'}</span>
          <label>Sub Area</label>
          <select name="subareas" class="field" onChange={handleSelectSubArea}>
            <option value="">Select Sub-Area</option>
            {subAreas.length > 0 &&
              subAreas.map((area, key) => {
                return (
                  <option value={area?.id} key={key}>
                    {area?.subarea_name}
                  </option>
                );
              })}
          </select>
          <span class="error">{subAreaError && 'Select a Sub-Area'}</span>
          <label>Supplier Name</label>
          <input
            type="text"
            name="supplier_name"
            class="field"
            placeholder="Supplier Name"
            onChange={handleInputChange}
          />
          <span class="error">{nameError && 'Enter a Supplier Name'}</span>

          <button
            type="submit"
            class="submit-btn"
            disabled={!selectedArea || !selectedCity || !selectedSubArea || !name || disabled}
          >
            Create & Continue{' '}
          </button>
        </form>
      </div>
    </>
  );
}
