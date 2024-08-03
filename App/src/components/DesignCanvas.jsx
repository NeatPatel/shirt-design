import { useEffect, useState, useRef } from 'react';
import styles from './designcanvas.module.scss';
import { Container } from 'react-bootstrap';
import { useWindowSize } from '../components/useWindowSize.jsx';
import shirtF from '../assets/shirtFront.svg';
import shirtB from '../assets/shirtBack.svg';
import shirtL from '../assets/shirtLeft.svg';
import shirtR from '../assets/shirtRight.svg';
import { Canvas, FabricImage, Rect } from 'fabric';

function DesignCanvas() {
    const canvasRefF = useRef(null);
    const canvasRefB = useRef(null);
    const canvasRefL = useRef(null);
    const canvasRefR = useRef(null);

    // F, B, L, R means Front, Back, Left, Right respectively
    const [ canvasF, setCanvasF ] = useState(null);
    const [ canvasB, setCanvasB ] = useState(null);
    const [ canvasL, setCanvasL ] = useState(null);
    const [ canvasR, setCanvasR ] = useState(null);
    let canvas;
    let canvasView = "F";

    let pasteShape;

    // Undo/Redo Variables
    let undoF = [];
    let redoF = [];
    let undoB = [];
    let redoB = [];
    let undoL = [];
    let redoL = [];
    let undoR = [];
    let redoR = [];

    let currentState;
    let undoStates = undoF;
    let redoStates = redoF;

    // Buttons/Elements
    let redoButton;
    let undoButton;
    let clearButton;
    let uploadButton;
    let uploadSrc;
    let divF;
    let divB;
    let divL;
    let divR;

    const { windowWidth, windowHeight } = useWindowSize();
    // Basically says: if the window height > window width, scale down (otherwise regular size)
    const canvasWidth = ((windowHeight) > (windowWidth) ? (windowWidth * 0.75) : (windowHeight * 0.65));
    const canvasHeight = ((windowHeight) > (windowWidth) ? (windowWidth * 0.75) : (windowHeight * 0.65));

    // Create Canvases
    useEffect(() => {
        setEditorIds();

        const canvasInstanceF = new Canvas(canvasRefF.current);
        const canvasInstanceB = new Canvas(canvasRefB.current);
        const canvasInstanceL = new Canvas(canvasRefL.current);
        const canvasInstanceR = new Canvas(canvasRefR.current);

        setCanvasF(canvasInstanceF);
        setCanvasB(canvasInstanceB);
        setCanvasL(canvasInstanceL);
        setCanvasR(canvasInstanceR);

        return () => {
           canvasInstanceF.dispose();
           canvasInstanceB.dispose();
           canvasInstanceL.dispose();
           canvasInstanceR.dispose();
        };
    }, []);

    // Change Canvas and contents based on screen size
    useEffect(() => {
        if(canvasF) canvas = canvasF;

        if(canvas) {
            setCanvasSize();

            setEditorIds();

            const setup = () => {
                try {
                    loadBgImg();
                } catch(err) {
                    console.log("ERROR: Background Image Not Loaded");
                }
            };

            setTimeout(() => setup(), 100);
        }
    }, [canvasWidth, canvasHeight]);

    // Initialize Canvas Settings
    useEffect(() => {
        if(canvasF) canvas = canvasF;

        if(canvas) {
            setEditorIds();

            // Disable Group Selection
            canvasF.selection = false;
            canvasB.selection = false;
            canvasL.selection = false;
            canvasR.selection = false;

            // Create Background Image
            const setup = () => {
                try {
                    loadBgImg();

                    save();
                } catch(err) {
                    console.log("ERROR: Background Image Not Loaded");
                }
            };

            setup();
            // End Create Background Image

            // keydown Events
            const onKeyDown = async (e) => {
                if(e.keyCode == 8 || e.keyCode == 46) {
                    // Press "Backspace" or "Delete"
                    canvas.remove(canvas.getActiveObject());
                    canvas.requestRenderAll();
                    save();
                } else if(e.keyCode == 27) {
                    // Press "Esc"
                    canvas.discardActiveObject();
                    canvas.requestRenderAll();
                } else if(e.keyCode == 67) {
                    // Press "C"
                    if(canvas.getActiveObject()) pasteShape = await canvas.getActiveObject().clone();

                    if(pasteShape) {
                        pasteShape.set({
                            left: (pasteShape.left + 3),
                            top: (pasteShape.top + 3)
                        });
                    }
                } else if(e.keyCode == 86) {
                    // Press "V"
                    if(pasteShape) {
                        let pasted = await pasteShape.clone();
                        canvas.add(pasted);
                        canvas.setActiveObject(pasted);
                        canvas.requestRenderAll();
                        pasteShape.set({
                            left: (pasteShape.left + 3),
                            top: (pasteShape.top + 3)
                        });
                        save();
                    }
                } else if(e.keyCode == 88) {
                    // Press "X"
                    if(canvas.getActiveObject()) {
                        pasteShape = canvas.getActiveObject();
                        canvas.remove(pasteShape);
                        canvas.requestRenderAll();
                        save();
                    }
                }
            }
            // End keydown Events

            // Undo/Redo Events
            canvas.on("object:modified", () => save());
            // End Undo/Redo Events

            // Event Listeners
            window.addEventListener("keydown", onKeyDown);
            undoButton.addEventListener("click", () => replayState(undoStates, redoStates, redoButton, undoButton));
            redoButton.addEventListener("click", () => replayState(redoStates, undoStates, undoButton, redoButton));
            clearButton.addEventListener("click", clearObjects);
            uploadButton.addEventListener("click", uploadImage);

            window.addEventListener("beforeunload", (e) => {
                if(undoStates.length == 0) return;
                e.preventDefault();
            });
            // End Event Listeners

            // Remove Event Listeners (if any)
            return () => {
                undoButton.removeEventListener("click", () => replayState(undoStates, redoStates, redoButton, undoButton));
                redoButton.removeEventListener("click", () => replayState(redoStates, undoStates, undoButton, redoButton));
                clearButton.removeEventListener("click", clearObjects);
                uploadButton.addEventListener("click", uploadImage);
                window.removeEventListener("keydown", onKeyDown);
            }
        }
    }, [canvasF]);
    
    function replayState(playStack, saveStack, onButton, offButton) {
        console.log();

        saveStack.push(currentState);
        currentState = playStack.pop();
    
        // Temporary turn off to prevent rapid click
        onButton.disabled = true;
        offButton.disabled = true;
        
        canvas.clear();
        canvas.loadFromJSON(currentState, () => {
            canvas.setWidth(canvasWidth);
            canvas.setHeight(canvasHeight);
            canvas.calcOffset();

            canvas.requestRenderAll();
            if(canvas.clipPath) {
                canvas.clipPath = null;
                loadBgImg();
            }
        });

        loadBgImg();

        onButton.disabled = false;
        if(playStack.length) {
            offButton.disabled = false;
        }
    }
    
    function save() {
        redoStates = [];
        redoButton.disabled = true;
        
        if(currentState) {
            undoStates.push(currentState);
            undoButton.disabled = false;
        }

        currentState = JSON.stringify(canvas);
    }

    function uploadImage() {
        if(uploadSrc.value) {
            let fReader = new FileReader();

            let fileType = uploadSrc.files[0].type;
            if(fileType == "image/apng" || fileType == "image/png" || fileType == "image/avif" || fileType == "image/jpg" || fileType == "image/svg" || fileType == "image/gif" || fileType == "image/webp") fReader.readAsDataURL(uploadSrc.files[0]);
            else alert("Invalid File Type");

            fReader.onload = async (e) => {
                const img = await FabricImage.fromURL(e.target.result);
                img.scaleToWidth(100);
                img.set({
                    left: 100,
                    top: 50
                });
                canvas.add(img);
                canvas.requestRenderAll();
                save();
            };
        }
    }

    async function loadBgImg() {
        // Front
        const imgF = await FabricImage.fromURL(shirtF);
        imgF.scaleToWidth(canvasWidth);
        canvasF.add(imgF);
        canvasF.backgroundColor = "#ffffff";
        
        let shape = canvasF.item(canvasF.size() - 1);
        canvasF.remove(shape);
        canvasF.clipPath = shape;
        canvasF.clipPath.fixed = true;
        canvasF.requestRenderAll();

        // Back
        const imgB = await FabricImage.fromURL(shirtB);
        imgB.scaleToWidth(canvasWidth);
        canvasB.add(imgB);
        canvasB.backgroundColor = "#ffffff";
        
        shape = canvasB.item(canvasB.size() - 1);
        canvasB.remove(shape);
        canvasB.clipPath = shape;
        canvasB.clipPath.fixed = true;
        canvasB.requestRenderAll();

        // Left
        const imgL = await FabricImage.fromURL(shirtL);
        imgL.scaleToWidth(canvasWidth);
        canvasL.add(imgL);
        canvasL.backgroundColor = "#ffffff";
        
        shape = canvasL.item(canvasL.size() - 1);
        canvasL.remove(shape);
        canvasL.clipPath = shape;
        canvasL.clipPath.fixed = true;
        canvasL.requestRenderAll();

        // Right
        const imgR = await FabricImage.fromURL(shirtR);
        imgR.scaleToWidth(canvasWidth);
        canvasR.add(imgR);
        canvasR.backgroundColor = "#ffffff";
        
        shape = canvasR.item(canvasR.size() - 1);
        canvasR.remove(shape);
        canvasR.clipPath = shape;
        canvasR.clipPath.fixed = true;
        canvasR.requestRenderAll();
    }

    function setCanvasSize() {
        canvasF.setWidth(canvasWidth);
        canvasF.setHeight(canvasHeight);
        canvasF.calcOffset();

        canvasB.setWidth(canvasWidth);
        canvasB.setHeight(canvasHeight);
        canvasB.calcOffset();

        canvasL.setWidth(canvasWidth);
        canvasL.setHeight(canvasHeight);
        canvasL.calcOffset();

        canvasR.setWidth(canvasWidth);
        canvasR.setHeight(canvasHeight);
        canvasR.calcOffset();
    }

    function setEditorIds() {
        redoButton = document.getElementById("redo");
        undoButton = document.getElementById("undo");
        clearButton = document.getElementById("clear");
        uploadButton = document.getElementById("uploadButton");
        uploadSrc = document.getElementById("uploadSrc");
        divF = document.getElementById("canvasF");
        divB = document.getElementById("canvasB");
        divL = document.getElementById("canvasL");
        divR = document.getElementById("canvasR");

        divF.style.display = (canvasView == "F") ? "inline" : "none";
        divB.style.display = (canvasView == "B") ? "inline" : "none";
        divL.style.display = (canvasView == "L") ? "inline" : "none";
        divR.style.display = (canvasView == "R") ? "inline" : "none";
    }

    function clearObjects() {
        if(canvas.getObjects().length) save();
        
        canvas.forEachObject((obj) => {
            canvas.remove(obj);
        });
    }

    const addRect = () => {
        const rect = new Rect({
            left: 100,
            top: 50,
            fill: "#ff000011",
            width: 150,
            height: 100
        });

        canvas.add(rect);
        canvas.requestRenderAll();
        save();
    };

    return (<>
        <Container fluid className={styles.canvasDiv + " m-auto d-flex"}>
            <div style={{backgroundColor: "#dddddd"}} className={styles.img + " m-auto d-flex justify-content-center align-items-center rounded"}>
                <div id="canvasF">
                    <canvas ref={canvasRefF} width={canvasWidth} height={canvasHeight} />
                </div>
                <div id="canvasB">
                    <canvas ref={canvasRefB} width={canvasWidth} height={canvasHeight} />
                </div>
                <div id="canvasL">
                    <canvas ref={canvasRefL} width={canvasWidth} height={canvasHeight} />
                </div>
                <div id="canvasR">
                    <canvas ref={canvasRefR} width={canvasWidth} height={canvasHeight} />
                </div>
            </div>
        </Container>
        <button onClick={addRect}>Width: {windowWidth} and Height: {windowHeight} </button>
    </>);
}

export default DesignCanvas;