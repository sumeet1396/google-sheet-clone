import { gridSetup }from "./js/grid.js";
import { initializeSheetDB, setupCellEventListeners } from "./js/cellProperties.js";

window.onload = () => {
    gridSetup();
    initializeSheetDB(100, 26)
    setupCellEventListeners();
}