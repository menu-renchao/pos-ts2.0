import type { testEnvironment } from '../../fixtures/environment.js';
import * as live from './live/order-page.js';
import * as offline from './offline/order-page.js';

type TestMode = typeof testEnvironment.testMode;
type OrderPageModeData = {
  groupSwitchDish: typeof offline.groupSwitchDish | typeof live.liveGroupSwitchDish;
  categorySwitchDish: typeof offline.categorySwitchDish | typeof live.liveCategorySwitchDish;
  categoryOptionDish: typeof offline.categoryOptionDish | typeof live.liveCategoryOptionDish;
  chineseCategoryDish: typeof offline.chineseCategoryDish | typeof live.liveChineseCategoryDish;
  categorySubOptionDish: typeof offline.categorySubOptionDish | typeof live.liveCategorySubOptionDish;
  categoryNoSubOptionDish: typeof offline.categoryNoSubOptionDish | typeof live.liveCategoryNoSubOptionDish;
  itemNoSubOptionDish: typeof offline.itemNoSubOptionDish | typeof live.liveItemNoSubOptionDish;
  itemOptionDish: typeof offline.itemOptionDish | typeof live.liveItemOptionDish;
  itemNoOptionDish: typeof offline.itemNoOptionDish | typeof live.liveItemNoOptionDish;
  itemSubOptionDish: typeof offline.itemSubOptionDish | typeof live.liveItemSubOptionDish;
  numberedNameConflictDish: typeof offline.numberedNameConflictDish | typeof live.liveNumberedNameConflictDish;
  chineseInitialSearchDish: typeof offline.chineseInitialSearchDish | typeof live.liveChineseInitialSearchDish;
  requiredKdsDish: typeof offline.requiredKdsDish | typeof live.liveRequiredKdsDish;
  posNameDisplayDish: typeof offline.posNameDisplayDish | typeof live.livePosNameDisplayDish;
  posNameDisplayValue: typeof offline.posNameDisplayValue | typeof live.livePosNameDisplayValue;
  discountableDish: typeof offline.discountableDish | typeof live.liveDiscountableDish;
  editableComboDish: typeof offline.editableComboDish | typeof live.liveEditableComboDish;
  comboMaxModifyDish: typeof offline.comboMaxModifyDish | typeof live.liveComboMaxModifyDish;
  comboNoOptionThenOptionDish:
    | typeof offline.comboNoOptionThenOptionDish
    | typeof live.liveComboNoOptionThenOptionDish;
  orderEditItemTaxExpected:
    | typeof offline.offlineOrderEditItemTaxExpected
    | typeof live.liveOrderEditItemTaxExpected;
  chineseMenuGroups: typeof offline.chineseMenuGroups | typeof live.liveChineseMenuGroups;
  noVoidItemStaffPassword: typeof staffNoVoidItemPassword | typeof live.liveNoVoidItemStaff.password;
  managerPassword: typeof staffManagerPassword | typeof live.liveBossStaff.password;
};

const staffNoVoidItemPassword = '22';
const staffManagerPassword = '11';

export const offlineOrderPageData = offline;
export const liveOrderPageData = live;

export function orderPageDataFor(testMode: TestMode): OrderPageModeData {
  if (testMode === 'live') {
    return {
      groupSwitchDish: live.liveGroupSwitchDish,
      categorySwitchDish: live.liveCategorySwitchDish,
      categoryOptionDish: live.liveCategoryOptionDish,
      chineseCategoryDish: live.liveChineseCategoryDish,
      categorySubOptionDish: live.liveCategorySubOptionDish,
      categoryNoSubOptionDish: live.liveCategoryNoSubOptionDish,
      itemNoSubOptionDish: live.liveItemNoSubOptionDish,
      itemOptionDish: live.liveItemOptionDish,
      itemNoOptionDish: live.liveItemNoOptionDish,
      itemSubOptionDish: live.liveItemSubOptionDish,
      numberedNameConflictDish: live.liveNumberedNameConflictDish,
      chineseInitialSearchDish: live.liveChineseInitialSearchDish,
      requiredKdsDish: live.liveRequiredKdsDish,
      posNameDisplayDish: live.livePosNameDisplayDish,
      posNameDisplayValue: live.livePosNameDisplayValue,
      discountableDish: live.liveDiscountableDish,
      editableComboDish: live.liveEditableComboDish,
      comboMaxModifyDish: live.liveComboMaxModifyDish,
      comboNoOptionThenOptionDish: live.liveComboNoOptionThenOptionDish,
      orderEditItemTaxExpected: live.liveOrderEditItemTaxExpected,
      chineseMenuGroups: live.liveChineseMenuGroups,
      noVoidItemStaffPassword: live.liveNoVoidItemStaff.password,
      managerPassword: live.liveBossStaff.password,
    };
  }

  return {
    groupSwitchDish: offline.groupSwitchDish,
    categorySwitchDish: offline.categorySwitchDish,
    categoryOptionDish: offline.categoryOptionDish,
    chineseCategoryDish: offline.chineseCategoryDish,
    categorySubOptionDish: offline.categorySubOptionDish,
    categoryNoSubOptionDish: offline.categoryNoSubOptionDish,
    itemNoSubOptionDish: offline.itemNoSubOptionDish,
    itemOptionDish: offline.itemOptionDish,
    itemNoOptionDish: offline.itemNoOptionDish,
    itemSubOptionDish: offline.itemSubOptionDish,
    numberedNameConflictDish: offline.numberedNameConflictDish,
    chineseInitialSearchDish: offline.chineseInitialSearchDish,
    requiredKdsDish: offline.requiredKdsDish,
    posNameDisplayDish: offline.posNameDisplayDish,
    posNameDisplayValue: offline.posNameDisplayValue,
    discountableDish: offline.discountableDish,
    editableComboDish: offline.editableComboDish,
    comboMaxModifyDish: offline.comboMaxModifyDish,
    comboNoOptionThenOptionDish: offline.comboNoOptionThenOptionDish,
    orderEditItemTaxExpected: offline.offlineOrderEditItemTaxExpected,
    chineseMenuGroups: offline.chineseMenuGroups,
    noVoidItemStaffPassword: staffNoVoidItemPassword,
    managerPassword: staffManagerPassword,
  };
}
