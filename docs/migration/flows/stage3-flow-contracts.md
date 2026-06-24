# Stage3 Flow Contracts

These contracts gate migration for all active source rows under `stage3/*.py`.

## Reporting And Audit Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage3/test_report.py | TestReport | void report date display | tests/stage3/report.spec.ts | `ReportingFlow.verifyVoidReportDate` |
| stage3/test_report_printpreview.py | TestReportPrintPreView | gift card reports, dine-in report naming, refund/void audit logs, attendance/cash reports, total report staff list, charge-as-tip, void report language, split/edit audit, move item audit, open drawer audit, delivery charge | tests/stage3/report-printpreview.spec.ts | `ReportingFlow.openReport`, `ReportingFlow.verifyPrintPreviewReport`, `ReportingFlow.verifyAuditLog`, `ReportingFlow.verifyStaffAndCashReports` |
| stage3/test_setting.py | TestSetting | cloud datahub, receipt 3.5 paid, open drawer, report/homepage unpaid interactions | tests/stage3/setting.spec.ts | `ReportingFlow.verifyDataHub`, `ReportingFlow.verifyReceiptAndDrawerAudit` |
| stage3/test_cloud_report.py | TestPosCloudReport | cloud report cases when active | tests/stage3/cloud-report.spec.ts | `CloudReportFlow.verifyCloudReportSummary` |

### Preconditions

- Report date, business date, order status, payment, refund, void, cash, attendance, and audit samples are typed.
- Report data setup is represented through client adapters, not direct DB calls from specs.
- Print-preview content is represented by structured reads or a print-preview adapter.

### Steps

1. Seed or create source-equivalent order/payment/refund/void/cash/attendance data.
2. Open target report or print preview through POS UI.
3. Apply source-specific filters, language, or report type.
4. Read report rows, totals, dates, audit log entries, and print-preview fields.

### Expected Assertions

- Report dates, order type names, totals, cash/tip/charge fields, and staff lists match source expectations.
- Audit log entries are present for refund, item edit, move item, open drawer, split/edit, and void scenarios.
- Print-preview content reflects source payment, gift card, delivery charge, and language cases.

### Page Responsibilities

- `ReportPage` owns POS report navigation, filters, rows, totals, and print-preview reads.
- `CloudReportPage` owns cloud report navigation and summary reads.
- `SettlementPage`, `CashInOutPage`, and `OrderDishesPage` own setup actions reached through UI.

### Client/Data Responsibilities

- `StubCloudReportClient` owns cloud report summary data.
- `StubPosDbClient` or `StubReportDataClient` owns report/audit fixtures in stub mode.
- `test-data/pos/reports.ts` owns report date ranges, totals, and expected rows.

### Stub Behavior

- Stub reports read from structured seeded records.
- Stub audit log generation is explicit in setup flow/client methods.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| DB | Report and audit data often rely on database state | Add typed report DB/client adapter contracts |
| print-preview | Print-preview content may render in browser/PDF/print subsystem | Define capture method and assertions |
| selector | Report grids and preview fields need stable selectors | Confirm selectors or request `data-testid` |

## Print And Receipt Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage3/test_print.py | TestPrint | charge-as-tip credit/cash, charge reminders, receipt footers/time/type, kitchen notes, togo item, phone/address/item on kitchen ticket, tip suggestions, void item style, resend selected items | tests/stage3/print.spec.ts | `PrintFlow.verifyReceipt`, `PrintFlow.verifyKitchenTicket`, `PrintFlow.verifyChargeReminder`, `PrintFlow.resendKitchenItems` |

### Preconditions

- Print settings, footer settings, charge reminder settings, kitchen-ticket settings, phone/address/customer data, and order samples are typed.
- Physical printer output is represented by a print-job adapter in first-round stub mode.
- Cases skipped in source remain `live-gap` until confirmed.

### Steps

1. Configure print/charge/receipt settings.
2. Create and settle/send source-equivalent order.
3. Trigger print, resend, reminder, or receipt action.
4. Read print job, preview, reminder, or ticket content.

### Expected Assertions

