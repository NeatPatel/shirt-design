import styles from './navbar.module.scss';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Footer from './Footer.jsx';
import logo from '../assets/SoramoLogo.png'

function Nbar() {
    return (<>
        <Navbar variant='dark' className="navbar-primary bg-primary border-primary" expand="lg">
            <Container fluid>
                <Navbar.Brand>
                    <Link to="/" className="nav-link"><img src={logo} height="75vh" width="75vh" className="d-inline-block align-items-center" />{' '}Soramo Design Playground</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="mainNavPanel" />
                <Navbar.Collapse className="text-end" id="mainNavPanel">
                    <Nav className="ms-auto align-items-right" navbarScroll>
                        <Link to="/about" className="nav-link">About</Link>
                        <Link to="/pricing" className="nav-link">Pricing</Link>
                        <Link to="/editor" className="nav-link">Editor</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Outlet />

        <Footer />
    </>);
}

export { Nbar };