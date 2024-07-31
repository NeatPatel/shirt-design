import { useEffect, useState, useRef } from 'react';
import styles from './designcanvas.module.scss';
import { Container } from 'react-bootstrap';
import { useWindowSize } from '../components/useWindowSize.jsx';
import shirt from '../assets/shirt.svg';
import { Canvas, FabricImage, Rect } from 'fabric';

function DesignCanvas() {
    const canvasRef = useRef(null);
    const [ canvas, setCanvas ] = useState(null);
    const { windowWidth, windowHeight } = useWindowSize();
    const canvasWidth = windowHeight * 0.75;
    const canvasHeight = windowHeight * 0.75;

    // Create Canvas
    useEffect(() => {
        const canvasInstance = new Canvas(canvasRef.current);

        setCanvas(canvasInstance);

        return () => {
           canvasInstance.dispose();
        };
    }, []);

    // Change Canvas based on screen size
    useEffect(() => {
        if(canvas) {
            canvas.setWidth(canvasWidth);
            canvas.setHeight(canvasHeight);
            canvas.calcOffset();

            const setup = async () => {
                try {
                    const img = await FabricImage.fromURL(shirt);
                    img.scaleToWidth(canvasWidth);
                    canvas.add(img);
                    canvas.backgroundColor = "#dddddd";

                    let shape = canvas.item(canvas.size() - 1);
                    canvas.remove(shape);
                    canvas.clipPath = shape;
                } catch(err) {
                    console.log("ERROR");
                }
            };

            setup();
        }
    }, [canvasWidth, canvasHeight]);

    // Initialize Canvas Settings
    useEffect(() => {
        if(canvas) {
            // Disable Group Selection
            canvas.selection = false;

            // Create Background Image
            const setup = async () => {
                try {
                    const img = await FabricImage.fromURL(shirt);
                    img.scaleToWidth(canvasWidth);
                    canvas.add(img);
                    canvas.backgroundColor = "#dddddd";
                    
                    let shape = canvas.item(canvas.size() - 1);
                    canvas.remove(shape);
                    canvas.clipPath = shape;
                } catch(err) {
                    console.log("ERROR");
                }
            };

            setup();
            // End Create Background Image

            // keydown Events
            const onKeyDown = (e) => {
                if(e.keyCode == 8 || e.keyCode == 46) {
                    canvas.remove(canvas.getActiveObject());
                } else if(e.keyCode == 27) {
                    canvas.discardActiveObject();
                    canvas.renderAll();
                }
            }

            window.addEventListener("keydown", onKeyDown);
            return () => window.removeEventListener("keydown", onKeyDown);
            // End keydown Events
        }
    }, [canvas]);

    const addRect = () => {
        const rect = new Rect({
            left: 100,
            top: 50,
            fill: "#ff00da",
            width: 150,
            height: 100
        });

        canvas.add(rect);
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