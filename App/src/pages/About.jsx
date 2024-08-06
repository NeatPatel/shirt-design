import styles from './about.module.scss';

import ContentBlock from '../components/ContentBlock.jsx';
import SplitBlock from '../components/SplitBlock.jsx';
import TripleBlock from '../components/TripleBlock.jsx';

import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import shirt from '../assets/shirt.png';

function About(){
    return (<>
        <ContentBlock content={<>
            <h1 class="display-1">About Us</h1>
        </>} mt="15" mb="15" />

        <SplitBlock 
            left={<>
                <h1>Our Mission</h1>
            </>}
            
            right={<>
                <h4>Lorem ipsum odor amet, consectetuer adipiscing elit. Lobortis commodo accumsan ligula; molestie ac pretium nec. Ad euismod hac lectus eros consectetur venenatis. Phasellus massa taciti leo hendrerit donec accumsan. Phasellus mollis fames non nulla luctus iaculis. </h4>
            </>}
            
            mt="0" mb="25" 
        />

        <SplitBlock 
            left={<>
                <h4>Aliquet accumsan magnis quam habitant dignissim vestibulum dolor vehicula. Dapibus orci sem natoque turpis malesuada per taciti luctus. Class velit efficitur eget class rhoncus. Integer morbi sociosqu diam egestas eros accumsan magna vitae.</h4>
            </>}
            
            right={<>
                <h1>Our Story</h1>
            </>}
            
            mt="5" mb="25" 
        />

        <SplitBlock 
            left={<>
                <h1>Why Wait?</h1>
                <h1>Style Your Dream Shirt Today!</h1>
            </>}
            
            right={<>
                <Image
                    src={shirt}
                />
            </>}
            
            mt="5" mb="25" 
        />
    </>)
}

export default About