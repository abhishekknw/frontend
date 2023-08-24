export default function EventDetailsPage() {
  return (
    <>
      <div class="tab-inner">
        <h2 class="heading">Select Corporate Events</h2>
        <ul class="events" ng-repeat="event in events">
          <li>
            <label>{event.name}</label>
            <button
              class="active smallBtn"
              ng-click="addEvent(event.name)"
              ng-hide="eventsDataDict[event.name]"
            >
              Add
            </button>
            <button class="active smallBtn" ng-show="eventsDataDict[event.name]" ng-disabled="true">
              Added
            </button>
            <button
              class="active smallBtn"
              ng-click="deleteEvent(event.name)"
              ng-disabled="!eventsDataDict[event.name]"
            >
              Delete
            </button>
            <button
              class="active smallBtn"
              data-toggle="modal"
              data-target="#eventDetails"
              ng-click="getEventDetails(event.name)"
              ng-disabled="!eventsDataDict[event.name]"
            >
              Add/View
            </button>
          </li>
        </ul>
      </div>

      <div class="modal fade" id="eventDetails" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modalBodyBox">
                <h3>Event Details</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <div ng-show="showDetails">
                  <form>
                    <label>Event Name</label>
                    <input type="text" class="field" ng-model="eventDetails.event_name" readonly />
                    <label>Start Date</label>
                    <input
                      type="date"
                      class="field"
                      ng-model="eventDetails.start_day"
                      uib-datepicker-popup="{{format}}"
                      is-open="popup1"
                      datepicker-options="dateOptions"
                      close-text="Close"
                      date-parser="{{format}}"
                      alt-input-formats="altInputFormats"
                      ng-model-options="{timezone:'UTC'}"
                    />
                    <label>End Date</label>
                    <input
                      type="date"
                      class="field"
                      ng-model="eventDetails.end_day"
                      uib-datepicker-popup="{{format}}"
                      is-open="popup2"
                      datepicker-options="dateOptions"
                      close-text="Close"
                      date-parser="{{format}}"
                      alt-input-formats="altInputFormats"
                      ng-model-options="{timezone:'UTC'}"
                    />
                    <label>Event Location</label>
                    <input type="text" class="field" ng-model="eventDetails.event_location" />
                    <label>Activities</label>
                    <input type="text" class="field" ng-model="eventDetails.activities" />
                    <label>Important Day of Event</label>
                    <input type="text" class="field" ng-model="eventDetails.important_day" />
                    <label>Gathering Per Day</label>
                    <input
                      type="text"
                      class="field"
                      ng-model="eventDetails.past_gathering_per_event"
                    />
                    <label>No of Poster Places</label>
                    <input type="text" class="field" ng-model="eventDetails.poster_spaces_count" />
                    <label>No of Standee Spaces</label>
                    <input type="text" class="field" ng-model="eventDetails.standee_spaces_count" />
                    <label>No of Banner Places</label>
                    <input type="text" class="field" ng-model="eventDetails.banner_spaces_count" />
                    <label>No of Stall Places</label>
                    <input type="text" class="field" ng-model="eventDetails.stall_spaces_count" />
                    <label>Budget</label>
                    <input
                      type="text"
                      class="field"
                      placeholder="Budget"
                      ng-model="eventDetails.budget"
                    />
                    <label>Last Year Sponsors</label>
                    <input
                      type="text"
                      class="field"
                      placeholder="Last Year Sponsors"
                      ng-model="eventDetails.last_year_sponsors"
                    />
                    <label>Event Status</label>
                    <select type="text" class="field" ng-model="eventDetails.event_status">
                      <option ng-repeat="status in eventStatus" ng-value="status.name">
                        {status.name}
                      </option>
                    </select>
                    <button class="active submit-btn" ng-click="updateEventDetails()">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
