
export function createPalette(container) {
    const overlay = container.append('div').attr('class', 'kbar-overlay');
    const modal = overlay.append('div').attr('class', 'kbar-modal');
    const input = modal.append('input').attr('class', 'kbar-input').attr('placeholder', 'Type a command...');
    const list = modal.append('div').attr('class', 'kbar-list');

    return {
        input,
        overlay,

        render: (state) => {
            const items = list.selectAll('.kbar-item').data(state.filteredActions, d => d.id);

            items.exit().remove();

            const enter = items.enter()
             .append('div')
             .attr('class', 'kbar-item')

            enter.append('div').attr('class', 'kbar-title');
            enter.append('div').attr('class', 'kbar-desc');

            const allItems = enter.merge(items);

            allItems.select('kbar-title').text(d => d.title);
            allItems.select('kbar-desc').text(d => d.description);

            if (state.filteredActions.length > 0) {
                const activeNode = allItems.filter((d, i) => i === state.selectedIndex).node();
                if (activeNode) activeNode.scrollIntoView({ block: 'nearest' });
            }

        }
    }
}