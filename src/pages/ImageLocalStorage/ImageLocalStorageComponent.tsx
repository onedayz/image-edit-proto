import { useEffect } from "react";
import { useState } from "react";
import imageCompression from "browser-image-compression";

function ImageLocalStorageComponent() {
    const [imageState, setImageState] = useState<any[]>([]);

    useEffect(() => {
        const storageList: any = localStorage.getItem('filesBase64');
        if (storageList) {
            setImageState(JSON.parse(storageList));
        }
    }, [])

    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    const imageUpload = async (e: any) => {
        const fileSrc = e.target.files[0];
        const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };


        const compressedFile = await imageCompression(fileSrc, options); // 이미지 압축
        console.log('압축파일 용량', compressedFile.size);
        console.log('일반파일 용량', fileSrc.size);
        getBase64(compressedFile).then(base64 => {
            try {
                const newList = [...imageState, base64];
                localStorage.setItem('filesBase64', JSON.stringify(newList));
                setImageState(newList);
            } catch (e) {
                alert(e);
                console.log('e', e);
            }

        });


    };

    const getImageList = () => {
        const list: any = JSON.parse(localStorage.getItem('filesBase64')!);
        console.log('list', list);
        console.log('list parse', list);
        return list ? list.map((item: any) => (<img src={item} alt="ddd" style={{ width: '200px' }} />)) : <></>
    }

    return (
        <>
            <h1>용량압축 + base64 변환 후 localStorage 저장</h1>
            <input
                type="file"
                id="imageFile"
                name='imageFile'
                onChange={imageUpload} />

            <span>image List</span>
            {getImageList()}
        </>
    );
}

export default ImageLocalStorageComponent;
