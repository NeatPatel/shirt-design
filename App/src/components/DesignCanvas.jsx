import { useEffect, useState, useRef } from 'react';
import styles from './designcanvas.module.scss';
import { Container } from 'react-bootstrap';
import { useWindowSize } from '../components/useWindowSize.jsx';
import shirt from '../assets/shirt.svg';
import { Canvas, FabricImage, Rect } from 'fabric';

function DesignCanvas() {
    const canvasRef = useRef(null);
    const [ canvas, setCanvas ] = useState(null);

    let pasteShape;

    // Undo/Redo Variables
    let currentState;
    let undoStates = [];
    let redoStates = [];

    // Buttons/Elements
    let redoButton;
    let undoButton;
    let clearButton;
    let uploadButton;
    let uploadSrc;

    const { windowWidth, windowHeight } = useWindowSize();
    // Basically says: if the window height > window width, scale down (otherwise regular size)
    const canvasWidth = ((windowHeight) > (windowWidth) ? (windowWidth * 0.75) : (windowHeight * 0.65));
    const canvasHeight = ((windowHeight) > (windowWidth) ? (windowWidth * 0.75) : (windowHeight * 0.65));

    // Create Canvas
    useEffect(() => {
        const canvasInstance = new Canvas(canvasRef.current);

        setCanvas(canvasInstance);

        return () => {
           canvasInstance.dispose();
        };
    }, []);

    // Change Canvas and contents based on screen size
    useEffect(() => {
        if(canvas) {
            canvas.setWidth(canvasWidth);
            canvas.setHeight(canvasHeight);
            canvas.calcOffset();

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
        if(canvas) {
            setEditorIds();

            // Disable Group Selection
            canvas.selection = false;

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
    }, [canvas]);
    
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

    async function uploadImage() {
        if(uploadSrc.value) {
            const img = await FabricImage.fromURL(uploadSrc.value);
            img.scaleToWidth(100);
            canvas.add(img);
            canvas.requestRenderAll();
            save();
        }
    }

    async function loadBgImg() {
        const img = await FabricImage.fromURL(shirt);
        img.scaleToWidth(canvasWidth);
        canvas.add(img);
        canvas.backgroundColor = "#ffffff";
        
        let shape = canvas.item(canvas.size() - 1);
        canvas.remove(shape);
        canvas.clipPath = shape;
        canvas.clipPath.fixed = true;
        canvas.requestRenderAll();
    }

    function setEditorIds() {
        redoButton = document.getElementById("redo");
        undoButton = document.getElementById("undo");
        clearButton = document.getElementById("clear");
        uploadButton = document.getElementById("uploadButton");
        uploadSrc = document.getElementById("uploadSrc");
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
            fill: "#111111",
            width: 150,
            height: 100
        });

        canvas.add(rect);
        canvas.requestRenderAll();
        save();
    };

    return (<>
        <Container fluid className={styles.canvasDiv + " m-auto d-flex"}>
            <div style={{backgroundColor: "#dddddd"}} className={styles.img + " m-auto d-flex justify-content-center align-items-center"}>
                <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
            </div>
        </Container>
        <button onClick={addRect}>Width: {windowWidth} and Height: {windowHeight} </button>
    </>);
}

export default DesignCanvas;