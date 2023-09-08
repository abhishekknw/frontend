import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import {
  BUSSHELTER_SINGLE,
  BUS_SINGLE,
  COMMON_HOME,
  COMMON_HOME_SEARCH,
  CORPORATES_SINGLE,
  CORPORATE_HOME,
  CORPORATE_SINGLE,
  CREATE_SUPPLIER,
  DASHBOARD_SUPPLIER,
  EDUCATION_INSTITUTE_SINGLE,
  GANTRY_SINGLE,
  GYM_SINGLE,
  HORDING_SINGLE,
  HOSPITAL_SINGLE,
  RADIO_CHANNEL_SINGLE,
  RETAILSHOP_SINGLE,
  SALON_SINGLE,
  SOCIETY_HOME,
  SOCIETY_HOME_SEARCH,
  SOCIETY_SINGLE,
  TV_CHANNEL_SINGLE,
} from '../constants/routes.constants';
import SupplierDashboard from './SupplierDashboard';
import CreateSupplier from './CreateSupplier';
import './styles/main.css';
import './styles/login.css';
import './styles/style.css';
import './styles/machadalo.css';
// import './bootstrap/css/bootstrap.css';
import Society from './components/society/Society';
import SocietyHome from './components/society/SocietyHome';
import Corporate from './components/corporate/Corporate';
import CommonHome from './components/CommonHome';
import Gym from './components/gym/Gym';
import Salon from './components/salon/Salon';
import BusShelter from './components/busshelter/BusShelter';
import RetailShop from './components/retailshop/RetailShop';
import EducationInstitute from './components/educationInstitute/EducationInstitute';
import Hording from './components/hording/Hording';
import Bus from './components/bus/Bus';
import Gantry from './components/gantry/Gantry';
import RadioChannel from './components/radio_channel/RadioChannel';
import TvChannel from './components/tv_channel/TvChannel';
import Corporates from './components/corporates/Corporates';
import Hospital from './components/hospital/Hospital';

export default function ManageSupplier(props) {
  const { match } = props;

  return (
    <>
      <Switch>
        <Route exact path={match.path + DASHBOARD_SUPPLIER} component={SupplierDashboard} />
        <Route exact path={match.path + CREATE_SUPPLIER} component={CreateSupplier} />
        <Route exact path={match.path + SOCIETY_HOME} component={SocietyHome} />
        <Route exact path={match.path + SOCIETY_HOME_SEARCH} component={SocietyHome} />
        <Route exact path={match.path + SOCIETY_SINGLE} component={Society} />
        <Route exact path={match.path + COMMON_HOME} component={CommonHome} />
        <Route exact path={match.path + CORPORATE_SINGLE} component={Corporate} />
        <Route exact path={match.path + GYM_SINGLE} component={Gym} />
        <Route exact path={match.path + SALON_SINGLE} component={Salon} />
        <Route exact path={match.path + BUSSHELTER_SINGLE} component={BusShelter} />
        <Route exact path={match.path + RETAILSHOP_SINGLE} component={RetailShop} />
        <Route
          exact
          path={match.path + EDUCATION_INSTITUTE_SINGLE}
          component={EducationInstitute}
        />
        <Route exact path={match.path + HORDING_SINGLE} component={Hording} />
        <Route exact path={match.path + BUS_SINGLE} component={Bus} />
        <Route exact path={match.path + GANTRY_SINGLE} component={Gantry} />
        <Route exact path={match.path + RADIO_CHANNEL_SINGLE} component={RadioChannel} />
        <Route exact path={match.path + TV_CHANNEL_SINGLE} component={TvChannel} />
        <Route exact path={match.path + CORPORATES_SINGLE} component={Corporates} />
        <Route exact path={match.path + HOSPITAL_SINGLE} component={Hospital} />
        <Route exact path={match.path + COMMON_HOME_SEARCH} component={CommonHome} />
      </Switch>
    </>
  );
}
