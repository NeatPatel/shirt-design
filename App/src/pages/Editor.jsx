import { Container, Row, Col} from 'react-bootstrap';
import ShirtCanvas from '../components/ShirtCanvas.jsx';
import styles from './editor.module.scss';

function Editor() {
  return (
    <>
      <Container fluid>
        <Row>
          <ShirtCanvas />
        </Row>
      </Container>
    </>
  );
}

export default Editor;
