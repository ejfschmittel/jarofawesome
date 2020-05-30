import React, {useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useMutation} from "@apollo/react-hooks"
import {GET_OR_CREATE_SHARE_LINK} from "../graphql/memories.schemas"




const MemoryShareButton = ({memoryId}) => {
    const [getOrCreateShareLink, {loading, error, data}] = useMutation(GET_OR_CREATE_SHARE_LINK)
    const [hasCopied, setHasCopied] = useState(false)
    const [isCopyMode, setIsCopyMode] = useState(false)

    const [linkText, setLinkText] = useState("")

    const onCopy = () => {
        setHasCopied(true)
        setTimeout(() => {
            setHasCopied(false)
        },2000)
    }

    const getShareLink = async (e) => {
        e.preventDefault();
        
        try {
            if(!memoryId) throw new Error("missing memory id")
            const {data: {getOrCreateShareLink: {memoryShareLink}}} = await getOrCreateShareLink({
                variables: {
                    memoryId: memoryId
                }
            })

            // replace with root url
            if(memoryShareLink.hashKey){
                const linkUrl = `localhost:3000/m/${memoryShareLink.hashKey}`
                setLinkText(linkUrl)
                setIsCopyMode(true)
            }
        }catch(e){
            // handle error
            console.log(e)
        }      
    }

    return (
        <div className="memory-share-btn">
            <div className="memory-share-btn__body">


                {!isCopyMode ? (
                    <button className="memory-share-btn__btn" onClick={getShareLink}>
                        Share
                    </button>  
                ): (
                    <CopyToClipboard text={linkText} onCopy={onCopy}>
                        <div className="memory-share-btn__link-display" >                       
                            <input type="text" value={linkText} disabled={true} />    
                            {hasCopied && <div className="memory-share-btn__copy-message">Link copied...</div>}
                        </div>
                    </CopyToClipboard>
                )}
               
            </div>
           
        </div>
    )
}

export default MemoryShareButton