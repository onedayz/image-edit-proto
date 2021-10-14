import React, { useEffect, useRef, useState } from "react";
import { fabric } from 'fabric';


const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

const FabricClipPathComponent: React.FC = () => {
    const [canvas, setCanvas] = useState<fabric.Canvas | undefined>();
    const [clipPath, setClipPath] = useState<fabric.Object | undefined>();
    const initCanvas = () => {
        const canvas: any = new fabric.Canvas('canvas', {
            height: 800,
            width: 800,
            controlsAboveOverlay: true, // clipPath 영역밖 컨트롤 표시여부
            backgroundColor: '#fff'
        })
        const clipPath = new fabric.Rect({
            width: 400,
            height: 400,
            left: 200,
            top: 200,
            stroke: "rgba(0, 0, 0, 0.5)",
            strokeWidth: 1,
        });

        canvas.clipPath = clipPath;
        setCanvas(canvas);
        setClipPath(clipPath);
    };

    const imageUpload = async (e: any) => {
        const fileSrc = e.target.files[0];

        e.target.files.forEach((item: any) => {
            test(item)
        });
    };

    const test = async (fileSrc: any) => {
        getBase64(fileSrc).then(base64 => {
            try {
                console.log('base64', base64);

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
                    imgInstance.scaleToHeight(640); // height를 캔버스의 height로 맞춘다
                    canvas!.add(imgInstance);
                    canvas!.centerObject(imgInstance); // object center 이동
                }

            } catch (e) {
                alert(e);
                console.log('e', e);
            }

        });
    }

    const download = () => {
        const c = document.createElement("canvas");
        c.width = 1280;
        c.height = 1280;
        const ctx: any = c.getContext("2d");
        let cropped = new Image();
        cropped.src = canvas!.toDataURL({
            left: clipPath!.left,
            top: clipPath!.top,
            width: clipPath!.width,
            height: clipPath!.height,
            withoutShadow: true,
        });

        cropped.onload = function () {
            ctx.drawImage(cropped, 0, 0, 1280, 1280);
            const img = c.toDataURL("image/jpg");
            const aTag = document.createElement('a');

            aTag.download = 'from_canvas.jpg';

            aTag.href = img;

            aTag.click();
        };

        // const aTag = document.createElement('a');
        // aTag.download = 'from_canvas.png';
        // aTag.href = canvas!.toDataURL({
        //     format: "png",
        //     quality: 0.8,
        //     left: clipPath!.left,
        //     top: clipPath!.top,
        //     width: clipPath!.width,
        //     height: clipPath!.height,
        // });
        // console.log('aTag.href', aTag.href);
        // aTag.click();
    }

    useEffect(() => {
        initCanvas();
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
                <canvas id="canvas" />
            </div>
            <button onClick={download}>다운로드</button>
            <button onClick={() => {
                console.log('history', canvas!);
            }}>history</button>
            <button onClick={() => {
                console.log('canvas', canvas);
            }}>getcanvas</button>
        </>
    );
};

export default FabricClipPathComponent;