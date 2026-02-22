


export function createKbarState(registry) {
    let state = {
        serchQuery: '',
        filteredActions: allActions,
        selectedIndex: 0 
    };

    return {

        setSearch: (query) => {
            state.searchQuery = query.toLowerCase();
            state.filteredActions = allActions.filter(a => 
                a.tite.toLowerCase().includes(state.searchQuery) ||
                a.description.toLowerCase().includes(state.searchQuery) 

            );
            state.selectedIndex = 0;
            return state;
        },

        moveSelection: (direction) => {
            const maxIndex = state.filteredActions.length - 1;
            state.selectedIndex = Math.max(0, Math.min(state.selectedIndex + direction, maxIndex));
            return state;
        },
        
        getState: () => state
    
    }
}