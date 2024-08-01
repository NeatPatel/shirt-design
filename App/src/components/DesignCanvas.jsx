import { useEffect, useState, useRef } from 'react';
import styles from './designcanvas.module.scss';
import { Container } from 'react-bootstrap';
import { useWindowSize } from '../components/useWindowSize.jsx';
import shirt from '../assets/shirt.svg';
import { Canvas, FabricImage, Rect } from 'fabric';

function DesignCanvas() {
    const canvasRef = useRef(null);
    const [ canvas, setCanvas ] = useState(null);

    // Undo/Redo Variables
    let currentState;
    let undoStates = [];
    let redoStates = [];
    let redoButton;
    let undoButton;

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

            // Set Undo/Redo Buttons
            redoButton = document.getElementById("redo");
            undoButton = document.getElementById("undo");
            // End Set Undo/Redo Buttons

            const setup = () => {
                try {
                    loadImg();
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
            // Set Undo/Redo Buttons
            redoButton = document.getElementById("redo");
            undoButton = document.getElementById("undo");
            // End Set Undo/Redo Buttons

            // Disable Group Selection
            canvas.selection = false;

            // Create Background Image
            const setup = () => {
                try {
                    loadImg();

                    save();
                } catch(err) {
                    console.log("ERROR: Background Image Not Loaded");
                }
            };

            setup();
            // End Create Background Image

            // keydown Events
            const onKeyDown = (e) => {
                if(e.keyCode == 8 || e.keyCode == 46) {
                    canvas.remove(canvas.getActiveObject());
                    save();
                } else if(e.keyCode == 27) {
                    canvas.discardActiveObject();
                    canvas.requestRenderAll();
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
            // End Event Listeners

            // Remove Event Listeners (if any)
            return () => {
                undoButton.removeEventListener("click", () => replayState(undoStates, redoStates, redoButton, undoButton));
                redoButton.removeEventListener("click", () => replayState(redoStates, undoStates, undoButton, redoButton));
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
            canvas.requestRenderAll();
            loadImg();
        });

        if(!playStack.length) {
            loadImg();
        }

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

    async function loadImg() {
        const img = await FabricImage.fromURL(shirt);
        img.scaleToWidth(canvasWidth);
        canvas.add(img);
        canvas.backgroundColor = "#dddddd";
        
        let shape = canvas.item(canvas.size() - 1);
        canvas.remove(shape);
        canvas.clipPath = shape;
        canvas.clipPath.fixed = true;
        console.log("this run!");
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
        save();
    };

    return (<>
        <Container fluid className={styles.canvasDiv + " m-auto d-flex"}>
            <div className={styles.img + " m-auto d-flex justify-content-center align-items-center"}>
                <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
            </div>
        </Container>
        <button onClick={addRect}>Width: {windowWidth} and Height: {windowHeight} </button>
    </>);
}

export default DesignCanvas;