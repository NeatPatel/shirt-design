import { Container, Row, Col} from 'react-bootstrap';
import ShirtCanvas from '../components/ShirtCanvas.jsx';
import CustomTabs from '../components/CustomTabs.jsx';
import styles from './editor.module.scss';

function Editor() {
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

export default Editor;
