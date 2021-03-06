import React, {useContext, useState, useEffect} from 'react'


import MediaOverlayContext from "../contexts/mediaOverlay.context"
import {ReactComponent as Logo} from "../svgs/test.svg"

import {ReactComponent as CloseLogo} from "../svgs/exit2.svg"

const MediaOverlay = ({items}) => {
    const {isVisible, setIsVisible,hideOverlay, currentItem, moveLeft, moveRight} = useContext(MediaOverlayContext)
    const [item, setItem] = useState(null)

    useEffect(() => {
        if(items && items.length > 0){
            setItem(items[currentItem])
        }else{
            
        }
    }, [currentItem, items])


    const moveRightBounded = (e) => {
        e.stopPropagation();
        if(canMoveRight){
            moveRight()
        }
    }

    const moveLeftBounded = (e) => {
        e.stopPropagation();
        if(canMoveLeft){
            moveLeft()
        }
    }

    const canMoveLeft = currentItem > 0 
    const canMoveRight = currentItem < items.length -1;


    const classes = `media-overlay ${isVisible ? ' media-overlay--is-visible' : ''}`;
 
    return (
        <div className={classes} onClick={() => hideOverlay()}>
            <div className="media-overlay__body" >
                <div className={`media-overlay__nav media-overlay__nav--left ${!canMoveLeft && 'media-overlay__nav--disabled'}`}>
                    <Logo className="media-overlay__nav-btn" onClick={moveLeftBounded}/>
                </div>
                <MediaOverlayItem item={item} i/>   
                <div className={`media-overlay__nav media-overlay__nav--right ${!canMoveRight && 'media-overlay__nav--disabled'}`}>
                    <Logo className="media-overlay__nav-btn" onClick={moveRightBounded}/>
                </div>
                
            </div>
            <CloseLogo  className="media-overlay__close" onClick={hideOverlay} />
            
        </div>
    )
}

const MediaOverlayItem = ({item}) => {
    if(!item) return null

    const getMediaItemComponent = (item) => {
        switch(item.mediaType){
            case "IMAGE":
                return MediaOverlayImageItem 
            case "YOUTUBE":
                return MediaOverlayYoutubeItem 
           
        
            default:
                return null;
        }
    }

    const MediaItemBody = getMediaItemComponent(item)
    if(!MediaItemBody) return null

    return <MediaItemBody item={item}/>
}

const MediaOverlayImageItem = ({item}) => {
    return (
        <div className="media-overlay__item--img">
            {item &&  <img src={item.file} />}
        </div>
    )
}

const youtube_parser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

const MediaOverlayYoutubeItem = ({item}) => {
    console.log("youtube")

    const videoId = youtube_parser(item.externalUrl)

    const embedUrl = `https://www.youtube.com/embed/${videoId}`

    return (
        <div className="media-overlay__item--youtube">
            <div>
                Loading...
            </div>
            <iframe src={embedUrl} frameBorder="0" allo="autoplay;encrypted-media"></iframe>
        </div>
    )
}


export default MediaOverlay