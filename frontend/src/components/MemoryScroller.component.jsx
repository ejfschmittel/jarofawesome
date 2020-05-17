import React from 'react'


const MemoryScroller = ({loading, memories, ...other}) => {

    console.log(memories)
    return (
        <div className="memory-scroller">
            {
                memories && memories.length > 0 ? 
                    memories.map(memory => <MemoryItem key={memory.id}  memory={memory}/>)
                : 
                    <p>No Memories yet.</p>
            }
        </div>
    )
}

const MemoryItem = ({memory}) => {
    return (
        <div className="memory-item">
            <header className="memory-item__header">
                Memory: <span>{memory.date}</span>
            </header>
            <div className="memory-item__memory">
                {memory.memory}
            </div>
        </div>
    )
}


export default MemoryScroller