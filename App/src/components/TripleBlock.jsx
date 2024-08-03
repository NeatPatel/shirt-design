import styles from './tripleblock.module.scss';
import {Row, Col, Container} from 'react-bootstrap';

/*
props.left is all content displayed on the left column of the block
props.middle is all content displayed in the middle column of the block
props.right is all content displayed on the right column of the block
additional modifiers and formatting can be applied to content within prop
props.mt is top margin in svh
props.mb is bottom margin in svh

EXAMPLE:
<TripleBlock left={<h2 className= 'text-center'>Why Wait? Get a Free Consultation Today!</h2>} middle={<h1>I'm not a button!</h1>} right={<img src= {waggImg} height='auto' width='500svh' className="" />}/>
*/

function TripleBlock(props){
    return(<>
    <Container className='d-flex' fluid>
        <Row className= 'w-75 text-center mx-auto' style={{marginTop: `${props.mt}svh`, marginBottom: `${props.mb}svh`}}>
            <Col className="m-auto">{props.left}</Col>
            <Col className="m-auto">{props.middle}</Col>
            <Col className="m-auto">{props.right}</Col>
        </Row>
    </Container>
    </>)
}
export default TripleBlock;