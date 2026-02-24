/**
 * State Manager: Handles the "Memory" of the palette.
 * It calculates which actions to show based on what the user types.
 */
export function createKbarState(allActions) {
  let state = {
    searchQuery: '',
    filteredActions: allActions,
    selectedIndex: 0 // Which item is highlighted for the arrow keys?
  };

  return {
    // Filter actions based on title or description
    setSearch: (query) => {
      state.searchQuery = query.toLowerCase();
      state.filteredActions = allActions.filter(a => 
        a.title.toLowerCase().includes(state.searchQuery) ||
        a.description.toLowerCase().includes(state.searchQuery)
      );
      state.selectedIndex = 0; // Reset highlight to top on search
      return state;
    },

    // Move the highlight up or down
    moveSelection: (direction) => {
      const count = state.filteredActions.length;
      // Formula to wrap around: (0 - 1 + 5) % 5 = 4 (moves from top to bottom)
      state.selectedIndex = (state.selectedIndex + direction + count) % count;
      return state;
    },

    getState: () => state
  };
}