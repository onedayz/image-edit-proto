import { useEffect } from "react";
import { useState } from "react";

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

    const imageUpload = (e: any) => {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            try {
                const newList = [...imageState, base64];
                localStorage.setItem('filesBase64', JSON.stringify(newList));
                setImageState(newList);
            } catch (e) {
                console.log('e', e);
            }

        });


    };

    const getImageList = () => {
        const list: any = JSON.parse(localStorage.getItem('filesBase64')!);
        console.log('list', list);
        console.log('list parse', list);
        return list.map((item: any) => {
            return <img src={item} alt="ddd" style={{ width: '120px', height: '120px' }} />
        })
    }

    return (
        <>
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
