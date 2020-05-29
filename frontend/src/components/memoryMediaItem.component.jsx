import React, {useContext} from 'react'

import MediaItemImage from "./MediaItemImage.component"
import MediaItemYoutube from "./MediaItemYoutube.component"

import MediaItemDeleteButton from "./MediaItemDeleteButton.component"

import MediaOverlayContext from "../contexts/mediaOverlay.context"

/* 
    central media item wrapper for image, video & audio
    defines size and edeting and which interface to render
*/


const MemoryMediaItem = ({item, index}) => {
    const {setItemAndShow} = useContext(MediaOverlayContext)
    //const path = item.file ? item.file : item.externalUrl



    const getMediaItemComponent = (item) => {
        switch(item.mediaType){
            case "IMAGE":
                return MediaItemImage 
            case "YOUTUBE":
                return MediaItemYoutube 
        
            default:
                return null;
        }
    }

    const MediaItemBody = getMediaItemComponent(item)
    if(!MediaItemBody) return null


    const showMediaOverlay = () => {
        setItemAndShow(index)
    }

    return (
        <div className="media-list__item media-item" onClick={showMediaOverlay}>
            <MediaItemBody item={item}/>
           <MediaItemDeleteButton className="media-item__delete-btn" mediaItemId={item.id}/>
        </div>
    )
}

export default MemoryMediaItem