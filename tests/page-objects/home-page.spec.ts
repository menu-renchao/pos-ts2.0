import { test, expect } from '@playwright/test';

import { PosHomePage } from '../../pages/pos/home.page.js';

test.describe('POS 首页页面对象', () => {
  test('应等待 License 列表稳定后再选择可用授权', async ({ page }) => {
    test.setTimeout(10_000);

    await page.setContent(`
      <div id="skIptBx">
        <input id="sknm" value="" />
        <button id="skok" type="button" onclick="
          if (document.querySelector('#sknm').value === 'stable') {
            document.querySelector('#skIptBx').style.display = 'none';
          }
        ">OK</button>
        <div id="license-list">
          <div class="skOneRow" onclick="document.querySelector('#sknm').value = 'transient'">PC Not in use transient</div>
        </div>
      </div>
      <input id="pwipt" />
      <script>
        setTimeout(() => {
          document.querySelector('#license-list').innerHTML =
            '<div class="skOneRow" onclick="document.querySelector(\\'#sknm\\').value = \\'stable\\'">PC Not in use stable</div>';
        }, 350);
      </script>
    `);

    await new PosHomePage(page).chooseAvailableLicense();

    await expect(page.locator('#skIptBx')).toBeHidden();
    await expect(page.locator('#sknm')).toHaveValue('stable');
  });

  test('应在 License 弹窗稳定关闭后才完成授权选择', async ({ page }) => {
    test.setTimeout(12_000);

    await page.setContent(`
      <div id="skIptBx">
        <input id="sknm" value="" />
        <button id="skok" type="button" onclick="
          window.confirmCount = (window.confirmCount || 0) + 1;
          document.querySelector('#skIptBx').style.display = 'none';
          if (window.confirmCount === 1) {
            setTimeout(() => {
              document.querySelector('#sknm').value = '';
              document.querySelector('#skIptBx').style.display = 'block';
            }, 200);
          }
        ">OK</button>
        <div class="skOneRow" onclick="document.querySelector('#sknm').value = 'stable'">PC Not in use stable</div>
      </div>
      <input id="pwipt" />
    `);

    await new PosHomePage(page).chooseAvailableLicense();

    await expect(page.locator('#skIptBx')).toBeHidden();
    await expect(page.locator('#sknm')).toHaveValue('stable');
  });

  test('应只选择可见的 License 行', async ({ page }) => {
    test.setTimeout(10_000);

    await page.setContent(`
      <div id="skIptBx">
        <input id="sknm" value="" />
        <button id="skok" type="button" onclick="
          if (document.querySelector('#sknm').value === 'visible') {
            document.querySelector('#skIptBx').style.display = 'none';
          }
        ">OK</button>
        <div class="skOneRow" style="display: none" onclick="document.querySelector('#sknm').value = 'hidden'">
          PC Not in use hidden
        </div>
        <div class="skOneRow" onclick="document.querySelector('#sknm').value = 'visible'">
          PC Not in use visible
        </div>
      </div>
      <input id="pwipt" />
    `);

    await new PosHomePage(page).chooseAvailableLicense();

    await expect(page.locator('#skIptBx')).toBeHidden();
    await expect(page.locator('#sknm')).toHaveValue('visible');
  });

  test('应使用可见数字键盘输入 live PIN', async ({ page }) => {
    test.setTimeout(8_000);

    await page.setContent(`
      <input id="pwipt" readonly />
      <button id="ds" type="button">Save</button>
      <table id="numpanel" style="display: none">
        <tr><td onclick="document.querySelector('#pwipt').value += '1'">1</td></tr>
      </table>
      <table id="numpanel">
        <tr><td onclick="document.querySelector('#pwipt').value += '1'">1</td></tr>
      </table>
      <div id="floatcover2100" class="mycover" style="position: fixed; inset: 0;"></div>
    `);

    await new PosHomePage(page).inputLoginPassword('11');

    await expect(page.locator('#pwipt')).toHaveValue('11');
  });

  test('应在 PIN 输入后提交按钮已隐藏时继续流程', async ({ page }) => {
    test.setTimeout(8_000);

    await page.setContent(`
      <input id="pwipt" oninput="document.querySelector('#ds').style.display = 'none'; document.querySelector('#m4btbx').style.display = 'block';" />
      <div id="ds">Save</div>
      <div id="m4btbx" style="display: none">To Go</div>
    `);

    await new PosHomePage(page).inputLoginPassword('11');

    await expect(page.locator('#m4btbx')).toBeVisible();
  });

  test('应在 PIN 输入框已隐藏且首页入口可见时跳过密码输入', async ({ page }) => {
    test.setTimeout(8_000);

    await page.setContent(`
      <input id="pwipt" style="display: none" />
      <div id="m4btbx"><span>To Go</span></div>
    `);

    await new PosHomePage(page).inputLoginPassword('11');

    await expect(page.locator('#pwipt')).toBeHidden();
  });
});
