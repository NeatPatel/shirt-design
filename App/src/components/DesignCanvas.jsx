import styles from './designcanvas.module.scss';
import { Container } from 'react-bootstrap';
import shirt from '../assets/shirt.png';

function DesignCanvas() {
    /*const [ maxImgHeight, setHeight ] = useState(0);
    const imgRef = useRef(null);

    const resizeHeight = () => {
        setHeight(imgRef.current.offsetHeight);
    };

    useEffect(() => {
        setTimeout(() => resizeHeight(), 100);
        
        window.addEventListener("resize", resizeHeight);
        return () => window.removeEventListener("resize", resizeHeight);
    }, [resizeHeight]);

    return (<>
        <div style={{border: "1px solid red"}} className={styles.canvasDiv + " m-auto"}>
            <Image ref={imgRef} className={styles.img + " user-select-none pe-none m-auto start-0 end-0 top-0 bottom-0 position-absolute"} src={shirt} />
            <canvas style={{maxHeight: `${maxImgHeight}px`}} className={styles.canvas + " border bottom-0 start-0 end-0 position-absolute m-auto"} />
        </div>
    </>);*/

    return (<>
        <Container fluid className={styles.canvasDiv + " m-auto d-flex"}>
            <div className={styles.img + " m-auto d-flex"}>
                <canvas className={styles.canvas + " m-auto"} />
            </div>
        </Container>
    </>);
}

export default DesignCanvas;