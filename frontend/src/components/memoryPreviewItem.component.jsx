import React, {useState} from 'react'
import {Link} from "react-router-dom"

const variants = [
    "memory-preview-item__variant--red",
    "memory-preview-item__variant--green",
    "memory-preview-item__variant--yellow",
    "memory-preview-item__variant--light-blue",
    "memory-preview-item__variant--morning-blue",
    "memory-preview-item__variant--saphire",
    "memory-preview-item__variant--purple",
    "memory-preview-item__variant--sliver-pink",
    "memory-preview-item__variant--yellow2",
]

let previous = null;

const getUniqueVariant = () => {
    let c = null;
    while(true){
        c = variants[Math.floor(Math.random() * variants.length)];
        if(c!=previous){
            break;
        }
    }
    previous = c;
    return c;
}

const MemoryPreviewItem = ({memory}) => {
    const [variant] = useState(getUniqueVariant())
    
    return (
       
        <div className={`memory-preview-item ${variant}`}>
            <Link to={`/memories/${memory.id}`} className="memory-preview-item__link-wrapper" />
            <header className="memory-preview-item__header">
                Memory: <span>{memory.memoryDate}</span>
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