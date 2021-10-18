import React, { useState } from 'react';
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import "./styles.css";

const SortableItem = SortableElement(({ value }: any) => {
    return <li>{value}</li>;
});

const SortableList = SortableContainer(({ items }: any) => {
    return (
        <ul>
            {items.map((value: any, index: any) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </ul>
    );
});

const DndGridComponent: React.FC<any> = () => {
    const [state, setState] = useState({
        items: [
            "Item 1",
            "Item 2",
            "Item 3",
            "Item 4",
            "Item 5",
            "Item 6",
            "Item 1",
            "Item 2",
            "Item 3",
            "Item 4",
            "Item 5",
            "Item 6"
        ]
    });

    // 결과를 재정렬하는 데 도움이 되는 작은 기능
    const reorder = (
        list: any[],
        startIndex: number,
        endIndex: number
    ): any[] => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1); // startIndex에서 한개의 값을 추출하고
        result.splice(endIndex, 0, removed); // endIndex쪽에 추출한 값을 삽입한다
        return result;
    };

    const onSortEnd = ({ oldIndex, newIndex }: any) => {
        setState((prevState: any) => {
            return { ...prevState, items: reorder(prevState.items, oldIndex, newIndex) };
        })
    };
    return <div>
        <SortableList
            axis="xy"
            items={state.items}
            onSortEnd={onSortEnd}
        />
    </div>;
}
export default DndGridComponent;




