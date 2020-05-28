import React from 'react'
import {ReactComponent as Logo} from "../svgs/image.svg"

const MediaItemImage = ({item}) => {

    const previewImageUrl = item.file || item.externalUrl

    return (
        <div className="media-item__body media-item--image" style={{backgroundImage: `url(${previewImageUrl})`}}>
           <Logo fill="#fff" className="media-item__mini-icon" />
           <Logo fill="#fff" className="media-item__body-icon" />
        </div>
    )
}

export default MediaItemImage