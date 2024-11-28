import { addressBar } from "./grid.js";
import { reactiveState } from './state.js';


const activeColorProp = "#d1d8e0";
const inactiveColorProp = "#ecf0f1";
const topbarClickActions = ['bold', 'italic', 'underline', 'leftAlign', 'centerAlign','rightAlign'] 
const topbarChangeAction = ['fontSize', 'fontFamily', 'fontColor', 'BGcolor'];

const initializeSheetDB = (rows, cols) => {
    const sheetDB = []
    for (let i = 0; i < rows; i++) {
        let sheetRows = []
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
        sheetDB.push(sheetRows)
    }
    reactiveState.sheetDB = sheetDB;
}

const decodeRIDCIDFromAddress = (address) => {
    // address -> "A1"
    let rid = Number(address.slice(1) - 1); // "1" -> 0
    let cid = Number(address.charCodeAt(0)) - 65; // "A" -> 65
    return [rid, cid];
}

const getCellAndCellProp = (address) => {
    let sheetDB = reactiveState.sheetDB;
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    // Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

const handleToolbarClick = (e) => {
    let action = e.target.dataset.action;
    const elm = e.target;
    if (!action) return;

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
        case "leftAlign":
            cellProp.alignment = 'left'; 
            cell.style.textAlign = cellProp.alignment;
            // e.target.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
            break;
        case "centerAlign":
            cellProp.alignment = 'center'; 
            cell.style.textAlign = cellProp.alignment;
            // e.target.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
            break;
        case "rightAlign":
            cellProp.alignment = 'right'; 
            cell.style.textAlign = cellProp.alignment;
            // e.target.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
            break;
        default:
            console.warn(`Unknown action: ${action}`);
    }

    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
    fontColor.value = cellProp.fontColor;
    BGcolor.value = cellProp.BGcolor;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
}

const handleToolbarChange = (e) => {
    const action = e.target.dataset.action;
    const elm = e.target; 

    if (!action) return;

    let address = addressBar.value; 
    let [cell, cellProp] = getCellAndCellProp(address);

    switch (action) {
        case "fontSize":
            cellProp.fontSize = elm.value; 
            cell.style.fontSize = cellProp.fontSize + "px";
            elm.value = cellProp.fontSize;
            break;
        case "fontFamily":
            cellProp.fontFamily = elm.value; 
            cell.style.fontFamily = cellProp.fontFamily;
            elm.value = cellProp.fontFamily;
            break;
        case "fontColor":
            cellProp.fontColor = elm.value;
            cell.style.color = cellProp.fontColor;
            elm.value = cellProp.fontColor;
            break;
        case "BGcolor":
            cellProp.BGcolor = elm.value;
            cell.style.backgroundColor = cellProp.BGcolor;
            elm.value = cellProp.BGcolor;
            break;
        default:
            console.warn(`Unknown action: ${action}`);
    }
}

const handleTopbarState = (address) => {
    let [cell, cellProp] = getCellAndCellProp(address)
    topbarClickActions.map((elm) => {
        document.querySelector(`[data-action="${elm}"]`).style.backgroundColor = cellProp?.[elm] ? activeColorProp : inactiveColorProp
    })

    topbarChangeAction.map((elm) => {
        document.querySelector(`[data-action="${elm}"]`).value = cellProp?.[elm]
    })
}

// Attach event listeners dynamically
const setupCellEventListeners = () => {
    // Toolbar event listener
    const toolbar = document.querySelector(".toolbar");
    toolbar.addEventListener("click", handleToolbarClick);
    toolbar.addEventListener("change", handleToolbarChange);

    // Delegate cell click events
    const cellsContainer = document.querySelector(".cells-cont");
    cellsContainer.addEventListener("click", (e) => {
        let address = addressBar.value; 
        const [rid, cid] = decodeRIDCIDFromAddress(address)
    
        let col = document.querySelectorAll(".address-col");
        let row = document.querySelectorAll(".address-row");
        col = col[rid];
        row = row[cid];

        const activeCells = document.querySelectorAll(".active-cell");

        if (activeCells.length >= 2) {
            activeCells[0].classList.remove("active-cell");
            activeCells[1].classList.remove("active-cell");
        }

        //get active cell
        const element = document.querySelector(".cell-border");

        // remove active cell class from previous active cell
        if (element) element.classList.remove("cell-border");
        if (e.target.classList.contains("cell")) {
            e.target.classList.add('cell-border')
            col.classList.add("active-cell"); 
            row.classList.add("active-cell"); 
            let rid = e.target.getAttribute("rid");
            let cid = e.target.getAttribute("cid");
            let address = `${String.fromCharCode(65 + Number(cid))}${Number(rid) + 1}`;
            addressBar.value = address;
            handleTopbarState(address)
        }
    });
}

export { initializeSheetDB, setupCellEventListeners };