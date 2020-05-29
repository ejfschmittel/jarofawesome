import React, {useState} from 'react'


const MediaOverlayContext = React.createContext({})

export const MediaOverlayContextProvider = ({children}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [currentItem, setCurrentItem] = useState(0)



    const hideOverlay = () => {
        setIsVisible(false)
        setCurrentItem(-1)

        // disable all youtube videos
        var iframes = document.getElementsByTagName("iframe");
        if (iframes != null) {
            for (var i = 0; i < iframes.length; i++) {
                iframes[i].src = iframes[i].src; //causes a reload so it stops playing, music, video, etc.
            }
        }
    }

    const setItemAndShow = (index) => {
        setCurrentItem(index)
        setIsVisible(true)
    }

    const moveLeft = () => {
        setCurrentItem(currentItem - 1)
    }

    const moveRight = () => {
        setCurrentItem(currentItem + 1)
    }


    return (
        <MediaOverlayContext.Provider
            value={{
                isVisible,
                setIsVisible,
                currentItem,
                setItemAndShow,
                hideOverlay,
                moveLeft,
                moveRight
            }}
        >
            {children}
        </MediaOverlayContext.Provider>
    )
}




export default MediaOverlayContext