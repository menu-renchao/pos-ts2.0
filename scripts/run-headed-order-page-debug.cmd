@echo off
cd /d "D:\mansuper\pos py-ts\pos-ts2.0"
npm test -- tests/stage0/order-page.spec.ts -g "无删菜权限用户输入正确密码后可完成删菜并在 Recall 展示 Voided" --headed --retries=0 --workers=1 --reporter=line
pause
