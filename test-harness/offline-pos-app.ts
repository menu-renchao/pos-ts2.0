import type { OfflinePosState } from './offline-pos-state.js';

export function renderOfflinePosHome(_state: OfflinePosState): string {
  return `<!doctype html>
<html lang="en">
  <body>
    <main data-testid="pos-home">
      <button data-testid="edit-home-functions">Edit</button>
      <button data-testid="more-functions">More</button>
      <section data-testid="home-function-cards"></section>
      <section data-testid="hidden-function-cards"></section>
      <button data-testid="edit-main-add" hidden>Main</button>
      <button data-testid="edit-more-add" hidden>More</button>
      <button data-testid="edit-save" hidden>Save Layout</button>
      <button data-testid="edit-cancel" hidden>Cancel</button>
      <button data-testid="home-togo">Togo</button>
      <button data-testid="home-recall">Recall</button>
      <button data-testid="home-admin">Admin</button>
      <input data-testid="employee-password" type="password" />
      <button data-testid="employee-password-save">Save</button>
      <div data-testid="login-toast" role="status"></div>
      <div data-testid="home-toast" role="status"></div>
    </main>
    <script>
      const sessionMoveError = "Can't move this button to/from hide area";
      let mainFunctions = ['Dine In', 'Drawer', 'To Go', 'Delivery'];
      let hiddenFunctions = ['Admin', 'Session'];
      let draftMainFunctions = [...mainFunctions];
      let draftHiddenFunctions = [...hiddenFunctions];
      let selectedFunction = null;

      const mainList = document.querySelector('[data-testid="home-function-cards"]');
      const hiddenList = document.querySelector('[data-testid="hidden-function-cards"]');
      const editButton = document.querySelector('[data-testid="edit-home-functions"]');
      const mainAddButton = document.querySelector('[data-testid="edit-main-add"]');
      const moreAddButton = document.querySelector('[data-testid="edit-more-add"]');
      const saveEditButton = document.querySelector('[data-testid="edit-save"]');
      const cancelEditButton = document.querySelector('[data-testid="edit-cancel"]');
      const homeToast = document.querySelector('[data-testid="home-toast"]');
      const passwordInput = document.querySelector('[data-testid="employee-password"]');
      const saveButton = document.querySelector('[data-testid="employee-password-save"]');
      const toast = document.querySelector('[data-testid="login-toast"]');

      function renderFunctionCards() {
        mainList.innerHTML = '';
        hiddenList.innerHTML = '';
        draftMainFunctions.forEach((name) => {
          const card = document.createElement('button');
          card.dataset.testid = 'home-function-card';
          card.textContent = name;
          card.addEventListener('click', () => selectFunction(name, 'main'));
          mainList.appendChild(card);
        });
        draftHiddenFunctions.forEach((name) => {
          const card = document.createElement('button');
          card.dataset.testid = 'hidden-function-card';
          card.textContent = name;
          card.addEventListener('click', () => selectFunction(name, 'hidden'));
          hiddenList.appendChild(card);
        });
      }

      function setEditMode(isEditing) {
        mainAddButton.hidden = !isEditing;
        moreAddButton.hidden = !isEditing;
        saveEditButton.hidden = !isEditing;
        cancelEditButton.hidden = !isEditing;
      }

      function moveFunctionBetweenAreas(source, target) {
        if (source.name === 'Session' || target.name === 'Session') {
          homeToast.textContent = sessionMoveError;
          return;
        }
        const sourceList = source.area === 'main' ? draftMainFunctions : draftHiddenFunctions;
        const targetList = target.area === 'main' ? draftMainFunctions : draftHiddenFunctions;
        const sourceIndex = sourceList.indexOf(source.name);
        const targetIndex = targetList.indexOf(target.name);
        sourceList[sourceIndex] = target.name;
        targetList[targetIndex] = source.name;
        selectedFunction = null;
        renderFunctionCards();
      }

      function selectFunction(name, area) {
        homeToast.textContent = '';
        const nextFunction = { name, area };
        if (!selectedFunction) {
          selectedFunction = nextFunction;
          return;
        }
        moveFunctionBetweenAreas(selectedFunction, nextFunction);
      }

      editButton.addEventListener('click', () => {
        draftMainFunctions = [...mainFunctions];
        draftHiddenFunctions = [...hiddenFunctions];
        selectedFunction = null;
        homeToast.textContent = '';
        setEditMode(true);
        renderFunctionCards();
      });

      saveEditButton.addEventListener('click', () => {
        mainFunctions = [...draftMainFunctions];
        hiddenFunctions = [...draftHiddenFunctions];
        selectedFunction = null;
        setEditMode(false);
        renderFunctionCards();
      });

      cancelEditButton.addEventListener('click', () => {
        draftMainFunctions = [...mainFunctions];
        draftHiddenFunctions = [...hiddenFunctions];
        selectedFunction = null;
        setEditMode(false);
        renderFunctionCards();
      });

      mainAddButton.addEventListener('click', () => {
        if (selectedFunction?.name === 'Session') {
          homeToast.textContent = sessionMoveError;
        }
      });

      moreAddButton.addEventListener('click', () => {
        if (selectedFunction?.name === 'Session') {
          homeToast.textContent = sessionMoveError;
        }
      });

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
      renderFunctionCards();
    </script>
  </body>
</html>`;
}
