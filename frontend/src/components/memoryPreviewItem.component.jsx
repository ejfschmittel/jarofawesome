import React from 'react'
import ContentLoader from 'react-content-loader'

const MemoryPreviewItem = ({memory}) => {
    return (
        <div className="memory-preview-item">
            <header className="memory-preview-item__header">
                Memory: <span>{memory.date}</span>
            </header>
            <div className="memory-preview-item__body">
                <div>
                    {memory.memory}
                </div>
            </div>
        </div>
    )
}

export const MemoryPreviewItemLoader = () => {
    return (
        <div className="memory-preview-item-loader">
            <header className="memory-preview-item-loader__header">
               <div className="loading"></div>
            </header>
            <div className="memory-preview-item-loader__body">
                <div className="loading"></div>                
                <div className="loading loading__small"></div>
                <div className="loading"></div>
                <div className="loading loading__small"></div>
            </div>
        </div>
    )
}

export default MemoryPreviewItem