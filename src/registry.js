// this registry is a factory function
//it returns a list of all possible actions availablein the currebt context

export function kbarRegistry() {
    return function(context) {
        // start with empty list amd build it up based on the context
        const actions = [];

        // add point action
        actions.push({
            id: 'addd-point',
            name: 'Add point',
            description: 'Add a point to the graph',
            onSeclect: () => useContext.enter('mode-add-point')
        });


        // contextual actions - only if something is selected 
        const selection = context.selectIDs ? context.selectIDs() : [];
        if (selection.length > 0) {
            actions.push({
                id: 'clear-selction',
                name: 'Clear selection',
                description: 'Clear the current selection',
                onSeclect: () => context.enter('mode-browse')
            });
        }

        // core utility
        actions.push({
            id: "save",
            name: 'Save changes',
            description: 'Save changes to the graph',
            onSeclect: () => context.save()
        });
        
        return actions;
    };
}