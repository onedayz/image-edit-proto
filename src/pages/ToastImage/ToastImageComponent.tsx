
import 'tui-image-editor/dist/tui-image-editor.css';
// @ts-ignore
import ImageEditor from '@toast-ui/react-image-editor';
import { useRef } from 'react';


function ToastImageComponent() {
    const editorRef = useRef<any>();

    return (
        <>
            <ImageEditor
                ref={editorRef}
                includeUI={{
                    loadImage: {
                        path: 'img/sampleImage.jpg',
                        name: 'SampleImage',
                    },
                    menu: ['shape', 'filter'],
                    initMenu: 'filter',
                    uiSize: {
                        width: '1000px',
                        height: '700px',
                    },
                    menuBarPosition: 'bottom',
                }}
                cssMaxHeight={500}
                cssMaxWidth={700}
                selectionStyle={{
                    cornerSize: 20,
                    rotatingPointOffset: 70,
                }}
                usageStatistics={true}
            />
        </>
    );
}

export default ToastImageComponent;
