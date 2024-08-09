import { useRef, useEffect } from 'react';
import styles from './shirtcanvas.module.scss';
import shirtF from '../assets/shirtFront.svg';
import shirtB from '../assets/shirtBack.svg';
import shirtL from '../assets/shirtLeft.svg';
import shirtR from '../assets/shirtRight.svg';
import redo from '../assets/redo.png';
import undo from '../assets/undo.png';
import clear from '../assets/remove.png';
import DesignCanvas from './DesignCanvas.jsx';
import CustomTabs from './CustomTabs.jsx';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';

function ShirtCanvas() {
    const designCanvasRef = useRef(null);
    const customTabsRef = useRef(null);
    const buttonF = useRef(null);
    const buttonB = useRef(null);
    const buttonL = useRef(null);
    const buttonR = useRef(null);

    useEffect(() => {
        buttonF.current.disabled = true;
    }, []);

    const setButtonStates = (btn) => {
        buttonF.current.disabled = false;
        buttonB.current.disabled = false;
        buttonL.current.disabled = false;
        buttonR.current.disabled = false;

        btn.current.disabled = true;
    };

    const handleCloseChange = (str, btn) => {
        designCanvasRef.current.changeCanvasButton(str);
        setButtonStates(btn);
    };

    const updateActiveObject = (objData) => {
        designCanvasRef.current.updateActiveObject(objData);
    }

    const onCanvasObjSelected = (obj) => {
        customTabsRef.current.setActiveTabCurrent(obj);
    };

    const onCanvasObjSaved = (obj) => {
        customTabsRef.current.saveCurrentObj(obj);
    };

    const onCanvasObjUnselected = () => {
        customTabsRef.current.canvasObjUnselected();
    };

    return (<>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mt-1">
            <CustomTabs updateActiveObject={updateActiveObject} ref={customTabsRef} />
        </Col>
        <Col xs={12} sm={12} md={8} lg={8} xl={8} className="mt-1">
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
                            <Button ref={buttonF} className="my-2 me-1" variant="primary" size="lg" title="Shirt Front" onClick={() => handleCloseChange("F", buttonF)}>
                                <Image className="pe-none" src={shirtF} width="30svh" height="35svh"  />
                            </Button>
                            <Button ref={buttonL} className="my-2 me-1" variant="primary" size="lg" title="Shirt Left" onClick={() => handleCloseChange("L", buttonL)}>
                                <Image className="pe-none" src={shirtL} width="30svh" height="35svh"  />
                            </Button>
                            <Button ref={buttonB} className="my-2 me-1" variant="primary" size="lg" title="Shirt Back" onClick={() => handleCloseChange("B", buttonB)}>
                                <Image className="pe-none" src={shirtB} width="30svh" height="35svh"  />
                            </Button>
                            <Button ref={buttonR} className="my-2 me-auto" variant="primary" size="lg" title="Shirt Right" onClick={() => handleCloseChange("R", buttonR)}>
                                <Image className="pe-none" src={shirtR} width="30svh" height="35svh"  />
                            </Button>
                        </Col>
                    </Row>
                </Container>

                <DesignCanvas onObjSaved={onCanvasObjSaved} onObjUnselected={onCanvasObjUnselected} onObjSelected={onCanvasObjSelected} ref={designCanvasRef} />

                <Button variant="primary" size="lg" className="ms-auto mb-2 me-2 bottom-0 right-0">Save</Button>
            </Card>
        </Col>
    </>);
}

export default ShirtCanvas;