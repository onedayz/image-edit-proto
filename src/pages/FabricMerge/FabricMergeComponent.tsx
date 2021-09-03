import React, { useEffect, useRef, useState } from "react";
import { fabric } from 'fabric';
import imageCompression from "browser-image-compression";
import { Col, Row } from "antd";
import testImg from '../../test.jpg';
import cropImg from './cropped.jpg';


const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}


const FabricMergeComponent: React.FC = () => {
    const [canvas, setCanvas] = useState<any>([]);
    const [selectState, setSelectState] = useState<any>(0);

    const initCanvas = () => (
        setCanvas([new fabric.Canvas('canvas1', {
            height: 640,
            width: 320,
            // backgroundColor: 'pink'
        }),
        new fabric.Canvas('canvas2', {
            height: 640,
            width: 320,
            // backgroundColor: 'pink'
        })])
    );

    const imageUpload1 = async (e: any) => {
        const fileSrc = e.target.files[0];

        e.target.files.forEach((item: any) => {
            test(item, canvas[0])
        })
    };
    const imageUpload2 = async (e: any) => {
        const fileSrc = e.target.files[0];

        e.target.files.forEach((item: any) => {
            test(item, canvas[1])
        })
    };

    const test = async (fileSrc: any, canvas: any) => {
        // const options = {
        //     maxSizeMB: 0.2,
        //     maxWidthOrHeight: 1920,
        //     useWebWorker: true
        // };
        // const compressedFile = await imageCompression(fileSrc, options); // 이미지 압축
        // console.log('압축파일 용량', compressedFile.size);
        // console.log('일반파일 용량', fileSrc.size);
        getBase64(fileSrc).then(base64 => {
            try {
                console.log('base64', base64);
                // const newList = [...imageState, base64];
                // localStorage.setItem('filesBase64', JSON.stringify(newList));
                // setImageState(newList);

                const imgElement: any = document.createElement("img");
                imgElement.src = base64;
                imgElement.onload = function () {
                    console.log('20 / imgElement.width', 20 / imgElement.width, imgElement.width);
                    console.log('20 / imgElement.height', 20 / imgElement.height, imgElement.height);
                    const imgInstance = new fabric.Image(imgElement, {
                        // left: 100,
                        // top: 100,
                        // angle: 0,
                        // opacity: 0.75,
                        // width: 300,
                        // height: 300,
                        angle: 0,
                        opacity: 1,
                        cornerSize: 10,
                        borderColor: 'red',
                        cornerColor: 'green',
                        scaleX: 360 / imgElement.width,
                        scaleY: 1280 / imgElement.height,
                        originX: 'center',
                        originY: 'center'
                    });
                    imgInstance.scaleToHeight(640); // height를 캔버스의 height로 맞춘다
                    canvas.add(imgInstance);

                    canvas.centerObject(imgInstance); // object center 이동

                    canvas.add(imgInstance);
                }

            } catch (e) {
                alert(e);
                console.log('e', e);
            }

        });
    }

    const selectCanvasAdd = () => {
        const imgElement: any = document.createElement("img");
        imgElement.src = cropImg;
        imgElement.onload = function () {
            console.log('20 / imgElement.width', 20 / imgElement.width, imgElement.width);
            console.log('20 / imgElement.height', 20 / imgElement.height, imgElement.height);
            let imgInstance = new fabric.Image(imgElement, {
                // left: 100,
                // top: 100,
                // angle: 0,
                // opacity: 0.75,
                // width: 300,
                // height: 300,
                angle: 0,
                opacity: 1,
                cornerSize: 10,
                borderColor: 'red',
                cornerColor: 'green',
                // scaleX: 360 / imgElement.width,
                // scaleY: 360 / imgElement.height,
                originX: 'center',
                originY: 'center'
            });
            imgInstance.scaleToHeight(640); // height를 캔버스의 height로 맞춘다
            canvas[selectState].add(imgInstance);

            canvas[selectState].centerObject(imgInstance); // object center 이동

        }
    }


    const onMergeImage = () => {
        const c = document.createElement("canvas");
        document.body.appendChild(c);
        c.width = 1280;
        c.height = 1280;
        const ctx: any = c.getContext("2d");
        const imageObj1 = new Image();
        const imageObj2 = new Image();
        imageObj1.src = canvas[0].toDataURL();
        imageObj1.onload = function () {
            ctx.drawImage(imageObj1, 0, 0, 640, 1280);
            imageObj2.src = canvas[1].toDataURL();
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

    const download = () => {
        const aTag = document.createElement('a');
        aTag.download = 'from_canvas.png';
        aTag.href = canvas.toDataURL({
            format: "png",
            quality: 0.8,
        });
        console.log('aTag.href', aTag.href);
        aTag.click();
    }


    useEffect(() => {
        initCanvas()
    }, []);
    return (
        <>
            <input
                multiple
                type="file"
                id="imageFile"
                name='imageFile'
                onChange={imageUpload1} />
            <input
                multiple
                type="file"
                id="imageFile"
                name='imageFile'
                onChange={imageUpload2} />
            {/* <div className="crossed"> */}
            {selectState}
            <Row>
                <Col onClick={() => setSelectState(0)}>
                    <canvas id="canvas1" style={{ border: "1px solid gray" }} />
                </Col>
                <Col onClick={() => setSelectState(1)}>
                    <canvas id="canvas2" style={{ border: "1px solid gray" }} />
                </Col>
            </Row>
            {/* </div> */}
            <button onClick={onMergeImage}>123</button>
            <button onClick={selectCanvasAdd}>첨부하기</button>
        </>
    );
};

export default FabricMergeComponent;