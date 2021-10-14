import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
const playerList = [
    { id: uuidv4(), content: "1 task" },
    { id: uuidv4(), content: "2 task" },
    { id: uuidv4(), content: "3 task" },
    { id: uuidv4(), content: "4 task" },
    { id: uuidv4(), content: "5 task" },
    { id: uuidv4(), content: "6 task" },
    { id: uuidv4(), content: "7 task" },
    { id: uuidv4(), content: "8 task" },
    { id: uuidv4(), content: "9 task" },
    { id: uuidv4(), content: "10 task" },
    { id: uuidv4(), content: "11 task" },
    { id: uuidv4(), content: "12 task" },
    { id: uuidv4(), content: "13 task" },
    { id: uuidv4(), content: "14 task" },
    { id: uuidv4(), content: "15 task" },
    { id: uuidv4(), content: "16 task" },
    { id: uuidv4(), content: "17 task" },
    { id: uuidv4(), content: "18 task" },
    { id: uuidv4(), content: "19 task" },
    { id: uuidv4(), content: "20 task" },
    { id: uuidv4(), content: "21 task" },
    { id: uuidv4(), content: "22 task" },
    { id: uuidv4(), content: "23 task" },
    { id: uuidv4(), content: "24 task" },
    { id: uuidv4(), content: "25 task" },
    { id: uuidv4(), content: "26 task" },
    { id: uuidv4(), content: "27 task" },
    { id: uuidv4(), content: "28 task" },
    { id: uuidv4(), content: "29 task" },
    { id: uuidv4(), content: "30 task" },
];

const rowsFromBackend = {
    List: {
        name: "List",
        items: playerList
    }
};

const onDragEnd = (result, rows, setRows) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = rows[source.droppableId];
        const destColumn = rows[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setRows({
            ...rows,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = rows[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setRows({
            ...rows,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};


function ReactDndComponent() {
    const [rows, setRows] = useState(rowsFromBackend);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column', height: '60rem', }}>
                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, rows, setRows)}
                >
                    {Object.entries(rows).map(([columnId, column], index) => {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: 'wrap',
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                }}
                                key={columnId}
                            >
                                <div>
                                    <Droppable droppableId={columnId} key={columnId}
                                        direction='horizontal'
                                        justifyContent='center'
                                        alignContent='center'
                                    >
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver
                                                            ? "lightblue"
                                                            : "white",
                                                        padding: 4,
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        overflowX: "auto",
                                                        width: "100vw",
                                                        justifyContent: 'space-around',
                                                        minHeight: '8rem',
                                                        alignContent: 'center'
                                                    }}
                                                >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: "none",
                                                                                padding: 4,
                                                                                height: '6rem',
                                                                                minHeight: "6rem",
                                                                                width: '4rem',
                                                                                minWidth: "4rem",
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? "#263B4A"
                                                                                    : "#456C86",
                                                                                color: "white",
                                                                                border: '1px solid black',
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {item.content}
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    );
}

export default ReactDndComponent;
