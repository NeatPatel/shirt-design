import styles from './footer.module.scss';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Card, ListGroup, Col, Row } from 'react-bootstrap';

//<Link to="/privacy-policy" className="text-decoration-none text-light"><p>Privacy Policy</p></Link>
//<Link to="/terms-and-conditions" className="text-decoration-none text-light"><p>Terms and Conditions</p></Link>
//<Link to="/contact-us" className="text-decoration-none text-light"><p>Contact Us</p></Link>

function Footer() {
    const pathName = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathName]);

    return (<>
        <div className="mb-5" />
        <Card className={"position-relative mt-auto bg-primary border-0"}>
            <ListGroup>
                <Card.Header className="ps-4 py-4">
                    <Row>
                        <Col className="col-6">
                            <Link to="/" className="text-decoration-none text-light">logo</Link><br />
                            <Link to="/" className="text-decoration-none text-light"><h4>Soramo Design Playground</h4></Link>
                        </Col>
                        <Col>
                            <h4 className="text-light mb-3">About</h4>
                            <Link to="/about" className="text-decoration-none text-light"><p>About Us</p></Link>
                            <Link to="/pricing" className="text-decoration-none text-light"><p>Pricing</p></Link>
                        </Col>
                        <Col>
                            <h4 className="text-light mb-3">Privacy</h4>
                            <Link to="/privacy-policy" className="text-decoration-none text-light"><p>Privacy Policy</p></Link>
                            <Link to="/terms-and-conditions" className="text-decoration-none text-light"><p>Terms and Conditions</p></Link>
                            <Link to="/contact-us" className="text-decoration-none text-light"><p>Contact Us</p></Link>
                        </Col>
                    </Row>
                </Card.Header>
                <ListGroup.Item className="text-center text-dark" variant="light">© 2024, Soramo Design Playground</ListGroup.Item>
            </ListGroup>
        </Card>
    </>);
}

export default Footer;