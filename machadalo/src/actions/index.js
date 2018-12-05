import * as AppearanceActions from './appearance';
import * as AuthActions from './auth';
import * as ChecklistActions from './checklist';
import * as CampaignActions from './campaign';
import * as SupplierActions from './supplier';
import * as EntityActions from './entity';
import * as SettingActions from './setting';

export default Object.assign(
  {},
  AppearanceActions,
  AuthActions,
  ChecklistActions,
  CampaignActions,
  SupplierActions,
  EntityActions,
  SettingActions
);
