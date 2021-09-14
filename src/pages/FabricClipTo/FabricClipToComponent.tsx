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

const FabricClipToComponent: React.FC = () => {
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
                console.log('history', canvas!);
            }}>history</button>
            <button onClick={() => {
                console.log('canvas', canvas);
            }}>getcanvas</button>
        </>
    );
};

export default FabricClipToComponent;