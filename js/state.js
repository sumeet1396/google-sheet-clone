// let sheetDB = [];

// export function getSheetDB() {
//     return sheetDB;
// }

// export function setSheetDB(newData) {
//     sheetDB = newData;
//     console.log("sheetDB updated:", sheetDB);
// }

export const state = {
    sheetDB: []
};

// Create a reactive proxy
export const reactiveState = new Proxy(state, {
    set(target, key, value) {
        target[key] = value;
        console.log(`State updated: ${key} =`, value);
        // Dispatch custom event to notify modules
        document.dispatchEvent(new CustomEvent('stateChange', { detail: { key, value } }));
        return true;
    }
});