import { kbarRegistry } from './registry.js';
import { createKbarState } from './state.js';
import { createPalette } from './palette.js';

export function initKbar(context) {
  let palette, stateManager;

  const open = () => {
    // Initialization: Get fresh actions and build the UI
    const actions = kbarRegistry(context)();
    stateManager = createKbarState(actions);
    palette = createPalette(d3.select('body'));

    // Handle typing
    palette.input.on('input', (e) => {
      const newState = stateManager.setSearch(e.target.value);
      palette.render(newState);
    });

    // Handle keyboard navigation
    window.addEventListener('keydown', handleKeys);
    palette.render(stateManager.getState());
  };

  const handleKeys = (e) => {
    const state = stateManager.getState();

    if (e.key === 'ArrowDown') {
      palette.render(stateManager.moveSelection(1));
    } else if (e.key === 'ArrowUp') {
      palette.render(stateManager.moveSelection(-1));
    } else if (e.key === 'Enter') {
      // Execute the action of the currently highlighted item!
      const activeAction = state.filteredActions[state.selectedIndex];
      if (activeAction) {
        activeAction.onSelect();
        close();
      }
    } else if (e.key === 'Escape') {
      close();
    }
  };

  const close = () => {
    if (palette) palette.overlay.remove();
    window.removeEventListener('keydown', handleKeys);
  };

  // The Global Shortcut: Cmd+K or Ctrl+K
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      open();
    }
  });
}