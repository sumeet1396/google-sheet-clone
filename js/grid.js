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
    const addressColFragment = document.createDocumentFragment();
    const addressRowFragment = document.createDocumentFragment();
    const cellsFragment = document.createDocumentFragment();

    for (let i = 0; i < rows; i++) {
        const addressCol = document.createElement("div");
        addressCol.className = "address-col";
        addressCol.innerText = i + 1;
        addressColFragment.appendChild(addressCol);
    }

    for (let i = 0; i < cols; i++) {
        const addressRow = document.createElement("div");
        addressRow.className = "address-row";
        addressRow.innerText = String.fromCharCode(65 + i);
        addressRowFragment.appendChild(addressRow);
    }

    for (let i = 0; i < rows; i++) {
        const rowCont = document.createElement("div");
        rowCont.className = "row-cont";

        for (let j = 0; j < cols; j++) {
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

    addressColCont.appendChild(addressColFragment);
    addressRowCont.appendChild(addressRowFragment);
    cellsCont.appendChild(cellsFragment);
};

export {
    gridSetup,
    rows,
    cols,
    addressBar
}