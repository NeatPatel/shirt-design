import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from './designcanvas.module.scss';
import { Container } from 'react-bootstrap';
import shirtF from '../assets/shirtFront.svg';
import shirtB from '../assets/shirtBack.svg';
import shirtL from '../assets/shirtLeft.svg';
import shirtR from '../assets/shirtRight.svg';
import { Canvas, FabricImage, Rect } from 'fabric';

const DesignCanvas = forwardRef((props, ref) => {
    // F, B, L, R means Front, Back, Left, Right (respectively)
    const canvasRefF = useRef(null);
    const canvasRefB = useRef(null);
    const canvasRefL = useRef(null);
    const canvasRefR = useRef(null);

    // Set Canvas variables and current canvas View (default front)
    const [ canvasF, setCanvasF ] = useState(null);
    const [ canvasB, setCanvasB ] = useState(null);
    const [ canvasL, setCanvasL ] = useState(null);
    const [ canvasR, setCanvasR ] = useState(null);
    let canvasView = "F";
    let canvas;

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
    let undoStates = [];
    let redoStates = [];

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

    // Window Width and Height
    let { windowWidth, windowHeight } = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
    };

    // Basically says: if the window height > window width, scale down (otherwise regular size)
    let canvasWidth = ((windowHeight) > (windowWidth) ? (windowWidth * 0.75) : (windowHeight * 0.65));
    let canvasHeight = canvasWidth;
    
    // Base canvasWidth/Height values to reference
    let cBase = ((windowHeight) > (windowWidth) ? (1280 * 0.75) : (585 * 0.65));

    // Constant to scale sprite sizes by
    let scaleFactor = canvasWidth / cBase;

    // Public Methods for use in ShirtCanvas.jsx (the parent of this component)
    useImperativeHandle(ref, () => ({
        changeCanvasButton(newView) {
            changeCanvasView(newView);
        },
        updateActiveObject(objData) {
            const activeObj = canvas.getActiveObject();
            activeObj.set({
                scaleX: (parseFloat(objData.width) / activeObj.width),
                scaleY: (parseFloat(objData.height) / activeObj.height),
                left: parseFloat(objData.x),
                top: parseFloat(objData.y),
                opacity: parseFloat(objData.opacity),
                angle: parseFloat(objData.angle),
                flipX: (objData.flipX == "true"),
                flipY: (objData.flipY == "true")
            });
            if(objData.fill) activeObj.set({fill: objData.fill});
            canvas.discardActiveObject();
            canvas.setActiveObject(activeObj);
            canvas.requestRenderAll();
            save();
        }
    }));

    // Run necesities needed on any re-render
    useEffect(() => {
        // Reset HTML elements on editor
        setEditorIds();

        // Make sure canvas is set properly
        if(canvasView == "F") canvas = canvasF;
        else if(canvasView == "B") canvas = canvasB;
        else if(canvasView == "L") canvas = canvasL;
        else if(canvasView == "R") canvas = canvasR;
    });

    // Create Canvases
    useEffect(() => {
        // Create canvas instances based on the 4 canvas HTML elements
        const canvasInstanceF = new Canvas(canvasRefF.current);
        const canvasInstanceB = new Canvas(canvasRefB.current);
        const canvasInstanceL = new Canvas(canvasRefL.current);
        const canvasInstanceR = new Canvas(canvasRefR.current);

        // set States (causes a singular re-render)
        setCanvasF(canvasInstanceF);
        setCanvasB(canvasInstanceB);
        setCanvasL(canvasInstanceL);
        setCanvasR(canvasInstanceR);

        return () => {
            // Dispose when done
           canvasInstanceF.dispose();
           canvasInstanceB.dispose();
           canvasInstanceL.dispose();
           canvasInstanceR.dispose();
        };
    }, []);

    // Initialize Canvas Settings
    useEffect(() => {
        // Set canvas properly
        if(canvasView == "F" && canvasF) canvas = canvasF;
        else if(canvasView == "B" && canvasB) canvas = canvasB;
        else if(canvasView == "L" && canvasL) canvas = canvasL;
        else if(canvasView == "R" && canvasR) canvas = canvasR;

        // Initialize all canvas settings
        if(canvas) {
            setEditorIds();

            // Disable Group Selection
            canvasF.selection = false;
            canvasB.selection = false;
            canvasL.selection = false;
            canvasR.selection = false;

            // Create Background Image
            const setup = () => {
                loadBgImg();
            };

            setup();
            // End Create Background Image

            // keydown Events
            const onKeyDown = async (e) => {
                if(e.keyCode == 68) {
                    // Press "D"
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
                        scaleObject(pasted);
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

            // Canvas Events (one for each canvas)
            canvasF.on("object:modified", () => save());
            canvasB.on("object:modified", () => save());
            canvasL.on("object:modified", () => save());
            canvasR.on("object:modified", () => save());

            canvasF.on("selection:created", () => props.onObjSelected(canvasF.getActiveObject()));
            canvasB.on("selection:created", () => props.onObjSelected(canvasB.getActiveObject()));
            canvasL.on("selection:created", () => props.onObjSelected(canvasL.getActiveObject()));
            canvasR.on("selection:created", () => props.onObjSelected(canvasR.getActiveObject()));

            canvasF.on("selection:updated", () => props.onObjSelected(canvasF.getActiveObject()));
            canvasB.on("selection:updated", () => props.onObjSelected(canvasB.getActiveObject()));
            canvasL.on("selection:updated", () => props.onObjSelected(canvasL.getActiveObject()));
            canvasR.on("selection:updated", () => props.onObjSelected(canvasR.getActiveObject()));

            canvasF.on("selection:cleared", props.onObjUnselected);
            canvasB.on("selection:cleared", props.onObjUnselected);
            canvasL.on("selection:cleared", props.onObjUnselected);
            canvasR.on("selection:cleared", props.onObjUnselected);
            // End Canvas Events

            // Event Listeners
            window.addEventListener("keydown", onKeyDown);
            undoButton.addEventListener("click", undoEvent);
            redoButton.addEventListener("click", redoEvent);
            clearButton.addEventListener("click", clearObjects);
            uploadButton.addEventListener("click", uploadImage);

            const allLinks = document.querySelectorAll("a");

            allLinks.forEach((a) => {
                a.addEventListener("click", clickLink);
            });

            window.addEventListener("beforeunload", reloadEvent);

            window.addEventListener("resize", resizeEvent);
            // End Event Listeners

            // Remove Event Listeners (if any)
            return () => {
                undoButton.removeEventListener("click", undoEvent);
                redoButton.removeEventListener("click", redoEvent);
                clearButton.removeEventListener("click", clearObjects);
                uploadButton.removeEventListener("click", uploadImage);
                window.removeEventListener("keydown", onKeyDown);
                window.removeEventListener("resize", resizeEvent);
                allLinks.forEach((a) => {
                    a.removeEventListener("click", clickLink);
                });
                window.removeEventListener("beforeunload", reloadEvent);
            }
        }
    }, [canvasF, canvasB, canvasL, canvasR]);

    function reloadEvent(e) {
        if(undoStates == 0 && redoStates == 0 && undoF.length == 0 && redoF.length == 0 && undoB.length == 0 && redoB.length == 0 && undoL.length == 0 && redoL.length == 0 && undoR.length == 0 && redoR.length == 0) return;
        e.preventDefault();
    }

    function undoEvent() {
        replayState(undoStates, redoStates, redoButton, undoButton);
    }

    function redoEvent() {
        replayState(redoStates, undoStates, undoButton, redoButton);
    }

    function clickLink(e) {
        if(!(undoStates == 0 && redoStates == 0 && undoF.length == 0 && redoF.length == 0 && undoB.length == 0 && redoB.length == 0 && undoL.length == 0 && redoL.length == 0 && undoR.length == 0 && redoR.length == 0)) {
            if(confirm("You have unsaved changes, are you sure?")) {
                return;
            } else {
                e.preventDefault();
            }
        }
    }

    function resizeEvent() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        const oldScaleFactor = scaleFactor;

        canvasWidth = ((windowHeight) > (windowWidth) ? (windowWidth * 0.75) : (windowHeight * 0.65));
        canvasHeight = canvasWidth;

        cBase = ((windowHeight) > (windowWidth) ? (1280 * 0.75) : (585 * 0.65));
        // Temporarily change scaleFactor for scaling current items
        scaleFactor = (canvasWidth / cBase) / oldScaleFactor;

        canvasResize();

        // reset scaleFactor to normal
        scaleFactor = canvasWidth / cBase;
    }

    // Change Canvas and contents based on screen size
    const canvasResize = () => {
        // Set canvas properly after state change
        if(canvasView == "F" && canvasF) canvas = canvasF;
        else if(canvasView == "B" && canvasB) canvas = canvasB;
        else if(canvasView == "L" && canvasL) canvas = canvasL;
        else if(canvasView == "R" && canvasR) canvas = canvasR;

        // Recalculate canvas settings
        if(canvas) {
            setCanvasSize();

            setEditorIds();

            const setup = () => {
                loadBgImg();
            };

            setTimeout(() => setup(), 100);
        }
    };
    
    // Handling Undo/Redo Events
    function replayState(playStack, saveStack, onButton, offButton) {
        saveStack.push(currentState);
        currentState = playStack.pop();
    
        // Temporary turn off to prevent rapid click
        onButton.disabled = true;
        offButton.disabled = true;
        
        // Clear canvas, load the playStack state in
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

        // Ensure bg img is reset
        loadBgImg();

        // Reset undo/redo buttons
        onButton.disabled = false;
        if(playStack.length) {
            offButton.disabled = false;
        }
    }
    
    // save function
    // call for ALL canvas updates
    function save() {
        // Reset undo since new change made
        redoStates = [];
        redoButton.disabled = true;
        
        // If the currentState exists,
        // add it to undoStates
        if(currentState) {
            undoStates.push(currentState);
            undoButton.disabled = false;
        }

        // Initialize/redefine currentState
        currentState = JSON.stringify(canvas);

        // If there is an active object, update it
        if(canvas.getActiveObject()) {
            props.onObjSaved(canvas.getActiveObject());
        }
    }

    // Uploading a user image
    function uploadImage() {
        // Check if src exists
        if(uploadSrc.value) {
            // Implement FileReader API to read the file
            let fReader = new FileReader();

            let fileType = uploadSrc.files[0].type;
            if(fileType == "image/apng" || fileType == "image/png" || fileType == "image/avif" || fileType == "image/jpg" || fileType == "image/svg+xml" || fileType == "image/gif" || fileType == "image/webp") {
                fReader.readAsDataURL(uploadSrc.files[0]);
            } else {
                alert("Invalid File Type");
                return;
            }

            // Load the file if applicable
            fReader.onload = async (e) => {
                const img = await FabricImage.fromURL(e.target.result);
                img.scaleToWidth(100);
                img.set({
                    left: 100,
                    top: 50
                });
                scaleObject(img);
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.requestRenderAll();
                save();
            };
        }
    }

    // Load in the background image
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

        if(!currentState) save();
    }

    // Set the canvas size accordingly
    function setCanvasSize() {
        // One for each canvas
        canvasF.setWidth(canvasWidth);
        canvasF.setHeight(canvasHeight);

        canvasF.forEachObject((obj) => {
            scaleObject(obj);
        });

        canvasF.calcOffset();

        canvasB.setWidth(canvasWidth);
        canvasB.setHeight(canvasHeight);

        canvasB.forEachObject((obj) => {
            scaleObject(obj);
        });

        canvasB.calcOffset();

        canvasL.setWidth(canvasWidth);
        canvasL.setHeight(canvasHeight);

        canvasL.forEachObject((obj) => {
            scaleObject(obj);
        });

        canvasL.calcOffset();

        canvasR.setWidth(canvasWidth);
        canvasR.setHeight(canvasHeight);

        canvasR.forEachObject((obj) => {
            scaleObject(obj);
        });

        canvasR.calcOffset();
    }

    // Scale an object according to window size
    function scaleObject(obj) {
        obj.set({
            scaleX: obj.scaleX * scaleFactor,
            scaleY: obj.scaleY * scaleFactor
        });
    }

    // Set the HTML elements based on "id"
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

        // change display of the divs based on canvasView
        divF.style.display = (canvasView == "F") ? "inline" : "none";
        divB.style.display = (canvasView == "B") ? "inline" : "none";
        divL.style.display = (canvasView == "L") ? "inline" : "none";
        divR.style.display = (canvasView == "R") ? "inline" : "none";
    }

    // change the current canvasView (front, back, left, right, etc.)
    function changeCanvasView(newView) {
        if(canvasView != newView) {
            canvas.discardActiveObject();

            if(canvasView == "F") {
                undoF = [...undoStates];
                redoF = [...redoStates];
            } else if(canvasView == "B") {
                undoB = [...undoStates];
                redoB = [...redoStates];
            } else if(canvasView == "L") {
                undoL = [...undoStates];
                redoL = [...redoStates];
            } else if(canvasView == "R") {
                undoR = [...undoStates];
                redoR = [...redoStates];
            }

            if(newView == "F") {
                canvas = canvasF;
                undoStates = [...undoF];
                redoStates = [...redoF];
            } else if(newView == "B") {
                canvas = canvasB;
                undoStates = [...undoB];
                redoStates = [...redoB];
            } else if(newView == "L") {
                canvas = canvasL;
                undoStates = [...undoL];
                redoStates = [...redoL];
            } else if(newView == "R") {
                canvas = canvasR;
                undoStates = [...undoR];
                redoStates = [...redoR];
            }

            currentState = JSON.stringify(canvas);

            undoButton.disabled = (undoStates.length == 0) ? true : false;
            redoButton.disabled = (redoStates.length == 0) ? true : false;
            canvas.discardActiveObject();
            canvas.requestRenderAll();

            canvasView = newView;

            setEditorIds();
        }
    } 

    // Clear objects from current canvas
    function clearObjects() {
        // enable saving if something is there to erase
        let erase = false;
        if(canvas.getObjects().length) erase = true;

        // remove each object
        canvas.forEachObject((obj) => {
            canvas.remove(obj);
        });

        // save if something was erased
        if(erase) save();
    }

    const addRect = () => {
        const rect = new Rect({
            left: 100,
            top: 50,
            fill: "#ff0000",
            width: 150,
            height: 100
        });

        scaleObject(rect);

        canvas.add(rect);
        canvas.setActiveObject(rect);
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
});

export default DesignCanvas;