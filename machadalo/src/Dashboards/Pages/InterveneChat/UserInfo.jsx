import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import {
    BsFillPencilFill,
    BsSearch,
    BsFillGeoAltFill,
    BsMessenger,
    BsCameraVideo,
    BsTelephone,
    BsThreeDots,
} from 'react-icons/bs';
import Avatar from '../InterveneChat/avatar.jpg';

const UserInfo = () => {
    return (
        <>
            <div className="user-info-wrapper">
                <div className="user-info-inner">
                    <div className="user-profile">
                        <div className="user-profile-header">
                            <div className="user-profile-img">
                                <img src={Avatar} alt='' />
                            </div>
                            <div>
                                <h4>Peter jonathon</h4>
                                <p>lorem ipsum</p>
                            </div>
                        </div>
                    </div>
                    <div className="user-profile-according">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>User Info</Accordion.Header>
                                <Accordion.Body>
                                    <div className="user-profile-inner">
                                        <p>Session ID:  <span>sdv1sd1v54564</span></p>
                                        <p>User Type:  <span>registered</span></p>
                                        <p>Created at:  <span>Sep 28, 2021 2:53:39 PM</span></p>
                                        <p>Last Active:  <span>Sep 11, 2023 3:23:44 AM</span></p>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Template message </Accordion.Header>
                                <Accordion.Body>
                                    No Template Message Send
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Customer Journey </Accordion.Header>
                                <Accordion.Body className='timeline-body'>
                                    <div className="timeline-wrapper">
                                        <ul class="timeline">
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2021-11-04 03:58 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2021-11-04 04:05 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested resolved</h5>
                                                <p class="">2021-11-04 04:05 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2021-11-29 03:37 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested resolved</h5>
                                                <p class="">2021-11-29 03:38 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2021-12-03 05:11 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2021-12-16 09:24 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested resolved</h5>
                                                <p class="">2021-12-16 09:24 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2022-01-05 08:44 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested resolved</h5>
                                                <p class="">2022-01-05 08:44 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2022-02-05 06:03 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2022-02-18 11:25 AM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested resolved</h5>
                                                <p class="">2022-02-18 11:25 AM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2022-02-24 02:21 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested resolved</h5>
                                                <p class="">2022-02-24 02:21 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2022-03-09 01:53 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested resolved</h5>
                                                <p class="">2022-03-09 01:53 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2022-03-10 01:26 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested resolved</h5>
                                                <p class="">2022-03-10 01:26 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2022-12-01 06:35 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2022-12-01 06:36 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested intervened</h5>
                                                <p class="">2022-12-01 07:16 PM</p>
                                            </li>
                                            <li ng-repeat="datas in customerJourneyData track by $index" class="ng-scope">
                                                <h5 class="">Anupam Sorabh requested resolved</h5>
                                                <p class="">2022-12-01 07:16 PM</p>
                                            </li>
                                        </ul>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfo
