import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import SelectDropdown from '../../common/SelectDropdown/SelectDropdown';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
export default function AddSupplierModal(props) {
  const { campaign } = props;
  const BookinApi = BookinPlanActions();
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
    proposal_id: '',
  });
  console.log(campaign, '11111111111111111111111');

  // else {
  // for (let i in campaign?.centerSuppliers) {
  //   if (campaign?.centerSuppliers[i].supplier_type_code == 'RS') {
  //     $scope.supplier_names.push({ name: 'Residential Society', code: 'RS' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'CP') {
  //     $scope.supplier_names.push({ name: 'Corporate Parks', code: 'CP' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'BS') {
  //     $scope.supplier_names.push({ name: 'Bus Shelter', code: 'BS' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'GY') {
  //     $scope.supplier_names.push({ name: 'Gym', code: 'GY' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'SA') {
  //     $scope.supplier_names.push({ name: 'Saloon', code: 'SA' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'RE') {
  //     $scope.supplier_names.push({ name: 'Retail Store', code: 'RE' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'BU') {
  //     $scope.supplier_names.push({ name: 'Bus', code: 'BU' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'CO') {
  //     $scope.supplier_names.push({ name: 'Corporates', code: 'CO' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'EI') {
  //     $scope.supplier_names.push({ name: 'Educational Institute', code: 'EI' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'GN') {
  //     $scope.supplier_names.push({ name: 'Gantry', code: 'GN' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'HL') {
  //     $scope.supplier_names.push({ name: 'Hospital', code: 'HL' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'HO') {
  //     $scope.supplier_names.push({ name: 'Hording', code: 'HO' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'IR') {
  //     $scope.supplier_names.push({ name: 'In-shop Retail', code: 'IR' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'RC') {
  //     $scope.supplier_names.push({ name: 'Radio Channel', code: 'RC' });
  //   } else if (campaign?.centerSuppliers[i].supplier_type_code == 'TV') {
  //     $scope.supplier_names.push({ name: 'TV Channel', code: 'TV' });
  //   }
  // }
  // }

  // if (centerSuppliers.length == 0) {
  //   $scope.supplier_names.push({ name: 'ALL', code: 'ALL' });
  // }
  const handleSelectCentre = async (event) => {
    setSupplierFilters({
      ...supplierFilters,
      supplier_center_id: event?.value,
    });
    let response = await BookinApi.getAreaBycity(event?.label);
    let areaList = response?.map((item) => ({
      ...item,
      value: item?.id,
    }));
    setAreaList(areaList);
  };

  const handleSelectArea = async (event) => {
    setSupplierFilters({
      ...supplierFilters,
      supplier_area_id: event?.value,
    });
    let response = await BookinApi.getSubAreaByArea(event?.value);
    let newList = response?.map((item) => ({
      ...item,
      label: item?.subarea_name,
      value: item?.id,
    }));
    setSubAreaList(newList);
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
              setSupplierFilters({ ...supplierFilters, supplier_sub_area_code: e?.value });
            }}
          />
        </div>

        <button className="btn btn-primary mb-2 mt-2">Search</button>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" placeholder="Enter Text" rows={3} />
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
