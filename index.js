import { gridSetup, grid, generateCols }from "./js/grid.js";

window.onload = () => {
    gridSetup()
}

console.log({grid})
let lastScrollTop = 0;

grid.addEventListener('scroll', () => {
    const currentScrollTop = grid.scrollTop;

    // Check if scrolling down
    if (currentScrollTop > lastScrollTop) {
        const scrollPosition = grid.scrollTop + grid.clientHeight;
        const bottomPosition = grid.scrollHeight;

        // Trigger when within 100px from the bottom
        if (bottomPosition - scrollPosition <= 100) {
            generateCols();
            return;
        }
    }

    // Update lastScrollTop to current position after the scroll event
    lastScrollTop = currentScrollTop;
});