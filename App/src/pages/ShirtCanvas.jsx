import styles from './shirtcanvas.module.scss';
import menu from '../assets/menu_hamburger.png';
import redo from '../assets/redo.png';
import undo from '../assets/undo.png';
import { Row, Col, Card, Button, Offcanvas, Image } from 'react-bootstrap';

function ShirtCanvas() {
    return (<>
        <Card className="shadow">
            <Row>
                <Col>
                    <Button className="ms-2 my-2 me-auto" variant="light">
                        <Image className="pe-none" src={undo} width="50svh" height="50svh"  />
                    </Button>
                    <Button className="my-2 me-auto" variant="light">
                        <Image className="pe-none" src={redo} width="50svh" height="50svh"  />
                    </Button>
                </Col>
                <Col className="text-end">
                    <Button className="ms-auto me-2 my-2 p-1" variant="light">
                        <Image className="pe-none" src={menu} width="50svh" height="50svh" />
                    </Button>
                </Col>
            </Row>

            <h1>Image and Editor here</h1>

            <Button variant="primary" size="lg" className="ms-auto mb-2 me-2 bottom-0 right-0">Save</Button>
        </Card>
    </>);
}

export default ShirtCanvas;