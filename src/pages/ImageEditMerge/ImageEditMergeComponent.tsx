import React, { useEffect, useRef, useState } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import testImg from '../../test.jpg';
import { Col, Radio, Row } from 'antd';
import Dragger from "antd/lib/upload/Dragger";


let croppers: Cropper[];
function ImageEditMergeComponent() {
    const [radioValue, setRadioValue] = React.useState(2);
    const imageRef = useRef<any>([]);
    const [images, setImages] = useState<any>([]);

    useEffect(() => {
        console.log('useeEffff')

        // const images: any = document.querySelector('#image');
        // images.forEach((item: any, index: any) => {
        //     console.log('item', item);
        // })
        console.log('imageRef.current', imageRef.current);
        croppers = [];
        imageRef.current.map((item: any, index: any) => {
            if (imageRef.current[index]) {
                croppers.push(
                    new Cropper(imageRef.current[index], { viewMode: 3, dragMode: 'none' })
                );
            }
        })
    }, [radioValue])

    const onChangeRadio = (e: any) => {
        console.log('e', e.target.value);
        setRadioValue(e.target.value);
    }

    return (
        <div className="container">
            <h1>Cropper with a range of aspect ratio</h1>

            <Radio.Group onChange={onChangeRadio} value={radioValue}>
                <Radio value={2}>2분할</Radio>
                <Radio value={3}>3분할</Radio>
                <Radio value={4}>4분할</Radio>
            </Radio.Group>

            {radioValue === 2 &&
                <Row>
                    <Dragger></Dragger>
                    <Col><img className="image" ref={(el) => imageRef.current[0] = el} src={testImg} alt="aaapicture" /></Col>
                    <Col><img className="image" ref={(el) => imageRef.current[1] = el} src={testImg} alt="aaapicture" /></Col>
                </Row>
            }

            {radioValue === 3 &&
                <Row>
                    <Col>
                        <img className="image" ref={(el) => imageRef.current[0] = el} src={testImg} alt="aaapicture" />
                    </Col>
                    <Col>
                        <img className="image" ref={(el) => imageRef.current[1] = el} src={testImg} alt="aaapicture" />
                    </Col>
                    <Col>
                        <img className="image" ref={(el) => imageRef.current[2] = el} src={testImg} alt="aaapicture" />
                    </Col>
                </Row>
            }

            {radioValue === 4 &&
                <>
                    <Row>
                        <Col>
                            <img className="image" ref={(el) => imageRef.current[0] = el} src={testImg} alt="aaapicture" />
                        </Col>
                        <Col>
                            <img className="image" ref={(el) => imageRef.current[1] = el} src={testImg} alt="aaapicture" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <img className="image" ref={(el) => imageRef.current[2] = el} src={testImg} alt="aaapicture" />
                        </Col>
                        <Col>
                            <img className="image" ref={(el) => imageRef.current[3] = el} src={testImg} alt="aaapicture" />
                        </Col>
                    </Row>
                </>
            }


        </div >
    );
}

export default ImageEditMergeComponent;
