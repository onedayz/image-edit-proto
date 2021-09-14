import React, { useEffect, useRef, useState } from "react";
import { fabric } from 'fabric';
import 'fabric-history'; // undo, redo 기능 import import 제거시 undo, redo 사용불가 삭제하지말것


const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

const FabricAlertComponent: React.FC = () => {
    const [canvas, setCanvas] = useState<fabric.Canvas | undefined>();
    const initCanvas = () => {
        const canvas: any = new fabric.Canvas('canvas', {
            height: 800,
            width: 800,
        })
        return canvas;
    };

    const imageUpload = async (e: any) => {
        const fileSrc = e.target.files[0];

        e.target.files.forEach((item: any) => {
            test(item)
        });
    };

    const test = async (fileSrc: any) => {
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
                        scaleY: 360 / imgElement.height
                    });
                    canvas!.add(imgInstance);
                }

            } catch (e) {
                alert(e);
                console.log('e', e);
            }

        });
    }

    const download = () => {
        const aTag = document.createElement('a');
        aTag.download = 'from_canvas.png';
        aTag.href = canvas!.toDataURL({
            format: "png",
            quality: 0.8,
        });
        console.log('aTag.href', aTag.href);
        aTag.click();
    }

    function hasCanvasBlankArea(canvas: any) {
        // const ctx = canvas.getContext('2d');
        // const data =
        //     ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;
        // console.log('getImageData.data', imagedata);
        // console.log('getImageData.data.some', imagedata.some((channel: any) => channel === 0));
        // console.log('getImageData.data.filter', imagedata.filter((channel: any) => channel === 0));
        // const test = data.reduce((item1: any, item2: any) => {
        //     item1.index = item1.index + 1; // index 1 증가
        //     item1.pixcelIndex = item1.pixcelIndex + 1; // pixcel 인덱스 증가
        //     item1.sum = item1.sum + item2; // sum에 아이템 추가
        //     if (item1.index === 3) {
        //         if (item1.sum === 0) {
        //             item1.check = item1.check + 1;
        //         }
        //         item1.index = 0;
        //         item1.sum = 0;
        //     }
        //     return item1;
        // }, { sum: 0, check: 0, index: 0, pixcelIndex: 0 })
        // console.log('test', test);
        canvas.getObjects().forEach((item: any) => {
            const imageWidth = item.scaleX * item.width;
            const imageHeight = item.scaleY * item.height;
            console.log('imageWidth', imageWidth);
            console.log('imageHeight', imageHeight);
        });
        // return data
        // .some((channel: any) => channel === 0);
    }

    // returns true if every pixel's uint32 representation is 0 (or "blank")
    // function hasCanvasBlankArea(canvas: any) {
    //     const context = canvas.getContext('2d');

    //     const pixelBuffer = new Uint32Array(
    //         context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    //     );



    //     console.log(canvas.width, canvas.height);
    //     console.log('pixelBuffer', pixelBuffer);
    //     console.log('getImageData.data.some', pixelBuffer.some((channel: any) => channel === 0));
    //     console.log('getImageData.data.filter', pixelBuffer.filter((channel: any) => channel === 0));

    //     return pixelBuffer.some(color => color === 0);
    // }

    // function getpx(canvas: any) {
    //     const ctx = canvas.getContext(); // your canvas is the Fabric canvas
    //     const pixelData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    //     console.log('pixelData', pixelData);
    // }

    useEffect(() => {
        setCanvas(initCanvas());
    }, []);
    return (
        <>
            <input
                multiple
                type="file"
                id="imageFile"
                name='imageFile'
                onChange={imageUpload} />
            <div>
                <canvas id="canvas" style={{ border: "1px solid gray" }} />
            </div>
            <button onClick={download}>다운로드</button>
            <button onClick={() => {
                console.log('canvas', canvas);
            }}>getcanvas</button>
            <button onClick={() => {
                console.log(hasCanvasBlankArea(canvas));
            }}>check</button>
        </>
    );
};

export default FabricAlertComponent;