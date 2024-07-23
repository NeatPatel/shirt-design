import { Container, Row, Col, Card } from 'react-bootstrap';
import ShirtCanvas from './pages/ShirtCanvas.jsx';
import CustomTabs from './pages/CustomTabs.jsx';
import styles from './main.module.scss';

function App() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col className="mt-1">
            <CustomTabs />
          </Col>
          <Col className="col-8 me-1 mt-1">
            <ShirtCanvas />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