- Receipt totals, tip suggestions, footers, print time, order type, and language match expected values.
- Kitchen ticket contains expected note, phone, address, item quantity, togo marker, and void style.
- Charge reminder behavior changes according to open/closed settings and payment method.
- Resend prints only selected kitchen items.

### Page Responsibilities

- `SettlementPage`, `OrderDishesPage`, and `RecallPage` own print-triggering UI.
- `PrintPreviewPage` or `PrintJobClient` owns structured print output reads.

### Client/Data Responsibilities

- `StubPrintJobClient` owns printed receipt and kitchen ticket records.
- `StubPosAdminSettingsClient` owns receipt/reminder settings.
- `test-data/pos/payments.ts` and `test-data/pos/reports.ts` own receipt totals and expected print fields.

### Stub Behavior

- Stub print creates structured print records, not physical printer output.
- Stub reminder settings affect only explicit print/settlement flows.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| external-device | Physical printer output cannot be proven offline | Add print capture adapter or live printer fixture |
| timing | Printing time assertions require stable clock | Add controllable clock or tolerance contract |

## KDS, RDS, And Caller Sync Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage3/test_kds.py | TestKds | redo, whole-order operation, same item into different licenses, KDS status sync to POS/caller/recall, dish mode quantity, multi-KDS, void order display, timeout colors, KDS/RDS process mapping, combo subitem operation, large data, hold/split, meal prep time, auto-clear, order sorting, dish size merge, delete combo permission | tests/stage3/kds.spec.ts | `KdsFlow.redoCompletedOrder`, `KdsFlow.operateWholeOrder`, `KdsFlow.verifyStatusSync`, `KdsFlow.verifyMultiLicenseRouting`, `KdsFlow.verifyTimeoutColor`, `KdsFlow.verifyRdsMapping`, `KdsFlow.verifyAutoClearAndSorting` |

### Preconditions

- KDS/RDS licenses, printer routing, dish mode, timeout, process mapping, combo, and permission samples are typed.
- Order creation/sending follows POS UI flows.
- Large data cases use a stub data-volume marker or explicit live DB setup.

### Steps

1. Configure KDS/RDS routing and display mode.
2. Create/send source-equivalent order.
3. Operate KDS/RDS item or whole-order states.
4. Read KDS/RDS, POS Recall, and caller display state.
5. Validate timeout, sorting, routing, quantity merge, permission, and auto-clear behavior.

### Expected Assertions

- KDS/RDS state transitions match source expectations.
- POS Recall/caller display syncs KDS/RDS state correctly.
- Multi-license and printer routing do not cross-contaminate displays.
- Timeout colors, meal-prep time, sorting, auto-clear, and quantity merge match expected rules.
- Permission-restricted combo deletion behaves as source specifies.

### Page Responsibilities

- `KdsPage` owns KDS/RDS display, item cards, operation controls, and reads.
- `RecallPage` owns POS-side state reads.
- `CallerPage` owns caller display reads.
- `OrderDishesPage` owns send/hold/split source actions.

### Client/Data Responsibilities

- `StubKdsConfigClient` owns routing, license, display mode, and timeout config.
- `StubPosOrderClient` owns kitchen state transitions.
- `test-data/pos/dishes.ts` owns combo, option, size, and quantity samples.

### Stub Behavior

- Stub KDS/RDS state transitions are deterministic and event-like.
- Stub large-data case verifies behavior against a synthetic marker, not 500k live rows.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| multi-device | KDS/RDS/caller involve multiple browser/device surfaces | Define multi-page fixture and stable environment URLs |
| DB-volume | Large data case requires real volume/performance setup | Add live DB fixture or keep scoped live-gap |
| selector | KDS card/status/color selectors need DOM confirmation | Confirm selectors or request `data-testid` |

## Table And Dine-In Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage3/test_table_order.py | TestTableOrder | empty/in-use table, area switching, duration, order id/create time/party/server/price/status/name, drag/resize table, pickup modify guest, multi-order on table, table move item without login | tests/stage3/table-order.spec.ts | `TableOrderFlow.openTable`, `TableOrderFlow.verifyTableCard`, `TableOrderFlow.modifyTableLayout`, `TableOrderFlow.operateMultipleOrdersOnTable` |

