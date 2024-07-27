import { Container, Row, Col, Card } from 'react-bootstrap';
import ShirtCanvas from './pages/ShirtCanvas.jsx';
import CustomTabs from './pages/CustomTabs.jsx';
import styles from './main.module.scss';

function App() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mt-1">
            <CustomTabs />
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} xl={8} className="mt-1">
            <ShirtCanvas />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
