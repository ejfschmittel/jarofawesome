from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
import urllib.request

import re
STD_AUDIO = "STD_AUDIO"

MEDIA_TYPES = {
    "STD_IMAGE": "image",
    "YOUTUBE": "youtube",
    "STD_VIDEO": "video",
    "STD_AUDIO": "audio",
}



def is_image_url(url):
    print(url)
    r = urllib.request.urlopen(url)
    maintype = r.headers.get_content_maintype()
    if maintype == "image":
        return True
    return False


def is_youtube_url(url):
    youtube_regex = (
        r'(https?://)?(www\.)?'
        '(youtube|youtu|youtube-nocookie)\.(com|be)/'
        '(watch\?v=|embed/|v/|.+\?v=)?([^&=%\?]{11})')

    youtube_regex_match = re.match(youtube_regex, url)
    if youtube_regex_match:
        return True
    return False

def is_video_url(url):
    r = urllib.request.urlopen(url)
    maintype = r.headers.get_content_maintype()
    if maintype == "video":
        return True
    return False

MEDIA_TYPES_VALIDATORS = {
    "STD_IMAGE": is_image_url,
    "YOUTUBE": is_youtube_url,
    "STD_VIDEO": is_video_url
}

def is_valid_url(url):
    validate = URLValidator()
    try:
        validate(url)
        return True
    except ValidationError as e:
        return False

def validate_external_url(url):
    if is_valid_url(url):
        for key, validator in MEDIA_TYPES_VALIDATORS.items():
            if validator(url):
                return MEDIA_TYPES[key]
    return False