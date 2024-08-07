import styles from './terms.module.scss';

import ContentBlock from '../components/ContentBlock.jsx';
import SplitBlock from '../components/SplitBlock.jsx';
import TripleBlock from '../components/TripleBlock.jsx';

import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Terms(){
    return (<>
        <ContentBlock content={<>
            <h1 class="display-1">Terms and Conditions</h1>
        </>} mt="15" mb="15" />

        <ContentBlock content={<>
            <div>Lorem ipsum odor amet, consectetuer adipiscing elit. Venenatis senectus et neque tempus, quisque pharetra luctus venenatis at. Nostra imperdiet nunc facilisis nostra scelerisque odio convallis. Mattis sem curabitur habitasse molestie tempus non eu commodo! Sem cubilia ipsum, varius tempus sed conubia. Mauris elit porttitor nibh tincidunt erat morbi quis integer. Fusce semper interdum massa tempus accumsan netus nisi dui. Mauris nibh nisi luctus inceptos bibendum cras torquent mattis. Maecenas aptent efficitur eros mus integer.

Porttitor sociosqu potenti fames pretium luctus felis. Lacinia amet erat adipiscing pretium bibendum quis interdum. Imperdiet tellus fusce parturient nam himenaeos. Quam pharetra phasellus fames aptent interdum ex finibus imperdiet. Morbi eu nibh risus morbi posuere ad. Habitant maecenas sapien ac senectus sociosqu. Diam morbi volutpat nisl rutrum, laoreet tortor elit condimentum.

Adipiscing rhoncus est ultricies lectus ut molestie inceptos luctus non. Maecenas justo phasellus hendrerit ante magna facilisi. Dis porttitor in dui nec accumsan nunc phasellus bibendum morbi. Eu potenti eros arcu nunc aliquam mauris facilisis. Torquent venenatis phasellus facilisis donec morbi aptent pulvinar. Iaculis velit eget mollis non lacus. Mus est ac hendrerit faucibus est odio. Etiam ullamcorper magnis adipiscing convallis hac consectetur senectus ex. Vulputate luctus bibendum orci aenean aliquet augue.</div>
        </>} mt="15" mb="15" />
    </>)
}

export default Terms