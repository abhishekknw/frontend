import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import {
  COMMON_HOME,
  COMMON_HOME_SEARCH,
  CORPORATE_HOME,
  CORPORATE_SINGLE,
  CREATE_SUPPLIER,
  DASHBOARD_SUPPLIER,
  SOCIETY_HOME,
  SOCIETY_HOME_SEARCH,
  SOCIETY_SINGLE,
} from '../constants/routes.constants';
import SupplierDashboard from './SupplierDashboard';
import CreateSupplier from './CreateSupplier';
import MachadaloHeader from '../Dashboards/common/header/Header';
import './styles/main.scss';
import './styles/login.scss';
import './styles/style.scss';
import './styles/machadalo.scss';
import './bootstrap/css/bootstrap.scss';
import Society from './components/society/Society';
import SocietyHome from './components/society/SocietyHome';
import Corporate from './components/corporate/Corporate';
import CommonHome from './components/CommonHome';

export default function ManageSupplier() {
  return (
    <>
      <div className="container ">
        <MachadaloHeader />
      </div>
      <Switch>
        <Route exact path={DASHBOARD_SUPPLIER} component={SupplierDashboard} />
        <Route exact path={CREATE_SUPPLIER} component={CreateSupplier} />
        <Route exact path={SOCIETY_HOME} component={SocietyHome} />
        <Route exact path={SOCIETY_HOME_SEARCH} component={SocietyHome} />
        <Route exact path={SOCIETY_SINGLE} component={Society} />
        <Route exact path={COMMON_HOME} component={CommonHome} />
        <Route exact path={CORPORATE_SINGLE} component={Corporate} />
        <Route exact path={COMMON_HOME_SEARCH} component={CommonHome} />
      </Switch>
    </>
  );
}
