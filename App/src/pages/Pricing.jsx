import styles from './pricing.module.scss';

import ContentBlock from '../components/ContentBlock.jsx';
import SplitBlock from '../components/SplitBlock.jsx';
import TripleBlock from '../components/TripleBlock.jsx';

import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import shirt from '../assets/shirt.png';

function Pricing(){
    return (<>
        <ContentBlock content={<>
            <h1 className="display-1">Pricing</h1>
        </>} mt="15" mb="15" />


        <SplitBlock 
            left={<>
                <h1 className="text-primary">T-Shirts</h1>
                <Image src={shirt}/>
                <h3>Individual:$</h3>
                <h3>Bulk (20 or more):$$</h3>
            </>}
            
            right={<>
                <h1 className="text-primary">Hoodies</h1>
                <p>placeholder for hoodie image</p>
                <h3>Individual:$</h3>
                <h3>Bulk (20 or more):$$</h3>
            </>}
            
            mt="0" 
            mb="25" 
        />

        <ContentBlock content={<>
            <h5 className="text-dark">additional charge message/shipping handling</h5>
        </>} mt="15" mb="15" />

    </>)
}

export default Pricing