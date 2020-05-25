import React from 'react'
import {ReactComponent as Logo} from "../svgs/image.svg"
// edit
// delete
// view

const ImageMediaItem = ({item}) => {
    const path = item.file ? item.file : item.externalUrl

    return (
        <div  className="media-list__item media-item-image" style={{backgroundImage:  `url(${path})` }}>
            <Logo fill="#fff" className="media-item-image__logo" />
            <div className="media-item-image__menu">
               
               <div className="media-item-image__menu-body">
               <Logo fill="#fff" className="media-item-image__menu-svg" />
               </div>
              
            </div>
       
        </div>
    )
}

export default ImageMediaItem