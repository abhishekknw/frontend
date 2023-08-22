import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import {
  CORPORATE_HOME,
  CORPORATE_SINGLE,
  CREATE_SUPPLIER,
  DASHBOARD_SUPPLIER,
  SOCIETY_HOME,
  SOCIETY_SINGLE,
  SUPPLIER_LOGIN,
} from '../constants/routes.constants';
import SupplierDashboard from './SupplierDashboard';
import CreateSupplier from './CreateSupplier';
import MachadaloHeader from '../Dashboards/common/header/Header';
import './styles/main.css';
import './styles/login.css';
import './styles/style.css';
import './styles/machadalo.css';
import Login from './Login';
import Society from './components/society/Society';
import CorporateHome from './components/corporate/CorporateHome';
import SocietyHome from './components/society/SocietyHome';
import Corporate from './components/corporate/Corporate';

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
        <Route exact path={SOCIETY_SINGLE} component={Society} />
        <Route exact path={CORPORATE_HOME} component={CorporateHome} />
        <Route exact path={CORPORATE_SINGLE} component={Corporate} />
      </Switch>
    </>
  );
}
