import React, { useEffect, useRef } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import './ImageEditMergeComponent.css';
import testImg from '../../test.jpg';
import { Radio } from 'antd';


let cropper: Cropper;
function ImageEditMergeComponent() {
    const [radioValue, setRadioValue] = React.useState(2);
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const minAspectRatio = 0.5;
        const maxAspectRatio = 1.5;
        if (imageRef?.current) {
            cropper = new Cropper(imageRef.current!, {
                viewMode: 3,
                dragMode: 'none',
                ready: () => {
                    const containerData = cropper.getContainerData();
                    const cropBoxData = cropper.getCropBoxData();
                    const aspectRatio = cropBoxData.width / cropBoxData.height;
                    let newCropBoxWidth;

                    if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
                        newCropBoxWidth =
                            cropBoxData.height * ((minAspectRatio + maxAspectRatio) / 2);

                        cropper.setCropBoxData({
                            left: (containerData.width - newCropBoxWidth) / 2,
                            width: newCropBoxWidth,
                        });
                    }
                },

                cropmove: () => {
                    const cropBoxData = cropper.getCropBoxData();
                    const aspectRatio = cropBoxData.width / cropBoxData.height;

                    if (aspectRatio < minAspectRatio) {
                        cropper.setCropBoxData({
                            width: cropBoxData.height * minAspectRatio,
                        });
                    } else if (aspectRatio > maxAspectRatio) {
                        cropper.setCropBoxData({
                            width: cropBoxData.height * maxAspectRatio,
                        });
                    }
                },
            });
        }



    }, [])

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

            <div className="crossed">
                <img id="image" ref={imageRef} src={testImg} alt="aaapicture" />
            </div>
        </div>
    );
}

export default ImageEditMergeComponent;
