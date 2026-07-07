# order-page.spec.ts live/headless 调试记录

## 范围

- 文件：`tests/stage0/order-page.spec.ts`
- 模式：live、headless、本机服务 `http://127.0.0.1:22080`
- 执行策略：单条用例逐个运行；失败用例最多 5 次尝试。
- 编译验证：`npx tsc --noEmit` 已通过。

## 已通过

本轮继续后新增通过：

1. POS-37804 无 NOTE 权限员工给 Combo 子菜加 Note 时应提示并可经理授权录入
2. POS-34873 无 Void Printed Item 权限时删除 Hold 打印菜需经理密码且删除成功

上轮已新增通过：

1. POS-35660 自动合并同菜时小数数量菜添加两个 Global Option 应拆行并保持总额
2. POS-22640 自定义 Delivery 订单保存后 Recall 打印应显示 Reprint 并生成三份输出
3. POS-36286 Delivery 填写客户信息进入点单页后点击 Exit 应回到首页
4. POS-36255 菜名和 Number 相同时点单搜索应只返回一个结果
5. POS-43827 中文模式按首字母搜索应返回配置的中文菜名
6. POS-43956 Combo 保存后 Recall 编辑应能替换子菜
7. POS-42060 必选 KDS Category 未满足时保存应停留点单页并自动跳转
8. POS-42958 KDS Category 未勾选限制折扣时 20% 整单加收应为 2.00
9. POS-42097 点单页 Category 应展示配置的 POS Name 且点单后显示原菜名
10. POS-42061 套餐可调子菜支持改价且固定子菜不支持改价

## 仍失败或阻塞

| # | 用例 | 尝试次数 | 当前失败原因 / 阻塞点 | 已尝试方案 | 需要确认 |
|---|---:|---:|---|---|---|
| 1 | 点单加小费平分订单后合并子单应恢复完整小费金额 | 5 | 合并子单后订单详情上下文不稳定，最终读取 `#ododTips` 超时。 | 修正 Recall 卡片选择；补充分单保存后的等待；调整合单后进入详情路径。 | 需要确认 live 合单后的详情入口和小费展示位置是否有固定 DOM 合约。 |
| 2 | POS-36254 按菜分单后编辑子单折扣界面应展示子单整单金额 | 5 | live 折扣弹窗 Whole Order 行展示 `$16.00`，用例期望子单 `$8.00`。 | 修正子单选择与折扣弹窗读取；确认实际弹窗展示的是母单 Whole Order 行。 | 需要产品确认当前 live 行为是否应展示子单金额。 |
| 3 | POS-22657 自定义订单类型应计入 Report Overview 净销售额 | 5 | 第二次进入 Report 的 passcode 弹层识别/提交不稳定，流程卡在报表权限入口。 | Delivery 自定义入口后重置语言；补充 Report passcode prompt 识别；尝试多个 passcode DOM。 | 需要确认本机 live 报表入口权限、账号和 passcode 弹层 DOM。 |
| 4 | 切换 POS 和 EMENU 菜单模式后搜索应返回对应菜品 | 5 | 后台无法稳定进入或定位 `Menu Mode` 设置项。 | 读取后台设置入口；尝试通过现有设置页选择 POS/EMENU 模式。 | 需要确认 live 后台 Menu Mode 的真实配置入口或是否可用 API 设置。 |
| 5 | Modify Global Option 修改数量为 5 和 0 后右侧应继续展示 Modify 区域 | 2 | live 在 Global Option 数量改为 5 后右侧直接回到菜单/Category 区域，并非仅归零后消失。 | 重跑确认；检查 `setGlobalOptionListCount()` 是从 Global Option count 入口打开数字键盘，未发现点错主菜 Count。 | 需要确认产品预期：改数量后是否应继续停留 Modify 区域。 |
| 6 | Modify Global Option 连续 Reduce 到 0 后右侧应继续展示 Modify 区域 | 2 | live 在初始设置 count 后 Modify 区域已消失，后续 Reduce 场景无法满足当前断言。 | 重跑确认；和上一条行为一致。 | 同上，需要确认产品预期。 |
| 7 | POS-43823 Combo 无 Option 子菜返回主菜后仍可选择普通菜 Option | 5 | API 能创建动态 `ComboOptionTest_*`，但 live 前台分类格和搜索都不展示该动态 combo。 | 增加首页刷新；尝试静态 `QuickComboTest` fallback；确认静态 combo 与用例语义不匹配；改为搜索动态 combo；最终抛出明确错误。 | 需要确认动态菜单创建后 POS 前台的同步/发布机制，或提供稳定 live combo fixture。 |
| 8 | POS-35325 无 Void Printed Item 权限时减少 Delay 打印菜到 0 需经理密码且删除成功 | 5 | 权限提示、经理授权、Void Reason、通知厨房确认均已走通；live 保存后保留 `(1Voided)` 审计行，当前最后一次仍按全部可见行读到 2。 | 改为 SOAP 移除员工 `1` 的 `VOID_PRINTED_ITEM` 权限；显式选择已打印行；处理保存触发的 Void Reason 和通知厨房确认；新增未 Void 行数读取，但最后一次运行仍失败。 | 需要确认该场景断言应统计全部可见行还是仅未 Void 行；如按未 Void 行，需重新运行验证修正后的计数。 |

## 本轮已修复要点

- `staffSamples.noNote.id` 与 `staffSamples.noVoidPrintedItem.id` 改为 live 实际员工名 `1`。
- `POS-37804` 改为通过 `AdminStaffClient`/SOAP 移除并恢复 NOTE 权限，避免 Admin UI 设置不落地。
- `POS-34873/POS-35325` 改为通过 `AdminStaffClient`/SOAP 移除 `VOID_PRINTED_ITEM` 权限，避免 Admin Staff 页面入口不稳定。
- Recall 编辑后显式选择已打印订单行，避免误删未打印菜。
- 保存已打印菜删除时处理 Void Reason 和 “notify kitchen about void dishes” 二次确认。
- 新增未 Void 行数读取方法，用于区分 live 保留的审计行。

## 需要金将军确认的环境/数据问题

1. 动态创建菜单数据后 POS 前台不展示的同步或发布机制。
2. Modify Global Option 改数量或归零后是否应继续显示 Modify 区域。
3. POS-35325 中 `(1Voided)` 审计行是否应计入“删除后剩余菜品行数”。
4. 分单折扣弹窗应展示母单金额还是子单金额。
5. Report 二次进入时的 passcode 弹层真实 DOM 和权限策略。
