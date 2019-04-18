import * as AppearanceActions from './appearance';
import * as AuthActions from './auth';
import * as ChecklistActions from './checklist';
import * as CampaignActions from './campaign';
import * as SupplierActions from './supplier';
import * as EntityActions from './Entity/entity';
import * as EntityTypeActions from './Entity/entityType';
import * as BaseEntityTypeActions from './Entity/baseEntityType';
import * as InventoryActions from './inventory';
import * as SettingActions from './setting';
import * as UserActions from './user';
import * as UserProfileActions from './userProfile';
import * as LeadActions from './lead';
import * as BookingActions from './booking';
import * as PhaseActions from './phase';

export default Object.assign(
  {},
  AppearanceActions,
  AuthActions,
  ChecklistActions,
  CampaignActions,
  SupplierActions,
  EntityActions,
  EntityTypeActions,
  BaseEntityTypeActions,
  InventoryActions,
  SettingActions,
  UserActions,
  UserProfileActions,
  LeadActions,
  BookingActions,
  PhaseActions
);
