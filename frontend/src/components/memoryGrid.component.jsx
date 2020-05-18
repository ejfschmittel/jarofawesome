import React from 'react'

import MemoryPreviewItem, {MemoryPreviewItemLoader} from "./memoryPreviewItem.component"


const MemoryGrid = ({memories, loading}) => {

    if(loading){
        return (
            <div className="memory-grid">
                <MemoryPreviewItemLoader />
                <MemoryPreviewItemLoader />
                <MemoryPreviewItemLoader />           
            </div>
        )
    }

    return (
        <div className="memory-grid">
            {memories && memories.length > 0 ?
                memories.map(memory => <MemoryPreviewItem memory={memory} key={memory.id} />)
            : <p>No memories Found</p>}
        </div>
    )
}

export default MemoryGrid;