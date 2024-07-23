import styles from './designcanvas.module.scss';
import { Image } from 'react-bootstrap';
import shirt from '../assets/shirt.png';

function DesignCanvas() {
    return (<>
        <div className={styles.canvasDiv + " m-auto border"}>
            <Image className={styles.img + " m-auto start-0 end-0 top-0 bottom-0 position-absolute"} src={shirt} />
            <canvas className={styles.canvas + " border bottom-0 start-0 end-0 position-absolute m-auto"} />
        </div>
    </>);
}

export default DesignCanvas;