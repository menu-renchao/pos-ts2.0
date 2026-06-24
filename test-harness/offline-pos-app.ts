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
      <div data-testid="login-toast" role="status"></div>
    </main>
    <script>
      const passwordInput = document.querySelector('[data-testid="employee-password"]');
      const saveButton = document.querySelector('[data-testid="employee-password-save"]');
      const toast = document.querySelector('[data-testid="login-toast"]');
      saveButton.addEventListener('click', () => {
        if (passwordInput.value === '9890') {
          toast.textContent = 'Failed to login';
          passwordInput.value = '';
          passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
          return;
        }
        toast.textContent = '';
        document.body.dataset.employeeContext = 'accepted';
      });
    </script>
  </body>
</html>`;
}
