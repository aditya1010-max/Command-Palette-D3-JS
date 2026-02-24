/**
 * The Registry is a factory function. 
 * It returns a list of all possible actions available in the current context.
 */
export function kbarRegistry(context) {
  return function() {
    // We start with an empty list and build it based on app state
    const actions = [];

    // 1. ADD POINT ACTION
    actions.push({
      id: 'add-point',
      title: 'Add Point',
      description: 'Drop a point on the map',
      // The logic to execute when this is picked
      onSelect: () => context.enter('mode-add-point') 
    });

    // 2. CONTEXTUAL ACTION: Only show if something is selected
    const selection = context.selectedIDs ? context.selectedIDs() : [];
    if (selection.length > 0) {
      actions.push({
        id: 'clear-selection',
        title: 'Clear Selection',
        description: `Deselect ${selection.length} items`,
        onSelect: () => context.enter('mode-browse')
      });
    }

    // 3. CORE UTILITY
    actions.push({
      id: 'save',
      title: 'Save Changes',
      description: 'Upload your edits to OSM',
      onSelect: () => context.save()
    });

    return actions;
  };
}