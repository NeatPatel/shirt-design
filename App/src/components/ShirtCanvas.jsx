import { useState, useRef, useEffect } from 'react';
import styles from './shirtcanvas.module.scss';
import shirtF from '../assets/shirtFront.svg';
import shirtB from '../assets/shirtBack.svg';
import shirtL from '../assets/shirtLeft.svg';
import shirtR from '../assets/shirtRight.svg';
import redo from '../assets/redo.png';
import undo from '../assets/undo.png';
import clear from '../assets/remove.png';
import DesignCanvas from './DesignCanvas.jsx';
import { Container, Row, Col, Card, Button, Offcanvas, Image } from 'react-bootstrap';

function ShirtCanvas() {
    const designCanvasRef = useRef(null);

    const handleCloseChange = (str) => {
        designCanvasRef.current.changeCanvasButton(str);
    };

    return (<>
        <Card className={styles.bgImg + " shadow"}>
            <Container fluid>
                <Row>
                    <Col>
                        <Button id="undo" disabled className="ms-2 my-2 me-auto" variant="light" title="Undo">
                            <Image className="pe-none" src={undo} width="35svh" height="35svh"  />
                        </Button>
                        <Button id="redo" disabled className="my-2 me-auto" variant="light" title="Redo">
                            <Image className="pe-none" src={redo} width="35svh" height="35svh"  />
                        </Button>
                        <Button id="clear" className="my-2 me-auto" variant="light" title="Clear Canvas">
                            <Image className="pe-none" src={clear} width="35svh" height="35svh"  />
                        </Button>
                    </Col>
                    <Col className="text-end">
                        <Button className="my-2 me-1" variant="primary" size="lg" title="Shirt Front" onClick={() => handleCloseChange("F")}>
                            <Image className="pe-none" src={shirtF} width="30svh" height="35svh"  />
                        </Button>
                        <Button className="my-2 me-1" variant="primary" size="lg" title="Shirt Left" onClick={() => handleCloseChange("L")}>
                            <Image className="pe-none" src={shirtL} width="30svh" height="35svh"  />
                        </Button>
                        <Button className="my-2 me-1" variant="primary" size="lg" title="Shirt Back" onClick={() => handleCloseChange("B")}>
                            <Image className="pe-none" src={shirtB} width="30svh" height="35svh"  />
                        </Button>
                        <Button className="my-2 me-auto" variant="primary" size="lg" title="Shirt Right" onClick={() => handleCloseChange("R")}>
                            <Image className="pe-none" src={shirtR} width="30svh" height="35svh"  />
                        </Button>
                    </Col>
                </Row>
            </Container>

            <DesignCanvas ref={designCanvasRef} />

            <Button variant="primary" size="lg" className="ms-auto mb-2 me-2 bottom-0 right-0">Save</Button>
        </Card>
    </>);
}

export default ShirtCanvas;