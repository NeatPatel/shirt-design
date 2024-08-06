import styles from './customtabs.module.scss';
import { Form, Card, Nav, Tab, Tabs, Button } from 'react-bootstrap';
import SplitBlock from './SplitBlock';

function CustomTabs() {
    return (<>
        <Tabs defaultActiveKey="productDesign" justify>
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
            <Tab eventKey="shapesArt" title="Shapes and Art">
                <p className="text-center">Select a tab to browse that category!</p>
                <Tabs justify variant='pills'>
                    <Tab eventKey="shape1" title="Shape1">
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
                    <Tab eventKey="shape2" title="Shape2">
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
                    <Tab eventKey="shape3" title="Shape3">
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
                    <Form.Control id="uploadSrc" type="file" accept="image/png,image/jpg,image/webp,image/svg,image/gif,image/apng,image/avif" />
                </Form.Group>
                <div className="text-center">
                    <Button id="uploadButton" size="lg" className="text-center">Add to Canvas</Button>
                </div>
            </Tab>
        </Tabs>
    </>);
}

export default CustomTabs;