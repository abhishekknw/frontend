import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import SelectDropdown from '../../../components/Shared/SelectDropdown';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
import SearchBox from '../../common/search/SearchBox';
import SupplierSearchList from './SupplierSearchList';
import {
  CampaignInventoryAtom,
  showFinalizedListAtom,
  supplierSearchListAtom,
  filtersCheckBoxAtom,
} from '../../_states';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { BookingFunctions } from './BookingFunctions';
export default function AddSupplierModal() {
  const CampaignInventory = useRecoilValue(CampaignInventoryAtom);
  const BookinApi = BookinPlanActions();
  const UpdateData = BookingFunctions();
  const resetSupplierList = useResetRecoilState(supplierSearchListAtom);
  const [showFinalizedList, setShowFinalizedList] = useRecoilState(showFinalizedListAtom);
  const filtersCheckbox = useRecoilValue(filtersCheckBoxAtom);
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
    proposal_id: CampaignInventory?.campaign?.proposal_id,
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
    setSupplierFilters(data);
  };

  useEffect(() => {
    if (CampaignInventory?.campaign?.centerSuppliers) {
      if (
        CampaignInventory?.campaign.type_of_end_customer_formatted_name == 'b_to_b_r_g' ||
        CampaignInventory?.campaign.type_of_end_customer_formatted_name == 'b_to_b_l_d'
      ) {
        setSupplierNames([
          { label: 'Residential Society', value: 'RS' },
          { label: 'Educational Institute', value: 'EI' },
          { label: 'Corporates', value: 'CO' },
          { label: 'Hospital', value: 'HL' },
        ]);
      }
    }
    if (CampaignInventory?.campaign?.centerSuppliers?.length == 0) {
      setSupplierNames([{ label: 'ALL', value: 'ALL' }]);
    }
    let centreList = CampaignInventory?.campaign?.centerData?.map((item) => ({
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
          <Button
            className="btn me-3 btn-warning"
            variant="warning"
            disabled={showFinalizedList}
            onClick={(e) => {
              setShowFinalizedList(true);
            }}
          >
            Search and Finalize
          </Button>
        </span>
        <span>
          <Button
            className="btn btn-primary"
            disabled={!showFinalizedList}
            onClick={(e) => {
              setShowFinalizedList(false);
            }}
          >
            Finalize List
          </Button>
        </span>
      </div>
      <div className="filterbx">
        <h4>Select Filters</h4>
        <Form>
          <div className="mb-3 b-form-maindiv">
            {filtersCheckbox.map((item, index) => {
              return (
                <Form.Check type="checkbox" id={`filters${item?.label}`} key={index}>
                  <Form.Check.Input
                    type="checkbox"
                    isValid
                    checked={item.checked}
                    onChange={(e) => {
                      UpdateData.handleCheckFilters(e, item);
                    }}
                  />
                  <Form.Check.Label>{item?.label}</Form.Check.Label>
                </Form.Check>
              );
            })}
          </div>
        </Form>
        {showFinalizedList && (
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
        )}
        {showFinalizedList && (
          <div>
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
        )}
      </div>
      <div>
        <SupplierSearchList />
      </div>
    </>
  );
}
