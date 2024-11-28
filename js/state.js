const state = {
    sheetDB: []
};

const reactiveState = new Proxy(state, {
    set(target, key, value) {
        target[key] = value;
        console.log(`State updated: ${key} =`, value);
        // Dispatch custom event to notify modules
        document.dispatchEvent(new CustomEvent('stateChange', { detail: { key, value } }));
        return true;
    }
});

export {
    state,
    reactiveState
}