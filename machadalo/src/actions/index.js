import * as AppearanceActions from './appearance';
import * as AuthActions from './auth';
import * as ChecklistActions from './checklist';
import * as CampaignActions from './campaign';
import * as SupplierActions from './supplier';
import * as EntityActions from './entity';
import * as InventoryActions from './inventory';
import * as SettingActions from './setting';
import * as UserActions from './user';
import * as UserProfileActions from './userProfile';
import * as LeadActions from './lead';

export default Object.assign(
  {},
  AppearanceActions,
  AuthActions,
  ChecklistActions,
  CampaignActions,
  SupplierActions,
  EntityActions,
  InventoryActions,
  SettingActions,
  UserActions,
  UserProfileActions,
  LeadActions
);
