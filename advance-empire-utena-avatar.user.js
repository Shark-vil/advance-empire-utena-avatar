// ==UserScript==
// @name         AlexandriА Utena Avatar
// @namespace    https://shark.vincy.ru/
// @version      2.0.0
// @description  Правильная аватарка.
// @author       Shark_vil
// @updateURL    https://github.com/Shark-vil/advance-empire-utena-avatar/raw/master/advance-empire-utena-avatar.user.js
// @downloadURL  https://github.com/Shark-vil/advance-empire-utena-avatar/raw/master/advance-empire-utena-avatar.user.js
// @match        *://*.vk.com/im*
// @match        *://*.vk.com/groups
// @match        *://*.vk.com/advance_empire*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

const regexReplace = /background-image\:.+url\(\'(.+)\?/;
const rightAvatar = "https://i.ibb.co/JptVWP1/alexandria.png";
const pictures = [
    'https://sun1-16.userapi.com/s/v1/ig2/KWGkGCM9BdZ7yLKqHBTOSIxCkAfJJZyczwUhXuj-APTyIZTVFfSP6_Y3b6gKY0xxeQGW0jJu1yglT4cBn-6qxrYD.jpg',
    'https://sun1-16.userapi.com/s/v1/ig2/bW5TpYYu6HfZ1J-uZ06vByxuxKjbXMKtnRhG_QDUYLQY0tCR0dFdwdgO_DdAmusfogBa1AicgoTTTK88ZienrkB3.jpg',
    'https://sun1-16.userapi.com/impg/irwOFePCQt6s27yViJDvO00Bvp-ieUq63iarqQ/dX15e3ESvSo.jpg',
    'https://sun1-16.userapi.com/s/v1/if2/uYLaiIi62sNnrADHmvHct6uaxwIF_ki2TmLfp9Ld_dxDvd7JG_v7HXzoH0RwSYz1G8sbhDlPdNj-stuqllAA1khO.jpg'
];

function imgFunc(img, index, collection)
{
    if (img._isReplacementAvatar == undefined && img.src != rightAvatar)
    {
        //console.log('[AAUA] check image - ' + img);
        for (const picture of pictures) {
            if (img.src.indexOf(picture) == 0) {
                console.log('[AAUA] Replace image - ' + picture);
                img._isReplacementAvatar = true;
                img.src = rightAvatar;
                break;
            }
        }
    }
}

function owAvasFunc(divBlock, index, collection) {
    if (divBlock._isReplacementAvatar == undefined)
    {
        //console.log('[AAUA] Check image div - ' + divBlock);
        const styleValue = divBlock.getAttribute('style');
        if (styleValue == undefined) return;
        const matchValues = styleValue.match(regexReplace);
        if (matchValues != undefined && matchValues.length > 1) {
            const styleUrlValue = matchValues[1];
            for (const picture of pictures) {
                if (picture == styleUrlValue) {
                    console.log('[AAUA] Replace image style - ' + picture);
                    divBlock._isReplacementAvatar = true;
                    divBlock.setAttribute('style', styleValue.replace(picture, rightAvatar));
                    break;
                }
            }
        }
    }
}

function updateImageSources()
{
    const allImages = document.querySelectorAll('img');
    allImages.forEach(imgFunc);

    const owAvas = document.querySelectorAll('.ow_ava,.Avatar__image');
    owAvas.forEach(owAvasFunc);
}

function callbackFunc(mutationsList, observer)
{
    console.log('[AAUA] Listen images created');
    for (const mutation of mutationsList)
    {
        if (mutation.type == 'childList') updateImageSources();
    }
}

function onWindowLoaded(evt)
{
    console.log('[AAUA] Init - AlexandriА Utena Avatar');
    const targetNode = document.body;
    const config = {attributes:true, childList:true, subtree: true};
    const observer = new MutationObserver(callbackFunc);
    observer.observe(targetNode, config);
}
window.addEventListener('load', onWindowLoaded, false);