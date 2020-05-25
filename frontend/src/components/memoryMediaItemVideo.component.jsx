import React from 'react'
import FileValidator from "../utils/fileValidator"
import {ReactComponent as Logo} from "../svgs/video2.svg"

const VideoMediaItem = ({item}) => {

    const path = item.file ? item.file : item.externalUrl

    const vidid = "wSdT-SArM2Q"
    const yturl = `https://img.youtube.com/vi/${vidid}/0.jpg`
    
    console.log(path)

    const onClick = async (e) => {
        console.log(item.externalUrl)
        const url = "https://www.youtube.com/watch?v=wSdT-SArM2Q"
        const validator = new FileValidator();
        if(validator.validateMediaType(url)){
            console.log(validator.getData())
        }
       // const result = await isValidImageUrl(url)
        //console.log(result)
    }

    return (
            <div  className="media-list__item media-item-image" style={{backgroundImage:  `url(${yturl})` }} onClick={onClick}>
            <Logo fill="#fff" className="media-item-image__logo" />
            <div className="media-item-image__menu">
               
               <div className="media-item-image__menu-body">
               <Logo fill="#fff" className="media-item-image__menu-svg" />
               </div>
              
            </div>
       
        </div>
    )
}

export default VideoMediaItem