### Preconditions

- Table area, table number, party size, server, guest, and order samples are typed.
- Drag/resize cases have viewport and pointer interaction requirements explicit.
- Table state is reset between tests through stub client or UI cleanup.

### Steps

1. Open table page from POS home.
2. Select or create table order with source data.
3. Modify table area/layout/order/guest state where required.
4. Read table card fields and order details.

### Expected Assertions

- Empty/in-use status, area, duration, ID, create time, party, server, price, status, and guest name match source behavior.
- Drag and resize produce persisted table layout changes.
- Multi-order and move-item behaviors preserve table/order state.

### Page Responsibilities

- `TablePage` owns table list/map, table card reads, drag/resize actions, and table selection.
- `OrderDishesPage` owns order edits entered from table context.

### Client/Data Responsibilities

- `StubPosOrderClient` owns table/order state.
- `test-data/pos/reports.ts` or dedicated table data owns table samples.

### Stub Behavior

- Stub table layout changes are persisted in memory per test.
- Stub order duration uses deterministic time samples.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| pointer | Drag/resize behavior needs browser visual verification | Add Playwright interaction and screenshot checks |
| data | Live table layout may differ by environment | Define seeded table layout |

## Settings, CDS, And Payment Display Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage3/test_setting.py | TestSetting | auto logout, batch unpaid, clockout check, UI color, checkout print, component name, semi-paid edit, cash tip hiding, auto send, open drawer, fast-food redirect, E-Menu Pro entry | tests/stage3/setting.spec.ts | `SettingsFlow.configureAppSetting`, `SettingsFlow.verifySemiPaidEditSetting`, `SettingsFlow.verifyAutoSendSetting`, `SettingsFlow.verifyAdminEntryVisibility` |
| stage3/test_y_cds.py | TestCds | CDS credit/cash/backup pay, tip/sign/receipt combinations, recall payment paths, old CDS message paths, big tip, price/combo price, weight switch | tests/stage3/y-cds.spec.ts | `CdsFlow.payOnCds`, `CdsFlow.payRecallOrderOnCds`, `CdsFlow.verifyCdsTipSignReceiptMatrix`, `CdsFlow.verifyCdsPriceDisplay` |

### Preconditions

- App settings, component names, UI color, auto-send, semi-paid, cash tip, fast-food, and CDS payment display settings are typed.
- CDS payment matrix is data-driven through typed cases rather than copy-pasted spec bodies.
- CDS/old-CDS surfaces have environment config separate from POS home.

### Steps

1. Configure source-specific app or CDS setting.
2. Create or recall order.
3. Execute payment, tip, sign, print, backup-pay, or setting-triggered behavior.
4. Read POS, CDS, receipt, and recall state.

### Expected Assertions

- Settings change downstream behavior exactly where source expects it.
- Semi-paid edit behavior, auto-send, checkout print, open drawer, and component visibility are preserved.
- CDS payment matrix correctly reflects tip/sign/receipt/print combinations.
- CDS price, combo price, big tip, and weight-switch cases are traceable.

### Page Responsibilities

- `AdminPage` owns settings navigation and entry visibility.
- `CdsPage` owns CDS payment display, tip/sign/receipt controls, and reads.
- `SettlementPage`, `RecallPage`, and `OrderDishesPage` own POS-side payment/order state.

### Client/Data Responsibilities

- `StubPosAdminSettingsClient` owns app settings.
- `StubPosOrderClient` owns payment/order state.
- `test-data/pos/payments.ts` owns CDS payment matrix cases.

### Stub Behavior

- Stub CDS renders structured payment-display state from order/payment data.
- Stub settings are test-local and explicit.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| external-display | CDS/old-CDS are separate display surfaces | Add multi-page fixture and environment URLs |
| payment-device | Credit/sign flows may require hardware integration | Add simulator or mark scoped live-gap |
| selector | CDS controls and displays need DOM confirmation | Confirm selectors or request `data-testid` |
