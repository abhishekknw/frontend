import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';

export default function InventorySummary() {
  const fetchWrapper = useFetchWrapper();
  const [summary, setSummary] = useState();

  const getSummary = () => {
    fetchWrapper.get(ANG_APIS.GET_INVENTORY_SUMMARY).then((res) => {
      setSummary(res.data);
    });
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div class="tabContentBox">
      <form name="isForm" ng-submit="create()" role="form">
        <div class="contentBox">
          <h2 class="heading">Posters Allowed on Notice Board</h2>
          <div class="item">
            <label>Type of posters allowed:</label>
            <input
              type="checkbox"
              name="a4"
              value="A4"
              ng-model="model.nb_A4_allowed"
              ng-disabled="oldInventory.nb_A4_allowed==true"
            />{' '}
            A4 Poster Allowed
            <input
              type="checkbox"
              name="a3"
              value="A3"
              ng-model="model.nb_A3_allowed"
              ng-disabled="oldInventory.nb_A3_allowed==true"
            />{' '}
            A3 Poster Allowed
          </div>
          <div class="item">
            <label>Number of Notice Boards:</label>
            <input
              type="number"
              name="nb_count"
              class="field"
              min="1"
              ng-model="model.nb_count"
              ng-pattern="/^[1-9][0-9]*$/"
            />
            <span class="error" ng-if="isForm.nb_count.$error.pattern">
              Not valid number!
            </span>
          </div>
          <div class="item" ng-if="model.total_poster_nb">
            <label>Total Posters on all Notice Boards:</label>
            <input
              type="number"
              name="total_poster_nb"
              class="field"
              ng-readonly="true"
              min="1"
              ng-model="model.total_poster_nb"
              ng-pattern="/^[1-9][0-9]*$/"
            />
            <span class="error" ng-if="isForm.total_poster_nb.$error.pattern">
              Not valid number!
            </span>
          </div>
          <div class="item">
            <label>Campaign Price of Posters on Notice Board per Week:</label>
            <input
              type="number"
              ng-disabled="true"
              name="poster_price_week_nb"
              min="1"
              class="field"
              ng-model="model.poster_price_week_nb"
              ng-pattern="/^[1-9][0-9]*$/"
            />
            <span class="error" ng-if="isForm.poster_price_week_nb.$error.pattern">
              Not valid number!
            </span>
          </div>
          <div class="item">
            <label>Price Confidence:</label>
            <select class="field" ng-model="model.nb_price_confidence">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <h2 class="heading">Posters Allowed in Lift</h2>
          <div class="item">
            <label>Total Number of Lifts:</label>
            <input
              type="number"
              name="lift_count"
              class="field"
              min="1"
              ng-model="model.lift_count"
              ng-pattern="/^[1-9][0-9]*$/"
            />
            <span class="error" ng-if="isForm.lift_count.$error.pattern">
              Not valid number!
            </span>
          </div>
          <div class="item">
            <label>Total Posters on all Lifts:</label>
            <input type="number" class="field" ng-readonly="true" ng-model="model.lift_count" />
          </div>
          <div class="item">
            <label>Campaign Price of Posters in Lift per Week:</label>
            <input
              type="number"
              ng-disabled="true"
              class="field"
              ng-model="model.poster_price_week_lift"
            />
          </div>
          <div class="item">
            <label>Price Confidence:</label>
            <select class="field" ng-model="model.lift_price_confidence">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div class="item">
            <label>Number of Posters/Tower:</label>
            <input
              type="number"
              name="poster_count_per_tower"
              min="1"
              class="field"
              ng-model="model.poster_count_per_tower"
              ng-pattern="/^[1-9][0-9]*$/"
            />
            <span class="error" ng-if="isForm.poster_count_per_tower.$error.pattern">
              Not valid number!
            </span>
          </div>
          <h2 class="heading">Standee Allowed</h2>
          <div class="item">
            <label>Type of standees allowed:</label>
            <input
              type="checkbox"
              name="small"
              value="Small"
              ng-model="model.standee_small"
              ng-disabled="oldInventory.standee_small==true"
            />{' '}
            Small
            <input
              type="checkbox"
              name="medium"
              value="Medium"
              ng-model="model.standee_medium"
              ng-disabled="oldInventory.standee_medium==true"
            />{' '}
            Medium
          </div>
          <div class="item">
            <label>Number of Standees:</label>
            <input
              type="number"
              name="total_standee_count"
              min="1"
              class="field"
              ng-model="model.total_standee_count"
              ng-pattern="/^[1-9][0-9]*$/"
            />
            <span class="error" ng-if="isForm.total_standee_count.$error.pattern">
              Not valid number!
            </span>
          </div>
          <div class="item">
            <label>Campaign Price of Standees/Week:</label>
            <input
              type="number"
              ng-disabled="true"
              class="field"
              ng-model="model.standee_price_week"
            />
          </div>
          <div class="item">
            <label>Price Confidence:</label>
            <select class="field" ng-model="model.standee_price_confidence">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div class="item">
            <label>Number of Standees/Tower:</label>
            <input
              type="number"
              name="standee_count_per_tower"
              min="1"
              class="field"
              ng-model="model.standee_count_per_tower"
              ng-pattern="/^[1-9][0-9]*$/"
            />
            <span class="error" ng-if="isForm.standee_count_per_tower.$error.pattern">
              Not valid number!
            </span>
          </div>
          <h2 class="heading">Stall Campaign Allowed</h2>
          <div class="item">
            <label>Type of stalls allowed:</label>
            <input
              type="checkbox"
              ng-model="model.stall_small"
              ng-disabled="oldInventory.stall_small==true"
            />{' '}
            Canopy/Small
            <input type="checkbox" ng-model="model.stall_large" /> Large
            <div ng-if="model.stall_allowed">
              <div ng-if="model.stall_small">
                <label>Campaign Price of Stall/day(Canopy/Small):</label>
                <input
                  type="number"
                  ng-disabled="true"
                  class="field"
                  ng-model="model.stall_price_day_small"
                />
                <label>Price Confidence:</label>
                <select class="field" ng-model="model.smallStall_price_confidence">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
            <div ng-if="model.stall_allowed">
              <div ng-if="model.stall_large">
                <label>Campaign Price of Stall/day(Large):</label>
                <input
                  type="number"
                  ng-disabled="true"
                  class="field"
                  ng-model="model.stall_price_day_large"
                />
                <label>Price Confidence:</label>
                <select class="field" ng-model="model.largeStall_price_confidence">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </div>
          <h2 class="heading">Car Display Campaign Allowed</h2>
          <div class="item">
            <label>Type of car displays allowed:</label>
            <input
              type="checkbox"
              ng-model="model.cd_standard"
              ng-disabled="oldInventory.cd_standard==true"
            />
            Standard
            <input
              type="checkbox"
              ng-model="model.cd_premium"
              ng-disabled="oldInventory.cd_premium==true"
            />
            Premium
            <div ng-if="model.cd_standard">
              <label>Campaign Price of Car Display/Day:</label>
              <input
                type="number"
                ng-disabled="true"
                class="field"
                ng-model="model.cd_price_day_standard"
              />
              <label>Price Confidence:</label>
              <select class="field" ng-model="model.standard_price_confidence">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div ng-if="model.cd_premium">
              <label>Campaign Price of Car Display/Day:</label>
              <input
                type="number"
                class="field"
                ng-disabled="true"
                ng-model="model.cd_price_day_premium"
              />
              <label>Price Confidence:</label>
              <select class="field" ng-model="model.premium_price_confidence">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div class="item" ng-if="model.stall_allowed || model.car_display_allowed">
            <label>Number of Stalls/Car Display Allowed Per Day:</label>
            <input
              type="number"
              name="total_stall_count"
              min="1"
              class="field"
              ng-model="model.total_stall_count"
              ng-pattern="/^[1-9][0-9]*$/"
            />
            <span class="error" ng-if="isForm.total_stall_count.$error.pattern">
              Not valid number!
            </span>
          </div>
          <h2 class="heading">Flier Distribution Allowed</h2>
          <div class="item">
            <label>Type of Flier Distribution allowed:</label>
            <input
              type="radio"
              name="flier"
              ng-model="model.selected_flier_type"
              value="mailbox"
            />{' '}
            Mailbox Allowed
            <input
              type="radio"
              name="flier"
              ng-model="model.selected_flier_type"
              value="d2d"
            />{' '}
            Door-to-Door Allowed
            <input
              type="radio"
              name="flier"
              ng-model="model.selected_flier_type"
              value="lobby"
            />{' '}
            At Lobby(Through Watchman) Allowed
          </div>
          <div class="item">
            <label>Frequency of Flier Distribution/Month:</label>
            <input
              type="number"
              name="flier_frequency"
              min="1"
              class="field"
              ng-model="model.flier_frequency"
              ng-pattern="/^[1-9][0-9]*$/"
            />
            <span class="error" ng-if="isForm.flier_frequency.$error.pattern">
              Not valid number!
            </span>
          </div>
          <div class="item">
            <label>Campaign Price of Flier/Day:</label>
            <input
              type="number"
              ng-disabled="true"
              class="field"
              ng-model="model.flier_price_day"
            />
          </div>
          <div class="item">
            <label>Price Confidence:</label>
            <select class="field" ng-model="model.flier_price_confidence">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div class="item" ng-if="model.flat_count">
            <label>Number of Flats:</label>
            <input type="text" class="field" ng-model="model.flat_count" ng-readonly="true" />
          </div>
          <h2 class="heading">Is Gateway Arch Available</h2>
          <div class="item">
            <input
              type="radio"
              name="gateway_arch"
              ng-model="model.lit"
              ng-value="true"
              ng-click="checkGateWayArchStatus('lit')"
            />{' '}
            Lit
            <input
              type="radio"
              name="gateway_arch"
              ng-model="model.non_lit"
              ng-value="true"
              ng-click="checkGateWayArchStatus('non_lit')"
            />{' '}
            Non Lit
          </div>
          <div class="item">
            <label>Length</label>
            <input
              type="number"
              class="field"
              placeholder="In Feets"
              ng-model="model.gateway_arch_length"
            />
          </div>
          <div class="item">
            <label>Breadth</label>
            <input
              type="number"
              class="field"
              placeholder="In Feets"
              ng-model="model.gateway_arch_breadth"
            />
          </div>
          <div class="item">
            <button type="submit" class="smallBtn">
              Save and Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
