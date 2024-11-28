let sheetDB = [];

export function getSheetDB() {
    return sheetDB;
}

export function setSheetDB(newData) {
    sheetDB = newData;
    console.log("sheetDB updated:", sheetDB);
}