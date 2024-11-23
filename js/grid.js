let sheetRows = 100;
let sheetCols = 26;


const grid = document.querySelector(".grid-container");
let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");

const addListenerForAddressBarDisplay = (cell, i, j) => {
    cell.addEventListener("click", (e) => {
        let rowID = i+1;
        let colID = String.fromCharCode(65 + j);
        addressBar.value = `${colID}${rowID}`;
    })
}

const setGridRows = (start = 0, rows) => {
    const addressColFragment = document.createDocumentFragment();
    for (let i = start; i < rows; i++) {
        const addressCol = document.createElement("div");
        addressCol.className = "address-col";
        addressCol.innerText = i + 1;
        addressColFragment.appendChild(addressCol);
    }

    addressColCont.appendChild(addressColFragment);
}

const setGridCols = (start = 0, cols) => {
    const addressRowFragment = document.createDocumentFragment();
    for (let i = start; i < cols; i++) {
        const addressRow = document.createElement("div");
        addressRow.className = "address-row";
        addressRow.innerText = String.fromCharCode(65 + i);
        addressRowFragment.appendChild(addressRow);
    }

    addressRowCont.appendChild(addressRowFragment);
}

const setGridCells = (start = 0, rows, cols) => {
    const cellsFragment = document.createDocumentFragment();
    
    for (let i = start; i < rows; i++) {
        const rowCont = document.createElement("div");
        rowCont.className = "row-cont";

        for (let j = start; j < cols; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.contentEditable = "true";
            cell.spellcheck = false;

            cell.setAttribute("rid", i);
            cell.setAttribute("cid", j);

            rowCont.appendChild(cell);
            addListenerForAddressBarDisplay(cell, i, j);
        }
        cellsFragment.appendChild(rowCont);
    }

    cellsCont.appendChild(cellsFragment);
}

const gridSetup = () => {
    setGridRows(0, sheetRows);
    setGridCols(0, sheetCols);
    setGridCells(0, sheetRows, sheetCols);  
};

const generateCols = () => {
    if (sheetRows <= 300) {
        const start = sheetRows;
        sheetRows = start + 100
        setGridRows(start, sheetRows)
        setGridCols(0, sheetCols)
        setGridCells(0, sheetRows, sheetCols);  
    }
}

export {
    gridSetup,
    grid,
    generateCols
}