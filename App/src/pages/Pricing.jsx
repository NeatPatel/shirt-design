import styles from './pricing.module.scss';

import ContentBlock from '../components/ContentBlock.jsx';
import SplitBlock from '../components/SplitBlock.jsx';
import TripleBlock from '../components/TripleBlock.jsx';

import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Pricing(){
    return (<>
        <ContentBlock content={<>
            <h1 class="display-1">Pricing</h1>
        </>} mt="15" mb="15" />

        <ContentBlock content={<>
            <h1 class="text-primary">Individual</h1>
        </>} mt="15" mb="15" />

        <SplitBlock 
            left={<>
                <h1 class="text-right me-0">T-Shirts</h1>
            </>}
            
            right={<>
                <h1>Long-Sleeve Shirts</h1>
            </>}
            
            mt="0" 
            mb="25" 
        />

        <TripleBlock 
            left={<>
                <h1>Jackets</h1>
            </>}

            middle={<>
                <h1>Sweaters</h1>
            </>}
            
            right={<>
                <h1>Hoodies</h1>
            </>}
            
            mt="0" 
            mb="25" 
        />
    </>)
}

export default Pricing