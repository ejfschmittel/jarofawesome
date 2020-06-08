import React, {useState, useRef} from 'react'
import MemoryPreviewItem from "./memoryPreviewItem.component"

const MemoryScroller = ({loading, memories, ...other}) => {
    const ref = useRef(null)


    const [scrollState, setScrollState] = useState({
        isScrolling: false,
        clientX: 0,
        scrollX: 0
    })



    const onMouseDown = e =>{
        setScrollState({
            ...scrollState,
            isScrolling: true,
            clientX: e.clientX
        })
    }

    const onMouseUp = e => {
        setScrollState({
            ...scrollState,
            isScrolling: false
        })
    }

    const onMouseMove = e => {
        const {clientX, scrollX, isScrolling} = scrollState
        if(isScrolling){
            ref.current.scrollLeft = scrollX + e.clientX - clientX;
            setScrollState({
                ...scrollState,
                scrollX: scrollX + e.clientX - clientX,
                clientX: e.clientX
            })
        }
    }


    return (
        <div 
            className="memory-scroller"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            ref={ref}
        >
            {
                memories && memories.length > 0 ? 
                    memories.map(memory => <MemoryPreviewItem key={memory.id}  memory={memory}/>)
                : 
                    <p>No Memories yet.</p>
            }
        </div>
    )
}



export default MemoryScroller