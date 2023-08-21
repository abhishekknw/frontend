import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import SelectDropdown from '../../common/SelectDropdown/SelectDropdown';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
import SearchBox from '../../common/search/SearchBox';
import SupplierSearchList from './SupplierSearchList';
import { supplierSearchListAtom } from '../../_states';
import { useResetRecoilState } from 'recoil';
export default function AddSupplierModal(props) {
  const { campaign } = props;
  const BookinApi = BookinPlanActions();
  const resetSupplierList = useResetRecoilState(supplierSearchListAtom);
  const [filtersCheckbox, setFiltersCheckbox] = useState([
    { label: 'Poster(PO)', value: 'PO', checked: false },
    { label: 'Standee(ST)', value: 'ST', checked: false },
    { label: 'Stall(SL)', value: 'SL', checked: false },
    { label: 'Flyer(FL)', value: 'FL', checked: false },
    { label: 'Banner(BA)', value: 'BA', checked: false },
    { label: 'Gateway Arch', value: 'GA', checked: false },
    { label: 'SunBoard(SB)', value: 'SB', checked: false },
  ]);
  const [supplierNames, setSupplierNames] = useState([]);
  const [centreList, setCentreList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [subAreaList, setSubAreaList] = useState([]);
  const [supplierFilters, setSupplierFilters] = useState({
    supplier_type_code: '',
    supplier_center: '',
    supplier_center_id: '',
    supplier_area: '',
    supplier_area_id: '',
    supplier_area_subarea: '',
    supplier_sub_area_code: '',
    search: '',
    proposal_id: campaign?.proposal_id,
  });
  const handleSelectCentre = async (event) => {
    setSupplierFilters({
      ...supplierFilters,
      supplier_center_id: event?.value,
      supplier_center: event?.label,
      supplier_area: '',
      supplier_area_id: '',
      supplier_area_subarea: '',
      supplier_sub_area_code: '',
      search: '',
    });
    let response = await BookinApi.getAreaBycity(event?.label);
    let areaList = response?.map((item) => ({
      ...item,
      value: item?.id,
    }));
    setAreaList(areaList);
    resetSupplierList();
  };

  const handleSelectArea = async (event) => {
    setSupplierFilters({
      ...supplierFilters,
      supplier_area_id: event?.value,
      supplier_area: event?.label,
      supplier_area_subarea: '',
      supplier_sub_area_code: '',
    });
    let response = await BookinApi.getSubAreaByArea(event?.value);
    let newList = response?.map((item) => ({
      ...item,
      label: item?.subarea_name,
      value: item?.id,
    }));
    setSubAreaList(newList);
  };

  const handleSearch = async (event) => {
    let data = { ...supplierFilters, search: event };
    let response = await BookinApi.SupplierSearch(data);
    console.log(response, 'responseresponseresponseresponse');
    setSupplierFilters(data);
  };

  useEffect(() => {
    if (campaign?.centerSuppliers) {
      if (
        campaign.type_of_end_customer_formatted_name == 'b_to_b_r_g' ||
        campaign.type_of_end_customer_formatted_name == 'b_to_b_l_d'
      ) {
        setSupplierNames([
          { label: 'Residential Society', value: 'RS' },
          { label: 'Educational Institute', value: 'EI' },
          { label: 'Corporates', value: 'CO' },
          { label: 'Hospital', value: 'HL' },
        ]);
      }
    }
    if (campaign?.centerSuppliers?.length == 0) {
      setSupplierNames([{ label: 'ALL', value: 'ALL' }]);
    }
    let centreList = campaign?.centerData?.map((item) => ({
      ...item,
      label: item?.city,
      value: item?.id,
    }));
    setCentreList(centreList);
  }, [1]);
  return (
    <>
      <div className="text-end">
        <span>
          <Button className="btn me-3 btn-warning" variant="warning">
            Search and Finalize
          </Button>
        </span>
        <span>
          <Button className="btn btn-primary">Finalize List</Button>
        </span>
      </div>
      <div className="filterbx">
        <h4>Select Filters</h4>
        <Form>
          <div className="mb-3 b-form-maindiv">
            {filtersCheckbox.map((item, index) => {
              return (
                <Form.Check type="checkbox" id={`filters${item?.label}`} key={index}>
                  <Form.Check.Input type="checkbox" isValid />
                  <Form.Check.Label>{item?.label}</Form.Check.Label>
                </Form.Check>
              );
            })}
          </div>
        </Form>
        <div className="filter-selectdiv">
          <SelectDropdown
            optionsData={supplierNames}
            selectedValue={supplierFilters?.supplier_type_code}
            placeholder="Select Supplier"
            label="Select Supplier"
            id="SelectSupplier"
            handleSelect={(e) => {
              setSupplierFilters({
                ...supplierFilters,
                supplier_type_code: e?.value,
                supplier_center: '',
                supplier_center_id: '',
                supplier_area: '',
                supplier_area_id: '',
                supplier_area_subarea: '',
                supplier_sub_area_code: '',
                search: '',
              });
            }}
          />
          <SelectDropdown
            optionsData={centreList}
            selectedValue={supplierFilters?.supplier_center_id}
            placeholder="Select Center"
            label="Select Center"
            id="SelectCenter"
            handleSelect={(e) => {
              handleSelectCentre(e);
            }}
          />
          <SelectDropdown
            optionsData={areaList}
            selectedValue={supplierFilters?.supplier_area_id}
            placeholder="Select Area"
            label="Select Area"
            id="SelectArea"
            handleSelect={(e) => {
              handleSelectArea(e);
            }}
          />
          <SelectDropdown
            optionsData={subAreaList}
            selectedValue={supplierFilters?.supplier_sub_area_code}
            placeholder="Select Sub Area"
            label="Select Sub Area"
            id="SelectSubArea"
            handleSelect={(e) => {
              setSupplierFilters({
                ...supplierFilters,
                supplier_sub_area_code: e?.value,
                supplier_area_subarea: e?.label,
              });
            }}
          />
        </div>
        <Button
          className="btn btn-primary mb-2 mt-2"
          onClick={(e) => {
            BookinApi.SupplierSearch(supplierFilters);
          }}
        >
          Search
        </Button>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <SearchBox onSearch={handleSearch} />
        </Form.Group>
      </div>
      <div>
        <SupplierSearchList />
      </div>
    </>
  );
}
