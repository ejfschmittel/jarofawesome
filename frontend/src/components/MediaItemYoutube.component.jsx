import React, {useMemo} from 'react'

import {ReactComponent as Logo} from "../svgs/video2.svg"
/*
    Media item for displaying preview 

*/

const youtube_parser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

const MediaItemYoutube = ({item}) => {
    const youtube_id = useMemo(() => {
        return youtube_parser(item.externalUrl)
    },[item.externalUrl])
    if(!item.externalUrl) return null;

 
    const url = `https://img.youtube.com/vi/${youtube_id}/mqdefault.jpg`
    console.log(url)

    // preview image url


    return (
        <div className="media-item__body media-item--youtube" style={{backgroundImage: `url(${url})`}}>
            <Logo fill="#fff" className="media-item__mini-icon" />
            <Logo fill="#fff" className="media-item__body-icon" />
        </div>
    )
}

export default MediaItemYoutube