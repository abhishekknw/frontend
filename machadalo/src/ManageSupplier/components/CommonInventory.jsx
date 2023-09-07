import { useParams } from 'react-router';
import { useFetchWrapper } from '../../Dashboards/_helpers/fetch-wrapper';
import { useEffect, useState } from 'react';
import { ANG_APIS } from '../api.constants';

export default function CommonInventorySummary({ code }) {
  const { id } = useParams();
  const fetchWrapper = useFetchWrapper();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});

  const getSummary = () => {
    fetchWrapper
      .get(ANG_APIS.GET_SOCIETY_DETAILS + id + `/inventory_summary/?supplierTypeCode=` + code)
      .then((res) => {
        setData(res.inventory);
        setFormData(res.inventory);
      });
  };

  const postSummary = () => {
    fetchWrapper
      .post(ANG_APIS.GET_SOCIETY_DETAILS + id + `/inventory_summary/`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSummary();
  }, []);

  const handleChange = (e) => {
    const { checked, name } = e.target;
    let data = { ...formData };
    data[name] = checked;
    setFormData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    postSummary();
  };

  return (
    <div className="tabContentBox">
      <form name="isForm" ng-submit="create()" role="form" onSubmit={handleSubmit}>
        <div className="contentBox">
          <h2 className="heading">Posters Allowed on Notice Board</h2>
          <div className="item">
            <label>Type of posters allowed:</label>
            <input
              type="checkbox"
              name="nb_A4_allowed"
              value={formData?.nb_A4_allowed}
              disabled={data?.nb_A4_allowed}
              onChange={handleChange}
            />{' '}
            A4 Poster Allowed
            <input
              type="checkbox"
              name="nb_A3_allowed"
              value={formData?.nb_A3_allowed}
              disabled={data?.nb_A3_allowed == true}
              onChange={handleChange}
            />{' '}
            A3 Poster Allowed
          </div>
          <h2 className="heading">Posters Allowed in Lift</h2>
          <div className="item">
            <label>Type of posters allowed:</label>
            <input
              type="checkbox"
              name="poster_allowed_lift_A4"
              value={formData?.poster_allowed_lift_A4}
              disabled={data?.poster_allowed_lift_A4 == true}
              onChange={handleChange}
            />{' '}
            A4 Poster Allowed
            <input
              type="checkbox"
              name="poster_allowed_lift_A3"
              value={formData?.poster_allowed_lift_A3}
              disabled={data?.poster_allowed_lift_A3 == true}
              onChange={handleChange}
            />{' '}
            A3 Poster Allowed
          </div>

          <h2 className="heading">Standee Allowed</h2>
          <div className="item">
            <label>Type of standees allowed:</label>
            <input
              type="checkbox"
              name="standee_small"
              value={formData?.standee_small}
              disabled={data?.standee_small == true}
              onChange={handleChange}
            />{' '}
            Small
            <input
              type="checkbox"
              name="standee_medium"
              value={formData?.standee_medium}
              disabled={data?.standee_medium == true}
              onChange={handleChange}
            />{' '}
            Medium
            <input
              type="checkbox"
              name="standee_large"
              value={formData?.standee_large}
              disabled={data?.standee_large == true}
              onChange={handleChange}
            />{' '}
            Large
          </div>

          <h2 className="heading">Stall Campaign Allowed</h2>
          <div className="item">
            <label>Type of stalls allowed:</label>
            <input
              type="checkbox"
              name="stall_canopy"
              value={formData?.stall_canopy}
              disabled={data?.stall_canopy == true}
              onChange={handleChange}
            />{' '}
            Canopy
            <input
              type="checkbox"
              name="stall_small"
              value={formData?.stall_small}
              disabled={data?.stall_small == true}
              onChange={handleChange}
            />{' '}
            Small
            <input
              type="checkbox"
              name="stall_large"
              value={formData?.stall_large}
              disabled={data?.stall_large == true}
              onChange={handleChange}
            />{' '}
            Large
            <input
              type="checkbox"
              name="stall_customize"
              value={formData?.stall_customize}
              disabled={data?.stall_customize == true}
              onChange={handleChange}
            />{' '}
            Customize
          </div>
          <h2 className="heading">Car Display Campaign Allowed</h2>
          <div className="item">
            <label>Type of car displays allowed:</label>
            <input
              type="checkbox"
              name="cd_standard"
              value={formData?.cd_standard}
              disabled={data?.cd_standard == true}
              onChange={handleChange}
            />
            Standard
            <input
              type="checkbox"
              name="cd_premium"
              value={formData?.cd_premium}
              disabled={data?.cd_premium == true}
              onChange={handleChange}
            />
            Premium
          </div>
          <h2 className="heading">Flier Distribution Allowed</h2>
          <div className="item">
            <label>Type of Flier Distribution allowed:</label>
            <input
              type="checkbox"
              name="mailbox_allowed"
              value={formData?.mailbox_allowed}
              disabled={data?.mailbox_allowed == true}
              onChange={handleChange}
            />{' '}
            Mailbox Allowed
            <input
              type="checkbox"
              name="d2d_allowed"
              value={formData?.d2d_allowed}
              disabled={data?.d2d_allowed == true}
              onChange={handleChange}
            />{' '}
            Door-to-Door Allowed
            <input
              type="checkbox"
              name="flier_lobby_allowed"
              value={formData?.flier_lobby_allowed}
              disabled={data?.flier_lobby_allowed == true}
              onChange={handleChange}
            />{' '}
            At Lobby(Through Watchman) Allowed
          </div>

          <h2 className="heading">Bus Allowed</h2>
          <div className="item">
            <label>Type of Bus allowed:</label>
            <input
              type="checkbox"
              name="bus_back"
              value={formData?.bus_back}
              disabled={data?.bus_back == true}
              onChange={handleChange}
            />{' '}
            Bus Back
            <input
              type="checkbox"
              name="bus_left"
              value={formData?.bus_left}
              disabled={data?.bus_left == true}
              onChange={handleChange}
            />{' '}
            Bus Right
            <input
              type="checkbox"
              name="bus_right"
              value={formData?.bus_right}
              disabled={data?.bus_right == true}
              onChange={handleChange}
            />{' '}
            Bus Left
            <input
              type="checkbox"
              name="bus_wrap"
              value={formData?.bus_wrap}
              disabled={data?.bus_wrap == true}
              onChange={handleChange}
            />{' '}
            Bus Wrap
          </div>

          <h2 className="heading">Bus Shelter Allowed</h2>
          <div className="item">
            <label>Type of Bus Shelter allowed:</label>
            <input
              type="checkbox"
              name="bus_shelter"
              value={formData?.bus_shelter}
              disabled={data?.bus_wrap == true}
              onChange={handleChange}
            />{' '}
            Bus Shelter Standard
            <input
              type="checkbox"
              name="bus_shelter_lit"
              value={formData?.bus_shelter_lit}
              disabled={data?.bus_wrap == true}
              onChange={handleChange}
            />{' '}
            Bus Shelter Lit Standard
          </div>

          <h2 className="heading">Hoarding Allowed</h2>
          <div className="item">
            <label>Type of Hoarding allowed:</label>
            <input
              type="checkbox"
              name="hoarding"
              value={formData?.hoarding}
              disabled={data?.hoarding == true}
              onChange={handleChange}
            />{' '}
            Hoarding
            <input
              type="checkbox"
              name="hoarding_lit"
              value={formData?.hoarding_lit}
              disabled={data?.hoarding_lit == true}
              onChange={handleChange}
            />{' '}
            Hoarding Lit
          </div>

          <h2 className="heading">Banner Allowed</h2>
          <div className="item">
            <label>Type of Banner allowed:</label>
            <input
              type="checkbox"
              name="banner_small"
              value={formData?.banner_small}
              disabled={data?.banner_small == true}
              onChange={handleChange}
            />{' '}
            Banner Small
            <input
              type="checkbox"
              name="banner_medium"
              value={formData?.banner_medium}
              disabled={data?.banner_medium == true}
              onChange={handleChange}
            />{' '}
            Banner Medium
            <input
              type="checkbox"
              name="banner_large"
              value={formData?.banner_large}
              disabled={data?.banner_large == true}
              onChange={handleChange}
            />{' '}
            Banner Large
          </div>

          <h2 className="heading">Sunboard</h2>
          <div className="item">
            <label>Sunboard:</label>
            <input
              type="checkbox"
              name="sun_board_allowed"
              value={formData?.sun_board_allowed}
              disabled={data?.sun_board_allowed == true}
              onChange={handleChange}
            />{' '}
            Normal
          </div>

          <h2 className="heading">Floor</h2>
          <div className="item">
            <label>Floor:</label>
            <input
              type="checkbox"
              name="floor_inventory"
              value={formData?.floor_inventory}
              disabled={data?.floor_inventory == true}
              onChange={handleChange}
            />{' '}
            Standard
          </div>

          <h2 className="heading">Wall</h2>
          <div className="item">
            <label>Wall:</label>
            <input
              type="checkbox"
              name="wall_inventory"
              checked="model.wall_inventory"
              value={formData?.wall_inventory}
              disabled={data?.wall_inventory == true}
              onChange={handleChange}
            />{' '}
            Standard
          </div>

          <h2 className="heading">Table</h2>
          <div className="item">
            <label>Table:</label>
            <input
              type="checkbox"
              name="table_inventory"
              value={formData?.table_inventory}
              disabled={data?.table_inventory == true}
              onChange={handleChange}
            />{' '}
            Standard
          </div>

          <h2 className="heading">Tent Card</h2>
          <div className="item">
            <label>Tent Card:</label>
            <input
              type="checkbox"
              name="tent_card"
              value={formData?.tent_card}
              disabled={data?.tent_card == true}
              onChange={handleChange}
            />{' '}
            Standard
          </div>

          <h2 className="heading">Ceiling</h2>
          <div className="item">
            <label>Ceiling:</label>
            <input
              type="checkbox"
              name="ceiling_inventory"
              value={formData?.ceiling_inventory}
              disabled={data?.ceiling_inventory == true}
              onChange={handleChange}
            />{' '}
            Standard
          </div>

          <h2 className="heading">Billing</h2>
          <div className="item">
            <label>Billing:</label>
            <input
              type="checkbox"
              name="billing_inventory"
              value={formData?.billing_inventory}
              disabled={data?.billing_inventory == true}
              onChange={handleChange}
            />{' '}
            Standard
          </div>

          <h2 className="heading">Is Gateway Arch Available</h2>
          <div className="item">
            <input
              type="radio"
              name="lit"
              value={formData?.lit}
              ng-value="true"
              ng-click="checkGateWayArchStatus('lit')"
              onChange={handleChange}
            />{' '}
            Lit
            <input
              type="radio"
              name="non_lit"
              value={formData?.non_lit}
              ng-value="true"
              ng-click="checkGateWayArchStatus('non_lit')"
              onChange={handleChange}
            />{' '}
            Non Lit
          </div>
          <div className="item">
            <button type="submit" className="smallBtn">
              Save and Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
