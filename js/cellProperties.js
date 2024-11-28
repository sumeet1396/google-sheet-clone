import { addressBar } from "./grid.js";
import { setSheetDB, getSheetDB } from './state.js';

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// storage
// let sheetDB = [];

function initializeSheetDB(rows, cols) {
    console.log({rows, cols})
    const sheetDB = []
    for (let i = 0; i < rows; i++) {
        let sheetRows = []
        console.log("LOOP")
        for (let j = 0; j < cols; j++) {
            let cellProps = {
                bold: false,
                italic: false,
                underline: false,
                alignment: 'left',
                fontFamily: 'monospace',
                fontSize: '14',
                fontColor: '#000000',
                BGcolor: '#000000'
    
            }
            sheetRows.push(cellProps)
        }
        console.log({sheetRows})
        sheetDB.push(sheetRows)
    }
    console.log({sheetDB})
    setSheetDB(sheetDB);
}

function decodeRIDCIDFromAddress(address) {
    // address -> "A1"
    let rid = Number(address.slice(1) - 1); // "1" -> 0
    let cid = Number(address.charCodeAt(0)) - 65; // "A" -> 65
    return [rid, cid];
}

function getCellAndCellProp(address) {
    let sheetDB = getSheetDB()
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    console.log({rid, cid, sheetDB})
    // Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function handleToolbarClick(e) {
    let action = e.target.dataset.action; // Get action type (e.g., 'bold', 'italic')
    if (!action) return; // Ignore clicks outside toolbar buttons

    let address = addressBar.value; // Current cell address
    let [cell, cellProp] = getCellAndCellProp(address);

    switch (action) {
        case "bold":
            cellProp.bold = !cellProp.bold;
            cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
            e.target.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
            break;
        case "italic":
            cellProp.italic = !cellProp.italic;
            cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
            e.target.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
            break;
        case "underline":
            cellProp.underline = !cellProp.underline;
            cell.style.textDecoration = cellProp.underline ? "underline" : "none";
            e.target.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
            break;
        // Add more cases as needed
        default:
            console.warn(`Unknown action: ${action}`);
    }
}

// Attach event listeners dynamically
function setupCellEventListeners() {
    // Toolbar event listener
    const toolbar = document.querySelector(".toolbar");
    toolbar.addEventListener("click", handleToolbarClick);

    // Delegate cell click events
    const cellsContainer = document.querySelector(".cells-cont");
    cellsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("cell")) {
            let rid = e.target.getAttribute("rid");
            let cid = e.target.getAttribute("cid");
            let address = `${String.fromCharCode(65 + Number(cid))}${Number(rid) + 1}`;
            addressBar.value = address;
        }
    });
}

export { initializeSheetDB, setupCellEventListeners };