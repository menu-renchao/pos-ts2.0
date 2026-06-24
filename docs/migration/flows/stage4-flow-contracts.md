# Stage4 Flow Contracts

These contracts gate migration for all active source rows under `stage4/*.py`.

## CRM Rights Card Pricing Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage4/test_crm_rights_card.py | TestCrmRightsCard | member purchase rights card, custom combo price with rights card, seasoning pricing, order copy retains rights pricing, merged order restores/applies original item pricing | tests/stage4/crm-rights-card.spec.ts | `CrmRightsCardFlow.purchaseRightsCard`, `CrmRightsCardFlow.applyRightsCardPricing`, `CrmRightsCardFlow.verifyRightsPricingAfterCopyOrMerge` |

### Preconditions

- CRM member, rights card, benefit rule, combo, seasoning, and original-price samples are typed.
- Rights-card purchase and entitlement state are represented by CRM client adapters.
- Copy/merge operations follow POS UI flows and do not directly mutate DB state.

### Steps

1. Create or select CRM member.
2. Purchase or attach rights card.
3. Create order with regular item, combo, option, or seasoning scenario.
4. Apply copy, merge, or price restoration operation when required.
5. Read line-item original price, rights price, discount amount, and final totals.

### Expected Assertions

- Rights card purchase succeeds and entitlement is visible.
- Custom combo and seasoning prices use rights-card pricing rules.
- Copied orders retain rights pricing when source requires it.
- Merged orders restore or apply original item pricing according to source cases.
- Numeric totals remain consistent after rights-card pricing.

### Page Responsibilities

- `PosCrmPage` owns member/rights card operations in POS.
- `OrderDishesPage` owns item/combo/seasoning selection and price reads.
- `SplitOrderPage` or transfer flow pages own copy/merge operations.
- `RecallPage` owns post-copy/merge order state reads.

### Client/Data Responsibilities

- `StubCrmRightsCardClient` owns card purchase, entitlement, and pricing rules.
- `StubCrmRewardClient` owns related member benefit interactions.
- `StubPosOrderClient` owns copy/merge order graph state.
- `test-data/crm/members.ts` owns member and rights-card samples.
- `test-data/pos/dishes.ts` owns combo/seasoning/original-price samples.

### Stub Behavior

- Stub rights-card pricing is deterministic and item-scoped.
- Stub copy/merge calls recalculate rights pricing only through explicit flow/client methods.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| API | Rights card entitlement and pricing need CRM response-field contracts | Add typed CRM rights card client and contract tests |
| data | Live rights card programs require seeded CRM configuration | Define setup/cleanup strategy |
| selector | Rights-card purchase and pricing UI selectors need DOM confirmation | Confirm selectors or request `data-testid` |

## Paging And Calling Completion Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage4/test_paging.py | TestPagingPage | combinatorial search, paging/calloff on order card, auto complete order, complete all orders, POS refresh calling page | tests/stage4/paging.spec.ts | `PagingFlow.searchOrders`, `PagingFlow.callAndCallOffOrder`, `PagingFlow.autoCompleteExpiredOrders`, `PagingFlow.completeAllReadyOrders`, `PagingFlow.refreshCallingPage` |

### Preconditions

- Orders are created and sent/ready through POS/KDS flows.
- Paging status, order number, customer/table, ready state, and timeout samples are typed.
- Auto-complete time rules are represented through settings or typed client state.

### Steps

1. Create or seed orders in paging-relevant state.
2. Open Paging page through POS UI.
3. Apply combined search filters when required.
4. Execute call, call-off, complete-one, complete-all, auto-complete, or refresh action.
5. Read paging order cards and calling page state.

### Expected Assertions

- Combined search returns the intended orders.
- Call/call-off actions update order card and calling display status.
- Auto-complete moves orders to completed after configured timeout.
- Complete-all changes all ready orders to completed.
- Refresh updates calling page data without losing valid orders.

### Page Responsibilities

- `PagingPage` owns paging filters, order cards, call/call-off/complete controls, and status reads.
- `CallerPage` owns calling display refresh and order display reads.
- `OrderDishesPage`, `KdsPage`, and `RecallPage` own upstream order creation/status when required.

### Client/Data Responsibilities

- `StubPosOrderClient` owns order paging state.
- `StubPagingClient` owns paging/calling display state when introduced.
- `StubPosAdminSettingsClient` owns timeout/auto-complete settings.
- `test-data/pos/reports.ts` or dedicated paging data owns search and timeout samples.

### Stub Behavior

- Stub paging filters operate on deterministic in-memory orders.
- Stub auto-complete advances only through explicit simulated time or flow action.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| time | Auto-complete requires controllable time or live wait strategy | Add simulated time contract or scoped live smoke |
| multi-surface | Calling display and paging page may be separate surfaces | Add multi-page fixture and environment config |
| selector | Paging cards/filters/actions need stable DOM selectors | Confirm selectors or request `data-testid` |

## Cloud Wait List Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage4/test_cloud_wait_list.py | commented source only | source tests are currently commented and therefore not active matrix rows | tests/stage4/cloud-wait-list.spec.ts | `CloudWaitListFlow` methods are not enabled until source tests are restored or replaced |

### Preconditions

- No active `def test_*` rows are currently generated from `stage4/test_cloud_wait_list.py` because the source file is commented out.
- Do not create active migrated specs for commented-only source behavior unless the source is restored or a product owner approves replacement coverage.
- If reactivated, wait-list customer, queue, table, SMS/call, and cloud sync samples must be typed.

### Steps When Reactivated

1. Create or seed cloud wait-list entry.
2. Sync entry to POS wait-list surface.
3. Seat, call, cancel, update, or complete the wait-list entry according to source behavior.
4. Read POS and cloud-side wait-list state.

### Expected Assertions When Reactivated

- Wait-list entry fields match between cloud and POS.
- Status transitions such as call, seat, cancel, and complete are reflected on both surfaces.
- Queue ordering and customer data remain consistent.

### Page Responsibilities

- `CloudWaitListPage` owns cloud wait-list controls and reads when introduced.
- POS wait-list or table pages own POS-side seating and status reads.

### Client/Data Responsibilities

- `StubCloudWaitListClient` owns cloud queue state when introduced.
- Dedicated wait-list test data owns customer, party, queue, and status samples.

### Stub Behavior

- Stub wait-list sync mirrors cloud entries into POS-visible records deterministically.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| source-disabled | Source tests are commented out and not active matrix rows | Restore source or define approved replacement cases |
| cloud-sync | Live cloud wait-list requires cloud API/environment setup | Add typed cloud wait-list client and environment config |
| selector | Wait-list pages need DOM confirmation | Confirm selectors or request `data-testid` |
