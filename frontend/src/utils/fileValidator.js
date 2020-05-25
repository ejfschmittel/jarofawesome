

 
const MEDIA_TYPES = {
    VIDEO: "video",
    AUDIO: "audio",
    IMAGE: "image"
}

const PLATFORMS = {
    MEDIA: "media",
    YOUTUBE: "youtube"
}



const isYoutubeUrl = (url) => url.match(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)
const isVideoUrl = (url) => url.match(/\.(m4v|avi|mpg|mp4)$/)
const isAudioUrl = (url) => url.match(/\.(mp3)$/)
const isImageUrl = (url) => url.match(/\.(jpeg|jpg|gif|png)$/) 

const MEDIA_TYPE_VALIDATORS = {
    image: {
        validator: isImageUrl,
        info: {mediaType: MEDIA_TYPES.IMAGE, platform: PLATFORMS.MEDIA}
    },
    video: {
        validator: isVideoUrl,
        info: {mediaType: MEDIA_TYPES.VIDEO, platform: PLATFORMS.MEDIA}
    },
    youtube: {
        validator: isYoutubeUrl,
        info: {mediaType: MEDIA_TYPES.VIDEO, platform: PLATFORMS.YOUTUBE}
    },
    audio: {
        validator: isAudioUrl,
        info: {mediaType: MEDIA_TYPES.AUDIO, platform: PLATFORMS.MEDIA}
    },
}

class FileValidator {
    constructor(){
        this.errors = []
        this.data = {
            mediaType: null,
            platform: null,
            url: null     
        }
    }
    checkMediaType(url, validator, returnOptions){
        if (validator(url)){
            return returnOptions
        }
        return null;
    }

    validateMediaType = (url) => {
        let mediaOptions = null;

        console.log(MEDIA_TYPE_VALIDATORS)
         // loop through validate media types
        const keys = Object.keys(MEDIA_TYPE_VALIDATORS)
        for(let i = 0; i < keys.length; i++){
            const key = keys[i];
            const validationInfo = MEDIA_TYPE_VALIDATORS[key];
            console.log(MEDIA_TYPE_VALIDATORS)
            if(validationInfo){
                console.log(validationInfo)
                const result = this.checkMediaType(url, validationInfo.validator, validationInfo.info)
                if(result){
                    mediaOptions = result
                    break;
                }
            }
        }

        if(!mediaOptions) {
            this.errors.push("url: " + url + " is an unsuported media type");
            return false;
        }
       
        this.data = {...this.data,url,  ...mediaOptions}

        if(this.errors.length == 0) return true;
        return false
    }


    getErrors = () => {
        return this.errors;
    }

    getData = () => {
        return this.data;
    }
    
   
    
}



export default FileValidator






/*

const getUrlSearchParams = (url) => {
    url = url.split("?")[1];  
    return new URLSearchParams(url);   
}



export const isValidVideoUrl = (url) => {
    const videoMapKeys = Object.keys(videoMap)
    let platform, videoId = null;

    for(let i = 0; i < videoMapKeys.length; i++){
        const key = videoMapKeys[i];
        const videoOptions = videoMap[key];
        if(videoOptions.matches(url)){     
            platform = key;
            videoId = videoOptions.parseVideoId(getUrlSearchParams(url))
            break;
        }

    }

    console.log(platform)
    console.log(videoId);
    
    // return true if platform and video id have been identified
    return platform && videoId
}
*/

/* check images */
