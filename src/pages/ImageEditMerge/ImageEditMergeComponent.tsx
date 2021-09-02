import React, { useEffect, useRef, useState } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { Button, Col, Radio, Row } from 'antd';
import Dragger from "antd/lib/upload/Dragger";
import { UploadChangeParam } from 'antd/lib/upload';

const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}


function ImageEditMergeComponent() {
    let croppers: Cropper[];
    const [radioValue, setRadioValue] = React.useState(2);
    const imageRef = useRef<any>([]);
    const [images, setImages] = useState<any>([undefined, undefined, undefined, undefined]);
    const [mergeImage, setMergeImage] = useState<any>(undefined);

    useEffect(() => {
        croppers = [];
        const images: any = document.getElementsByClassName('image');
        console.log('images', images);


        var length = images.length;
        for (let i = 0; i < length; i++) {
            croppers.push(
                //   new Cropper(images[i])
                new Cropper(images[i], { viewMode: 3, dragMode: 'move' })
            );

        }

        // imageRef.current.map((item: any, index: any) => {
        //     if (imageRef.current[index]) {
        //         croppers.push(
        //             new Cropper(imageRef.current[index], { viewMode: 3, dragMode: 'move' })
        //         );
        //     }
        // })
        console.log('image', images);
    }, [radioValue, images])

    const onChangeRadio = (e: any) => {
        console.log('e', e.target.value);
        setRadioValue(e.target.value);
    }

    const onChangeImage = async (info: UploadChangeParam, index: any) => {
        try {
            const { file, fileList } = info;
            console.log('file', file, info);
            const baseUrlEncoding = await getBase64(file);

            console.log('baseUrlEncoding', baseUrlEncoding);
            setImages((prevState: any) => {
                const nextState = [...prevState];
                nextState[index] = baseUrlEncoding;
                console.log(nextState);
                return nextState;
            });

            // const images = await uploadApproveImage({
            //   image: base64Encoding as string,
            //   imageName: file.name,
            //   uploadURL,
            // });

            // parsingSquareImage(images.data);

            // props.onImageUploadSuccess?.(images);
        } catch (error) {
            alert(error);
        }

        // 파일업로드해서 response 하는 로직 추가.

        // response 승인시 잘 보여주기.
    }


    const onMergeImage = () => {
        const c = document.createElement("canvas");
        document.body.appendChild(c);
        c.width = 1280;
        c.height = 1280;
        const ctx: any = c.getContext("2d");
        const imageObj1 = new Image();
        const imageObj2 = new Image();
        console.log('cropper', croppers)
        console.log('1번', croppers[0].getCroppedCanvas())
        console.log('2번', croppers[1].getCroppedCanvas())
        imageObj1.src = images[0];
        imageObj1.onload = function () {
            ctx.drawImage(imageObj1, 0, 0, 640, 1280);
            imageObj2.src = images[1];
            imageObj2.onload = function () {
                ctx.drawImage(imageObj2, 640, 0, 640, 1280);
                const img = c.toDataURL("image/png");


                const aTag = document.createElement('a');

                aTag.download = 'from_canvas.png';

                aTag.href = img;

                aTag.click();



                // document.write('<img src="' + img + '" width="100" height="200"/>');
            }
        };
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
                    <Col style={{ width: '320px', height: '640px' }}>
                        <Dragger style={{ width: '100%', height: '100%', padding: 0 }} showUploadList={false} beforeUpload={() => false} onChange={info => {
                            onChangeImage(info, 0);
                        }} disabled={images[0]}>
                            {images[0] ? <img className="image" ref={(el) => imageRef.current[0] = el} src={images[0]} alt="aaapicture" /> : <>이미지를 첨부해주세요.</>}
                        </Dragger>
                    </Col>
                    <Col style={{ width: '320px', height: '640px', padding: 0 }}>
                        <Dragger style={{ width: '100%', height: '100%' }} showUploadList={false} beforeUpload={() => false} onChange={info => { onChangeImage(info, 1); }} disabled={images[1]}>
                            {images[1] ? <img className="image" ref={(el) => imageRef.current[1] = el} src={images[1]} alt="aaapicture" /> : <>이미지를 첨부해주세요.</>}
                        </Dragger>
                    </Col>
                </Row>
            }

            {radioValue === 3 &&
                <Row>
                    <Col style={{ width: '213.333333px', height: '640px' }}>
                        <Dragger style={{ padding: 0 }} showUploadList={false} beforeUpload={() => false} onChange={info => {
                            onChangeImage(info, 0);
                        }} disabled={images[0]}>
                            {images[0] ? <img className="image" ref={(el) => imageRef.current[0] = el} src={images[0]} alt="aaapicture" /> : <>이미지를 첨부해주세요.</>}
                        </Dragger>
                    </Col>
                    <Col style={{ width: '213.333333px', height: '640px', padding: 0 }}>
                        <Dragger showUploadList={false} beforeUpload={() => false} onChange={info => { onChangeImage(info, 1); }} disabled={images[1]}>
                            {images[1] ? <img className="image" ref={(el) => imageRef.current[1] = el} src={images[1]} alt="aaapicture" /> : <>이미지를 첨부해주세요.</>}
                        </Dragger>
                    </Col>
                    <Col style={{ width: '213.333333px', height: '640px', padding: 0 }}>
                        <Dragger showUploadList={false} beforeUpload={() => false} onChange={info => { onChangeImage(info, 2); }} disabled={images[2]}>
                            {images[2] ? <img className="image" ref={(el) => imageRef.current[2] = el} src={images[2]} alt="aaapicture" /> : <>이미지를 첨부해주세요.</>}
                        </Dragger>
                    </Col>
                </Row>
            }

            {radioValue === 4 &&
                <>
                    <Row>
                        <Col style={{ width: '320px', height: '320px' }}>
                            <Dragger style={{ width: '100%', height: '100%', padding: 0 }} showUploadList={false} beforeUpload={() => false} onChange={info => {
                                onChangeImage(info, 0);
                            }} disabled={images[0]}>
                                {images[0] ? <img className="image" ref={(el) => imageRef.current[0] = el} src={images[0]} alt="aaapicture" /> : <>이미지를 첨부해주세요.</>}
                            </Dragger>
                        </Col>
                        <Col style={{ width: '320px', height: '320px', padding: 0 }}>
                            <Dragger style={{ width: '100%', height: '100%' }} showUploadList={false} beforeUpload={() => false} onChange={info => { onChangeImage(info, 1); }} disabled={images[1]}>
                                {images[1] ? <img className="image" ref={(el) => imageRef.current[1] = el} src={images[1]} alt="aaapicture" /> : <>이미지를 첨부해주세요.</>}
                            </Dragger>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ width: '320px', height: '320px', padding: 0 }}>
                            <Dragger showUploadList={false} beforeUpload={() => false} onChange={info => { onChangeImage(info, 2); }} disabled={images[2]}>
                                {images[2] ? <img className="image" ref={(el) => imageRef.current[2] = el} src={images[2]} alt="aaapicture" /> : <>이미지를 첨부해주세요.</>}
                            </Dragger>
                        </Col>
                        <Col style={{ width: '320px', height: '320px', padding: 0 }}>
                            <Dragger showUploadList={false} beforeUpload={() => false} onChange={info => { onChangeImage(info, 3); }} disabled={images[3]}>
                                {images[3] ? <img className="image" ref={(el) => imageRef.current[3] = el} src={images[3]} alt="aaapicture" /> : <>이미지를 첨부해주세요.</>}
                            </Dragger>
                        </Col>
                    </Row>
                </>
            }

            <Button onClick={onMergeImage}>합치기</Button>
        </div>
    );
}

export default ImageEditMergeComponent;
