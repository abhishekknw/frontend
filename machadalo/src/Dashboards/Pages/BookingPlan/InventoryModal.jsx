import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import { InventoryList } from '../../_actions/testingJsonData';
import { BookinPlanActions } from '../../_actions';
import { InventoryListAtom } from '../../_states';
import { useRecoilValue } from 'recoil';
export default function InventoryModal(props) {
  // const inventoryData = InventoryList.data;
  const inventoryData = useRecoilValue(InventoryListAtom);
  const BookingApi = BookinPlanActions();
  const [inventory, setInventory] = useState([]);
  const [inventoryIds, setInventoryIds] = useState([]);
  const [selectedId, setSelected] = useState('first');
  const [inventoryById, setInventoryById] = useState([]);

  function filterInventoryData() {
    inventoryData?.map((item, index) => {
      let check = inventoryIds.includes(item?.inventory_type?.id);
      if (!check) {
        setInventoryIds([...inventoryIds, item?.inventory_type?.id]);
        setInventory([...inventory, item]);
      }
    });
  }

  function getInventoryIds(e) {
    let newList = [];
    inventoryData?.map((item, index) => {
      if (Number(item?.inventory_type?.id) === Number(e)) {
        newList.push(item);
      }
    });
    setInventoryById(newList);
  }
  const getInventoryList = async () => {
    await BookingApi.getInvetoryList(props?.data?.id);
  };

  useEffect(() => {
    getInventoryList();
  }, [props?.data?.id]);
  useEffect(() => {
    filterInventoryData();
  }, [inventoryData]);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={selectedId}>
      <Row>
        <Col xs={12} sm={4} md={4}>
          <Nav
            variant="pills"
            className="flex-column"
            onSelect={(e) => {
              getInventoryIds(e);
            }}
          >
            {inventory &&
              inventory.map((inventory, index) => {
                return (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={inventory?.inventory_type?.id}>
                      {inventory?.inventory_type?.adinventory_name}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
          </Nav>
        </Col>
        <Col xs={12} sm={8} md={8}>
          <Tab.Content>
            <Tab.Pane eventKey={selectedId}>
              <ListGroup>
                {inventoryById.map((item, index) => {
                  return <ListGroup.Item key={index}>{item?.inventory_id}</ListGroup.Item>;
                })}
              </ListGroup>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
