import './ExifComponent.css';
import testImg from '../../test.jpg';
import React, { useEffect, useRef, useState } from 'react';

function ExifComponent() {

    const [image, setImage] = useState<any>(null);
    
    const setMetaData = (e: any) => {
        console.dir(e.target);
        console.log('e.target',e.target);
        const { naturalWidth, naturalHeight } = e.target;
        setImage({
            naturalWidth, naturalHeight
        });
    }
    return (
        <div className="container">
            <h1>메타정보를 구해보자</h1>
            <div>
                <img id="image" src={testImg} alt="aaapicture" onLoad={setMetaData} />
                {image?.naturalWidth} x {image?.naturalHeight}
            </div>
        </div>
    );
}

export default ExifComponent;
