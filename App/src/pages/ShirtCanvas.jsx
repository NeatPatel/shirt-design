import { useState } from 'react';
import styles from './shirtcanvas.module.scss';
import menu from '../assets/menu_hamburger.png';
import redo from '../assets/redo.png';
import undo from '../assets/undo.png';
import DesignCanvas from '../components/DesignCanvas.jsx';
import { Container, Row, Col, Card, Button, Offcanvas, Image } from 'react-bootstrap';

function ShirtCanvas() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (<>
        <Card className={styles.bgImg + " shadow"}>
            <Container fluid>
                <Row>
                    <Col>
                        <Button className="ms-2 my-2 me-auto" variant="light">
                            <Image className="pe-none" src={undo} width="35svh" height="35svh"  />
                        </Button>
                        <Button className="my-2 me-auto" variant="light">
                            <Image className="pe-none" src={redo} width="35svh" height="35svh"  />
                        </Button>
                    </Col>
                    <Col className="text-end">
                        <Button className="ms-auto me-2 my-2 p-1"  variant="light" onClick={handleShow}>
                            <Image className="pe-none" src={menu} width="50svh" height="50svh" />
                        </Button>
                    </Col>
                </Row>
            </Container>

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shirt View</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Button className="w-100 mb-4" variant="outline-secondary" size="lg">Front View</Button>
                    <Button className="w-100 mb-4" variant="outline-secondary" size="lg">Back View</Button>
                    <Button className="w-100 mb-4" variant="outline-secondary" size="lg">Left Sleeve View</Button>
                    <Button className="w-100 mb-4" variant="outline-secondary" size="lg">Right Sleeve View</Button>
                </Offcanvas.Body>
            </Offcanvas>

            <DesignCanvas />

            <Button variant="primary" size="lg" className="ms-auto mb-2 me-2 bottom-0 right-0">Save</Button>
        </Card>
    </>);
}

export default ShirtCanvas;