import styles from './customtabs.module.scss';
import { Nav } from 'react-bootstrap';

function CustomTabs() {
    return (<>
        <Nav fill variant="tabs" defaultActiveKey="product-design">
            <Nav.Item>
                <Nav.Link className="text-dark text-decoration-none" eventKey="product-design">Product Design</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className="text-dark text-decoration-none" eventKey="shapes-and-art">Shapes & Art</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className="text-dark text-decoration-none" eventKey="upload">Upload</Nav.Link>
            </Nav.Item>
        </Nav>
    </>);
}

export default CustomTabs;