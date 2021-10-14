import React, { useEffect, useRef, useState } from "react";
import { fabric } from 'fabric';
import 'fabric-history'; // undo, redo 기능 import import 제거시 undo, redo 사용불가 삭제하지말것

interface Icanvas extends fabric.Canvas {
    redo: any;
    undo: any;
    historyUndo: any[];
    historyRedo: any[];
}

const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}


const FabricComponent: React.FC = () => {
    const [canvas, setCanvas] = useState<Icanvas | undefined>();

    const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

    const initCanvas = () => {
        const canvas: any = new fabric.Canvas('canvas', {
            height: 800,
            width: 800,
            controlsAboveOverlay: true, // clipPath 영역밖 컨트롤 표시여부
            backgroundColor: '#fff'
        })
        canvas.on('history:append', () => {
            forceUpdate()
        });
        canvas.on('history:undo', () => {
            forceUpdate()
        });
        canvas.on('history:redo', () => {
            forceUpdate()
        });

        const clipPath = new fabric.Rect({
            width: 400,
            height: 400,
            left: 200,
            top: 200,
            stroke: "rgba(0, 0, 0, 0.5)",
            strokeWidth: 1,
        });

        canvas.clipPath = clipPath;


        function draw_grid(grid_size: any) {
            grid_size || (grid_size = 25);
            // var currentCanvas: any = document.getElementById('canvas');
            // var grid_context = currentCanvas.getContext("2d");
            const grid_context = canvas.getContext("2d");

            const currentCanvasWidth = canvas.getWidth();
            const currentCanvasHeight = canvas.getHeight();

            // Drawing vertical lines
            let x;
            for (x = 0; x <= currentCanvasWidth; x += grid_size) {
                grid_context.moveTo(x + 0.5, 0);
                grid_context.lineTo(x + 0.5, currentCanvasHeight);
            }

            // Drawing horizontal lines
            let y;
            for (y = 0; y <= currentCanvasHeight; y += grid_size) {
                grid_context.moveTo(0, y + 0.5);
                grid_context.lineTo(currentCanvasWidth, y + 0.5);
            }
            grid_context.strokeStyle = "#0000002b";
            grid_context.stroke();
        }

        canvas.on('after:render', function (ctx: any) {
            draw_grid(100);
        });


        canvas.renderAll();
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

    const checkValidation = () => {
        const imageObject = canvas!._objects[0];
        
        console.log('tl x 200보다 큰가',imageObject.aCoords?.tl.x!, imageObject.aCoords?.tl.x! >= 200 );
        console.log('tl y 200보다 작은가',imageObject.aCoords?.tl.y!,imageObject.aCoords?.tl.y! >= 200);
        // tl의 x가 200보다 크거나(x축이 캔버스 영역 침범) y축이 200보다 작거나(y좌표가 캔버스 영역 침범)

        // tl(왼쪽위)
        const tlCheck = imageObject.aCoords?.tl.x! > 200 || imageObject.aCoords?.tl.y! > 200;

        // tr(오른쪽위)
        const trCheck = imageObject.aCoords?.tr.x! < 600 || imageObject.aCoords?.tr.y! > 200;
        
        // bl(아래왼쪽)
        const blCheck = imageObject.aCoords?.bl.x! > 200 || imageObject.aCoords?.bl.y! < 600;

        // br(아래오른쪽)
        const brCheck = imageObject.aCoords?.br.x! < 600 || imageObject.aCoords?.br.y! < 600;

        if(tlCheck || trCheck || blCheck || brCheck) {
            alert(`틀린곳이 있습니다 tl:${tlCheck} tr:${trCheck} bl:${blCheck} br: ${brCheck}`)
        } else {
            alert('통과')
        }
    }


    const canUndo = () => {
        console.log('canUndo',);
        if (canvas) {
            return canvas.historyUndo.length > 0
        }
        return false;
    }

    const canRedo = () => {
        console.log('canRedo');
        if (canvas) {
            return canvas.historyRedo.length > 0
        }
        return false;
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
                <canvas id="canvas" width={1280} height={1280} style={{ border: "1px solid gray" }} />
            </div>
            <button onClick={download}>다운로드</button>
            <button onClick={checkValidation}>체크</button>
            <button disabled={!canRedo()} onClick={() => {
                canvas!.redo();
            }}>redo</button>
            <button disabled={!canUndo()} onClick={() => {
                canvas!.undo();
            }}>undo</button>
        </>
    );
};

export default FabricComponent;