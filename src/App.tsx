import { useEffect, useRef } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import './test.css';
import testImg from './test.jpg';

let cropper: Cropper;
function App() {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const minAspectRatio = 0.5;
    const maxAspectRatio = 1.5;
    if (imageRef?.current) {
      cropper = new Cropper(imageRef.current!, {
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

  return (
    <div className="container">
      <h1>Cropper with a range of aspect ratio</h1>
      <div>
        <img id="image" ref={imageRef} src={testImg} alt="aaapicture" />
      </div>
    </div>
  );
}

export default App;
