import type { OfflinePosState } from './offline-pos-state.js';

export function renderOfflinePosHome(_state: OfflinePosState): string {
  return `<!doctype html>
<html lang="en">
  <body>
    <main data-testid="pos-home">
      <button data-testid="home-togo">Togo</button>
      <button data-testid="home-recall">Recall</button>
      <button data-testid="home-admin">Admin</button>
      <input data-testid="employee-password" type="password" />
      <button data-testid="employee-password-save">Save</button>
    </main>
  </body>
</html>`;
}
