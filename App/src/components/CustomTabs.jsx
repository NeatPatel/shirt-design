import styles from './customtabs.module.scss';
import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import shirt from '../assets/shirt.png'
import { Form, Card, Tab, Tabs, Button, Image } from 'react-bootstrap';
import SplitBlock from './SplitBlock';

const CustomTabs = forwardRef((props, ref) => {
    const [ activeTab, setActiveTab ] = useState("productDesign");

    // currentObject useStates
    const [ currentObjContent, setCurrentObjContent ] = useState(false);
    const [ hasFill, setHasFill ] = useState(false);

    // Form references for currentObject
    const objHeightRef = useRef(null);
    const objWidthRef = useRef(null);
    const objXRef = useRef(null);
    const objYRef = useRef(null);
    const objAngleRef = useRef(null);
    const objOpacityRef = useRef(null);
    const objFillRef = useRef(null);
    const objFlipXRef = useRef(null);
    const objFlipYRef = useRef(null);
    const objFormRef = useRef(null);
    
    // currentObject vars
    const [ currentObjId, setCurrentObjId ] = useState(null);

    function changeCurrentObject() {
        if(objFormRef.current.checkValidity()) {
            const objData = hasFill ? {
                height: objHeightRef.current.value,
                width: objWidthRef.current.value,
                x: objXRef.current.value,
                y: objYRef.current.value,
                angle: objAngleRef.current.value,
                opacity: objOpacityRef.current.value,
                fill: objFillRef.current.value,
                flipX: objFlipXRef.current.checked,
                flipY: objFlipYRef.current.checked
            } : {
                height: objHeightRef.current.value,
                width: objWidthRef.current.value,
                x: objXRef.current.value,
                y: objYRef.current.value,
                angle: objAngleRef.current.value,
                flipX: objFlipXRef.current.checked,
                flipY: objFlipYRef.current.checked,
                opacity: objOpacityRef.current.value,
                fill: false
            };

            props.updateActiveObject(objData);
        }
    }

    function currentObjectProperties(objData) {
        if((objData.scaleY * objData.height).toFixed(1) != parseFloat(objHeightRef.current.value)) objHeightRef.current.value = (objData.scaleY * objData.height).toFixed(1);
        if((objData.scaleX * objData.width).toFixed(1) != parseFloat(objWidthRef.current.value)) objWidthRef.current.value = (objData.scaleX * objData.width).toFixed(1);
        if((objData.left).toFixed(1) != parseFloat(objXRef.current.value)) objXRef.current.value = (objData.left).toFixed(1);
        if((objData.top).toFixed(1) != parseFloat(objYRef.current.value)) objYRef.current.value = (objData.top).toFixed(1);
        if((objData.angle).toFixed(1) != parseFloat(objAngleRef.current.value)) objAngleRef.current.value = (objData.angle).toFixed(1);
        if((objData.opacity).toFixed(2) != parseFloat(objOpacityRef.current.value)) objOpacityRef.current.value = (objData.opacity).toFixed(2);
        if(objData.flipX != objFlipXRef.current.checked) objFlipXRef.current.checked = objData.flipX;
        if(objData.flipY != objFlipYRef.current.checked) objFlipYRef.current.checked = objData.flipY;
        if(objData.type == "image") {
            setHasFill(false);
        } else {
            setHasFill(true);
            if(objData.fill != objFillRef.current.value) objFillRef.current.value = objData.fill;
        }
    }

    useImperativeHandle(ref, () => ({
        setActiveTabCurrent(objData) {
            setActiveTab("currentObject");
            currentObjectProperties(objData);
            setCurrentObjContent(true);
        },
        canvasObjUnselected() {
            setCurrentObjId(null);
            setCurrentObjContent(false);
        },
        saveCurrentObj(objData) {
            currentObjectProperties(objData);
            setCurrentObjContent(true);
        }
    }));

    return (<>
        <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key || "productDesign")} defaultActiveKey="productDesign" justify>
            <Tab eventKey="productDesign" title="Product Design">
                <p className="text-center">Select a tab to browse that category!</p>
                <Tabs defaultActiveKey="shirtType" justify variant='pills'>
                    <Tab eventKey="shirtType" title="Shirt Type">
                        <SplitBlock mt={1}
                        left={<>
                            <Card>
                                <p>image goes here</p>
                                <h1>Title</h1>
                                <p>text</p>
                            </Card>
                        </>}
                        right={<>
                            <Card>
                                <p>image goes here</p>
                                <h1>Title</h1>
                                <p>text</p>
                            </Card>
                        </>}
                        />
                    </Tab>
                    <Tab eventKey="shirtColor" title="Color">
                        color stuff
                    </Tab>
                    <Tab eventKey="patterns" title="Patterns">
                    <SplitBlock mt={1}
                        left={<>
                            <Card>
                                <p>image goes here</p>
                                <h1>Title</h1>
                                <p>text</p>
                            </Card>
                        </>}
                        right={<>
                            <Card>
                                <p>image goes here</p>
                                <h1>Title</h1>
                                <p>text</p>
                            </Card>
                        </>}
                        />
                    </Tab>
                </Tabs>    
            </Tab>
            <Tab eventKey="shapesArt" title="Art & Text">
                <p className="text-center">Select a tab to browse that category!</p>
                <Tabs justify variant='pills'>
                    <Tab eventKey="shape1" title="Shapes">
                        <SplitBlock mt={1}
                        left={<>
                            <Card className="justify-content-center align-items-center">
                                <Image src={shirt} height="100svh" width="100svw" />
                                <h1>Title</h1>
                                <p>text</p>
                            </Card>
                        </>}
                        right={<>
                            <Card>
                                <p>image goes here</p>
                                <h1>Title</h1>
                                <p>text</p>
                            </Card>
                        </>}
                        />
                    </Tab>
                    <Tab eventKey="shape2" title="Text">
                        <SplitBlock mt={1}
                            left={<>
                                <Card>
                                    <p>image goes here</p>
                                    <h1>Title</h1>
                                    <p>text</p>
                                </Card>
                            </>}
                            right={<>
                                <Card>
                                    <p>image goes here</p>
                                    <h1>Title</h1>
                                    <p>text</p>
                                </Card>
                            </>}
                        />
                    </Tab>
                    <Tab eventKey="shape3" title="Art">
                    <SplitBlock mt={1}
                        left={<>
                            <Card>
                                <p>image goes here</p>
                                <h1>Title</h1>
                                <p>text</p>
                            </Card>
                        </>}
                        right={<>
                            <Card>
                                <p>image goes here</p>
                                <h1>Title</h1>
                                <p>text</p>
                            </Card>
                        </>}
                        />
                    </Tab>
                </Tabs>
            </Tab>
            <Tab eventKey="uploadTab" title="Upload an Image">
                <Form.Group className="mb-3 text-center mt-3">
                    <Form.Label>Upload File</Form.Label>
                    <Form.Control id="uploadSrc" type="file" accept="image/png,image/jpg,image/webp,image/svg+xml,image/gif,image/apng,image/avif" />
                </Form.Group>
                <div className="text-center">
                    <Button id="uploadButton" size="lg" className="text-center">Add to Canvas</Button>
                </div>
            </Tab>
            <Tab id="test" eventKey="currentObject" title="Current Object">
            <div className="mt-2" style={{display: currentObjContent ? "block" : "none", overflowY: "scroll", height: "83svh"}}>
                <Form ref={objFormRef} noValidate validated={true}>
                    <Form.Group className="mb-3">
                        <Form.Label>Height: </Form.Label>
                        <Form.Control required onChange={changeCurrentObject} className="w-75" step="0.1" min="0" ref={objHeightRef} type="number" defaultValue="0" />
                        <Form.Control.Feedback type="invalid">Enter a valid height to one decimal</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Width: </Form.Label>
                        <Form.Control required onChange={changeCurrentObject} className="w-75" ref={objWidthRef} type="number" min="0" step="0.1" defaultValue="0" />
                        <Form.Control.Feedback type="invalid">Enter a valid width to one decimal</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>X position: </Form.Label>
                        <Form.Control required onChange={changeCurrentObject} className="w-75" ref={objXRef} type="number" step="0.1" defaultValue="0" />
                        <Form.Control.Feedback type="invalid">Enter a valid x position to one decimal</Form.Control.Feedback>
                    </Form.Group >
                    <Form.Group className="mb-3">
                        <Form.Label>Y position: </Form.Label>
                        <Form.Control required onChange={changeCurrentObject} className="w-75" ref={objYRef} type="number" step="0.1" defaultValue="0" />
                        <Form.Control.Feedback type="invalid">Enter a valid y position to one decimal</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Angle (degrees): </Form.Label>
                        <Form.Control required onChange={changeCurrentObject} className="w-75" ref={objAngleRef} type="number" min="0" max="360" step="0.1" defaultValue="0" />
                        <Form.Control.Feedback type="invalid">Enter a valid angle in degrees to one decimal</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Opacity: </Form.Label>
                        <Form.Control required onChange={changeCurrentObject} className="w-75" ref={objOpacityRef} defaultValue="0" type="number" min="0" max="1" step="0.01" />
                        <Form.Control.Feedback type="invalid">Enter a valid opacity from 0 to 1 to two decimals</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check id="flipHorizCurrObj" onClick={changeCurrentObject} ref={objFlipXRef} label="Flip Horizontally" type="switch" />
                        <Form.Check id="flipVertCurrObj" onClick={changeCurrentObject} ref={objFlipYRef} label="Flip Vertically" type="switch" />
                    </Form.Group>
                    <div style={{display: hasFill ? "inline" : "none"}}>
                        <Form.Group className="mb-3">
                            <Form.Label>Fill Color: </Form.Label>
                            <Form.Control onChange={changeCurrentObject} ref={objFillRef} type="color" defaultValue="#ffffff" title="Pick Fill Color" />
                        </Form.Group>
                    </div>
                </Form>
            </div>
            <div className="mt-2" style={{display: currentObjContent ? "none" : "block", height: "83svh"}}>
                <p>There are no objects currently selected</p>
            </div>
            </Tab>
        </Tabs>
    </>);
});

export default CustomTabs;