
import 'tui-image-editor/dist/tui-image-editor.css';
// @ts-ignore
import ImageEditor from '@toast-ui/react-image-editor';
import { useRef } from 'react';
import testImg from '../../test.jpg';
import { Button } from 'antd';


function ToastImageComponent() {
    const editorRef = useRef<any>();

    const handleCick = () => {
        const el = editorRef.current.getInstance();

        console.log('el', el);
        el.setDrawingShape('rect', {
            fill: {
                type: 'filter',
                filter: [{ blur: 0.3 }, { pixelate: 20 }]
            },
            width: 100,
            height: 200
        });
    }
    return (
        <>
            <ImageEditor
                ref={editorRef}
                includeUI={{
                    loadImage: {
                        path: testImg,
                        name: 'SampleImage',
                    },
                    menu: ['crop', 'flip', 'rotate', 'shape', 'icon', 'text', 'mask', 'filter'],
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
            <Button onClick={handleCick}>123</Button>
        </>
    );
}

export default ToastImageComponent;
