let rows = 100;
let cols = 26;

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

const gridSetup = () => {
    // Create rows and columns in memory before appending to the DOM to reduce reflows
    const addressColFragment = document.createDocumentFragment();
    const addressRowFragment = document.createDocumentFragment();
    const cellsFragment = document.createDocumentFragment();

    // Create address column (1 to rows)
    for (let i = 0; i < rows; i++) {
        const addressCol = document.createElement("div");
        addressCol.className = "address-col";
        addressCol.innerText = i + 1;
        addressColFragment.appendChild(addressCol);
    }

    // Create address row (A to Z)
    for (let i = 0; i < cols; i++) {
        const addressRow = document.createElement("div");
        addressRow.className = "address-row";
        addressRow.innerText = String.fromCharCode(65 + i);
        addressRowFragment.appendChild(addressRow);
    }

    // Create cell grid
    for (let i = 0; i < rows; i++) {
        const rowCont = document.createElement("div");
        rowCont.className = "row-cont";

        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.contentEditable = "true";
            cell.spellcheck = false;

            // Set custom attributes for identification
            cell.setAttribute("rid", i);
            cell.setAttribute("cid", j);

            rowCont.appendChild(cell);
            addListenerForAddressBarDisplay(cell, i, j); // Event listener for each cell
        }
        cellsFragment.appendChild(rowCont);
    }

    // Append fragments to DOM in one go
    addressColCont.appendChild(addressColFragment);
    addressRowCont.appendChild(addressRowFragment);
    cellsCont.appendChild(cellsFragment);
};

export {
    gridSetup
}