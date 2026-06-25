# TestId → 真实前端选择器映射

## 可直接映射的元素（有稳定 ID）

### 首页 (loginPage)
| testId | 真实前端选择器 | 说明 |
|--------|---------------|------|
| `pos-home` | `#loginPage` | 登录页面容器 |
| `welcome-text` | `#welcome` | 欢迎文本 |
| `employee-password` | `#pwipt` | PIN 密码输入框 |
| `employee-password-save` | `#ds` | PIN 确认按钮 |
| `home-togo` | `#togobt` | To Go 按钮（动态生成） |
| `home-dine-in` | `#dineinbt` | Dine In 按钮（动态生成） |
| `home-pickup` | `#pickupbt` | Pickup 按钮（动态生成） |
| `home-recall` | `#recallbt` | Recall 按钮（动态生成） |
| `home-cash-in-out` | `#cashinbt` | Cash In/Out 按钮（动态生成） |
| `home-admin` | `#adminsbt` | Admin 按钮（动态生成） |
| `home-join-member` | `#joinmemberbt` | Join Member 按钮（动态生成） |
| `home-reservation` | `#rsvtbt` | Reservation 按钮（动态生成） |
| `home-delivery` | `#deliverybt` | Delivery 按钮（动态生成） |
| `home-report` | `#reportbt` | Report 按钮（动态生成） |
| `home-check-in` | `#checkinbt` | Check In 按钮（动态生成） |
| `edit-home-functions` | `#editlayoutbx` | 编辑布局按钮 |
| `edit-save` | `#oklayoutbx` | 保存布局 |
| `edit-cancel` | `#cancellayoutbx` | 取消编辑 |

### 订单页 (orderDishes)
| testId | 真实前端选择器 | 说明 |
|--------|---------------|------|
| `order-page` | `#orderDishes` | 订单页容器 |
| `order-menu-group` | `#odgrpbx` | 菜单组容器 |
| `order-menu-category` | `#odcatrg` | 分类容器 |
| `order-menu-item` | `#oddishes` | 菜品容器 |
| `order-info` | `#odinfooutbx` | 订单信息 |
| `order-item-count` | `#odsmypnum` | 菜品数量 |
| `order-tax` | 动态生成 | 税额（需确认） |
| `order-subtotal` | 动态生成 | 小计（需确认） |
| `order-reward` | 动态生成 | Reward（需确认） |

### Recall 页
| testId | 真实前端选择器 | 说明 |
|--------|---------------|------|
| `recall-page` | `#recall` | Recall 页容器 |
| `recallpageinner` | `#recallpageinner` | Recall 内容区 |

### Admin 页
| testId | 真实前端选择器 | 说明 |
|--------|---------------|------|
| `admin-page` | `#admin` | Admin 页容器 |
| `adminbxs` | `#adminbxs` | Admin 内容区 |

### 其他页面
| testId | 真实前端选择器 | 说明 |
|--------|---------------|------|
| `inventory-page` | `#inventory` | 库存页 |
| `report-page` | `#reportpage` | 报表页 |
| `reservation-page` | `#reservationpage` | 预约页 |
| `delivery-page` | `#deliver` | 配送页 |
| `cash-in-out-page` | `#cashinpage` | Cash In/Out 页 |
| `checkin-page` | `#checkinpage` | 打卡页 |

## 无法直接映射的元素（动态生成，无稳定 ID）

### 订单操作按钮
| testId | 说明 | 建议替代方案 |
|--------|------|-------------|
| `order-save` | 保存订单 | `#obtbx` 内的保存按钮 |
| `order-settle` | 结算 | `#obtbx` 内的结算按钮 |
| `order-exit` | 退出 | `#obtbx` 内的退出按钮 |
| `order-send-kitchen` | 送厨 | `#obtbx` 内的送厨按钮 |
| `order-search` | 搜索 | `#schipticon` |
| `order-open-food` | Open Food | 动态生成 |
| `order-modify` | Modify | 动态生成 |
| `order-reduce-item` | 减菜 | 动态生成 |
| `order-void-item` | 删菜 | 动态生成 |

### 菜品/分类（完全动态）
| testId | 说明 | 建议替代方案 |
|--------|------|-------------|
| `order-line-item` | 订单行 | `#odr` 内的行元素 |
| `order-item-name` | 菜品名 | 动态生成 |
| `order-item-price` | 菜品价 | 动态生成 |
| `order-option` | Option | `#oddishoptbxlvl1` 内的按钮 |
| `order-sub-option` | Sub Option | `#oddishoptbxlvl2` 内的按钮 |

### Admin 设置（全部动态生成）
| testId | 说明 | 建议替代方案 |
|--------|------|-------------|
| 所有 `admin-*` | Admin 设置 | 无稳定选择器，需动态生成 |
| 所有 `admin-staff-*` | Staff 管理 | 无稳定选择器 |

### Recall 操作（全部动态生成）
| testId | 说明 | 建议替代方案 |
|--------|------|-------------|
| 所有 `recall-*` | Recall 操作 | 无稳定选择器 |
| 所有 `split-*` | 分单操作 | `#splitPanelContainer` 内 |

### CRM/配送/预约（全部动态生成）
| testId | 说明 | 建议替代方案 |
|--------|------|-------------|
| 所有 `crm-*` | CRM 操作 | 无稳定选择器 |
| 所有 `delivery-*` | 配送信息 | `#deliver` 内的表单 |
| 所有 `reservation-*` | 预约操作 | `#reservationpage` 内 |

### 结算（全部动态生成）
| testId | 说明 | 建议替代方案 |
|--------|------|-------------|
| 所有 `settle-*` | 结算操作 | `#pplcardbx` 内 |

## 统计

- **可直接映射**: ~30 个（约 7%）
- **无法映射**: ~426 个（约 93%）

## 结论

真实前端（pos_front）是一个 jQuery Mobile 应用，**没有为测试自动化设计**。绝大多数 UI 元素是通过 JavaScript 动态生成的，没有稳定的 ID 或属性。

**建议方案**:
1. **方案 A（推荐）**: 在真实前端中添加 `data-testid` 属性
2. **方案 B**: 使用混合选择器（`.or()` 模式）
3. **方案 C（当前）**: 仅映射有稳定 ID 的元素，其余保持 `getByTestId()`
