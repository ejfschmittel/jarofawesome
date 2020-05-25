import React from 'react'

import ImageMediaItem from "./memoryMediaItemImage.component"
import AudioMediaItem from "./memoryMediaItemAudio.component"
import VideoMediaItem from "./memoryMediaItemVideo.component"

/* 
    central media item wrapper for image, video & audio
    defines size and edeting and which interface to render
*/


const MemoryMediaItem = ({item}) => {

    //const path = item.file ? item.file : item.externalUrl

    let override = "image"

    if(item.id == "47070804-cc33-448b-acb3-01b4c0239490"){
        override ="video"
    }
   
    switch(override){
        case "image":
            return <ImageMediaItem item={item}/>
        case "video":
            return <VideoMediaItem item={item} />
        case "audio":
            return <AudioMediaItem item={item} /> 
        default:
            return null;
    }
    

    /*return (
        <div className="media-list__item image-media" style={{backgroundImage:  `url(${path})` }}>
            
        </div>
    )*/
}

export default MemoryMediaItem