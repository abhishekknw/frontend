export default function InventorySummary() {
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
          <h2 class="heading">Posters Allowed in Lift</h2>
          <div class="item">
            <label>Type of posters allowed:</label>
            <input
              type="checkbox"
              name="a4"
              value="A4"
              ng-model="model.poster_allowed_lift_A4"
              ng-disabled="oldInventory.poster_allowed_lift_A4==true"
            />{' '}
            A4 Poster Allowed
            <input
              type="checkbox"
              name="a3"
              value="A3"
              ng-model="model.poster_allowed_lift_A3"
              ng-disabled="oldInventory.poster_allowed_lift_A3==true"
            />{' '}
            A3 Poster Allowed
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
            <input
              type="checkbox"
              name="large"
              value="large"
              ng-model="model.standee_large"
              ng-disabled="oldInventory.standee_large==true"
            />{' '}
            Large
          </div>

          <h2 class="heading">Stall Campaign Allowed</h2>
          <div class="item">
            <label>Type of stalls allowed:</label>
            <input
              type="checkbox"
              name="stall_canopy"
              value="true"
              ng-model="model.stall_canopy"
              ng-disabled="oldInventory.stall_canopy==true"
            />{' '}
            Canopy
            <input
              type="checkbox"
              name="stall_small"
              value="true"
              ng-model="model.stall_small"
              ng-disabled="oldInventory.stall_small==true"
            />{' '}
            Small
            <input
              type="checkbox"
              name="stall_large"
              value="true"
              ng-model="model.stall_large"
              ng-disabled="oldInventory.stall_large==true"
            />{' '}
            Large
            <input
              type="checkbox"
              name="stall_customize"
              value="true"
              ng-model="model.stall_customize"
              ng-disabled="oldInventory.stall_customize==true"
            />{' '}
            Customize
          </div>
          <h2 class="heading">Car Display Campaign Allowed</h2>
          <div class="item">
            <label>Type of car displays allowed:</label>
            <input
              type="checkbox"
              name="cd_standard"
              value="true"
              ng-model="model.cd_standard"
              ng-disabled="oldInventory.cd_standard==true"
            />
            Standard
            <input
              type="checkbox"
              name="cd_premium"
              value="true"
              ng-model="model.cd_premium"
              ng-disabled="oldInventory.cd_premium==true"
            />
            Premium
          </div>
          <h2 class="heading">Flier Distribution Allowed</h2>
          <div class="item">
            <label>Type of Flier Distribution allowed:</label>
            <input
              type="checkbox"
              name="medium"
              value="true"
              ng-model="model.mailbox_allowed"
              ng-disabled="oldInventory.mailbox_allowed==true"
            />{' '}
            Mailbox Allowed
            <input
              type="checkbox"
              name="d2d"
              value="true"
              ng-model="model.d2d_allowed"
              ng-disabled="oldInventory.d2d_allowed==true"
            />{' '}
            Door-to-Door Allowed
            <input
              type="checkbox"
              name="small"
              value="true"
              ng-model="model.flier_lobby_allowed"
              ng-disabled="oldInventory.flier_lobby_allowed==true"
            />{' '}
            At Lobby(Through Watchman) Allowed
          </div>

          <h2 class="heading">Bus Allowed</h2>
          <div class="item">
            <label>Type of Bus allowed:</label>
            <input
              type="checkbox"
              name="bus_back"
              value="true"
              ng-model="model.bus_back"
              ng-disabled="oldInventory.bus_back==true"
            />{' '}
            Bus Back
            <input
              type="checkbox"
              name="bus_left"
              value="true"
              ng-model="model.bus_left"
              ng-disabled="oldInventory.bus_left==true"
            />{' '}
            Bus Right
            <input
              type="checkbox"
              name="bus_right"
              value="true"
              ng-model="model.bus_right"
              ng-disabled="oldInventory.bus_right==true"
            />{' '}
            Bus Left
            <input
              type="checkbox"
              name="bus_wrap"
              value="true"
              ng-model="model.bus_wrap"
              ng-disabled="oldInventory.bus_wrap==true"
            />{' '}
            Bus Wrap
          </div>

          <h2 class="heading">Bus Shelter Allowed</h2>
          <div class="item">
            <label>Type of Bus Shelter allowed:</label>
            <input
              type="checkbox"
              name="bus_shelter"
              value="true"
              ng-model="model.bus_shelter"
              ng-disabled="oldInventory.bus_wrap==true"
            />{' '}
            Bus Shelter Standard
            <input
              type="checkbox"
              name="bus_shelter_lit"
              value="true"
              ng-model="model.bus_shelter_lit"
              ng-disabled="oldInventory.bus_wrap==true"
            />{' '}
            Bus Shelter Lit Standard
          </div>

          <h2 class="heading">Hoarding Allowed</h2>
          <div class="item">
            <label>Type of Hoarding allowed:</label>
            <input
              type="checkbox"
              name="hoarding"
              value="true"
              ng-model="model.hoarding"
              ng-disabled="oldInventory.hoarding==true"
            />{' '}
            Hoarding
            <input
              type="checkbox"
              name="hoarding_lit"
              value="true"
              ng-model="model.hoarding_lit"
              ng-disabled="oldInventory.hoarding_lit==true"
            />{' '}
            Hoarding Lit
          </div>

          <h2 class="heading">Banner Allowed</h2>
          <div class="item">
            <label>Type of Banner allowed:</label>
            <input
              type="checkbox"
              name="banner_small"
              value="true"
              ng-model="model.banner_small"
              ng-disabled="oldInventory.banner_small==true"
            />{' '}
            Banner Small
            <input
              type="checkbox"
              name="banner_medium"
              value="true"
              ng-model="model.banner_medium"
              ng-disabled="oldInventory.banner_medium==true"
            />{' '}
            Banner Medium
            <input
              type="checkbox"
              name="banner_large"
              value="true"
              ng-model="model.banner_large"
              ng-disabled="oldInventory.banner_large==true"
            />{' '}
            Banner Large
          </div>

          <h2 class="heading">Sunboard</h2>
          <div class="item">
            <label>Sunboard:</label>
            <input
              type="checkbox"
              name="sun_board_allowed"
              value="true"
              ng-model="model.sun_board_allowed"
              ng-disabled="oldInventory.sun_board_allowed==true"
            />{' '}
            Normal
          </div>

          <h2 class="heading">Floor</h2>
          <div class="item">
            <label>Floor:</label>
            <input
              type="checkbox"
              name="floor_inventory"
              value="true"
              ng-model="model.floor_inventory"
              ng-disabled="oldInventory.floor_inventory==true"
            />{' '}
            Standard
          </div>

          <h2 class="heading">Wall</h2>
          <div class="item">
            <label>Wall:</label>
            <input
              type="checkbox"
              name="wall_inventory"
              checked="model.wall_inventory"
              value="true"
              ng-model="model.wall_inventory"
              ng-disabled="oldInventory.wall_inventory==true"
            />{' '}
            Standard
          </div>

          <h2 class="heading">Table</h2>
          <div class="item">
            <label>Table:</label>
            <input
              type="checkbox"
              name="table_inventory"
              value="true"
              ng-model="model.table_inventory"
              ng-disabled="oldInventory.table_inventory==true"
            />{' '}
            Standard
          </div>

          <h2 class="heading">Tent Card</h2>
          <div class="item">
            <label>Tent Card:</label>
            <input
              type="checkbox"
              name="tent_card"
              value="true"
              ng-model="model.tent_card"
              ng-disabled="oldInventory.tent_card==true"
            />{' '}
            Standard
          </div>

          <h2 class="heading">Ceiling</h2>
          <div class="item">
            <label>Ceiling:</label>
            <input
              type="checkbox"
              name="ceiling_inventory"
              value="true"
              ng-model="model.ceiling_inventory"
              ng-disabled="oldInventory.ceiling_inventory==true"
            />{' '}
            Standard
          </div>

          <h2 class="heading">Billing</h2>
          <div class="item">
            <label>Billing:</label>
            <input
              type="checkbox"
              name="billing_inventory"
              value="true"
              ng-model="model.billing_inventory"
              ng-disabled="oldInventory.billing_inventory==true"
            />{' '}
            Standard
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
            <button type="submit" class="smallBtn">
              Save and Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
