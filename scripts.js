//Getting inputs
const gridContainer = document.getElementById("gridContainer");
const rangeInput = document.getElementById("rangeInput");
const colorInput = document.getElementById("colorInput");
const opacityInput = document.getElementById("opacityInput");
const eraser = document.getElementById("eraser");

let drag = false;
let defaultBrush = colorInput.value;
let defaultGrid = rangeInput.value;
let defaultOpacity = opacityInput.value;


//Main functions
function generateCell(num) {
    for (let i = 0; i < num; i++) {
        const row = document.createElement("div");
        gridContainer.appendChild(row);
        row.id = "row";

        for (let j = 0; j < num; j++) {
            const cell = document.createElement("div");
            row.appendChild(cell);
            cell.id = "cell";

            cell.addEventListener("mousedown", ()=> {
                drag = true;
            });
    
            cell.addEventListener("mouseup", () => {
                drag = false;
            });
          
            cell.addEventListener("mousemove", ()=> {
                if (drag) {
                    const rgbaColor = hexToRGBA(defaultBrush, defaultOpacity);
                    cell.style.backgroundColor = rgbaColor;
                };
            });

            gridContainer.addEventListener("mouseleave", ()=> {
                drag = false;
            });
        }
    }
};

function setDefaultBrush(color) {
    defaultBrush = color;
};

function hexToRGBA(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

//Event listeners
rangeInput.addEventListener("input", ()=> {
    gridContainer.innerHTML = "";
    generateCell(rangeInput.value);
});

colorInput.addEventListener("input", ()=> {
    setDefaultBrush(colorInput.value);
});

eraser.addEventListener("click", ()=> {
    setDefaultBrush("white");
});

opacityInput.addEventListener("input", ()=> {
    defaultOpacity = opacityInput.value;
});

//Start-up function
generateCell(defaultGrid);

