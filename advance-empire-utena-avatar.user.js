// ==UserScript==
// @name         AlexandriА Utena Avatar
// @namespace    https://shark.vincy.ru/
// @version      2024-02-11:2
// @description  Правильная аватарка.
// @author       Shark_vil
// @updateURL    https://github.com/Shark-vil/advance-empire-utena-avatar/raw/master/advance-empire-utena-avatar.user.js
// @downloadURL  https://github.com/Shark-vil/advance-empire-utena-avatar/raw/master/advance-empire-utena-avatar.user.js
// @match        *://*.vk.com/im*
// @match        *://*.vk.com/groups
// @match        *://*.vk.com/advance_empire*
// @match        *://*.vk.com/feed
// @match        *://*.vk.com/feed?w=wall-34788285_*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

const regexReplace = /background-image\:.+url\(\'(.+)\?/;
const rightAvatar = "https://i.ibb.co/JptVWP1/alexandria.png";

function isValidImageToCahnge(element) {
    if (element == undefined || element._isReplacementAvatar || element.src == rightAvatar) {
        return false;
    }
    const altValue = element.getAttribute('alt');
    if (altValue != undefined && altValue == 'AlexandriА (Аниме новости)') {
        return true;
    }
    return false;
}

function isValidElementToCahnge(element) {
    if (element == undefined || element._isReplacementAvatar) {
        return false;
    }
    if (element.tagName == 'A') {
        const hrefValue = element.getAttribute('href');
        if (hrefValue == undefined || hrefValue.indexOf('/advance_empire') != 0) {
            return false;
        }
    }
    return true;
}

function changeImageFunc(imgElement) {
    if (isValidImageToCahnge(imgElement)) {
        console.log('[AAUA] Replace image - ' + imgElement.src);
        imgElement._isReplacementAvatar = true;
        imgElement.src = rightAvatar;
    }
}

function changeGeneralImageFunc(imgElement) {
    if (isValidElementToCahnge(imgElement) && imgElement.src != rightAvatar) {
        console.log('[AAUA] Replace image - ' + imgElement.src);
        imgElement._isReplacementAvatar = true;
        imgElement.src = rightAvatar;
    }
}

function changeImageByClassFunc(element) {
    if (isValidElementToCahnge(element)) {
        const styleValue = element.getAttribute('style');
        if (styleValue == undefined) return;
        const matchValues = styleValue.match(regexReplace);
        if (matchValues != undefined && matchValues.length > 1) {
            const urlValue = matchValues[1];
            console.log('[AAUA] Replace image style - ' + urlValue);
            element._isReplacementAvatar = true;
            element.setAttribute('style', styleValue.replace(urlValue, rightAvatar));
        }
    }
}

function changeNoNameImageFunc(element) {
    if (isValidElementToCahnge(element)) {
        element._isReplacementAvatar = true;
        const allImages = element.querySelectorAll('img');
        allImages.forEach(changeGeneralImageFunc);
    }
}

function updateImageSources() {
    // const generalAvatarImage = document.getElementById('pv_photo');
    // if (generalAvatarImage != undefined && window.location.href.indexOf('vk.com/advance_empire') == 0) {
    //     const allGeneralAvatarImages = document.querySelectorAll('img');
    //     const imgElement = allGeneralAvatarImages[0];
    //     if (imgElement != undefined) {
    //         console.log('[AAUA] Replace image - ' + imgElement.src);
    //         imgElement._isReplacementAvatar = true;
    //         imgElement.src = rightAvatar;
    //     }
    // }

    const allImages = document.querySelectorAll('img');
    allImages.forEach(changeImageFunc);

    const allImagesByClass = document.querySelectorAll('.ow_ava,.Avatar__image');
    allImagesByClass.forEach(changeImageByClassFunc);

    const allNoNameImages = document.querySelectorAll('a');
    allNoNameImages.forEach(changeNoNameImageFunc);
}

function callbackFunc(mutationsList, observer) {
    console.log('[AAUA] Listen images created');
    for (const mutation of mutationsList) {
        if (mutation.type == 'childList') updateImageSources();
    }
}

function onWindowLoaded(evt) {
    console.log('[AAUA] Init - AlexandriА Utena Avatar');
    const targetNode = document.body;
    const config = {attributes:true, childList:true, subtree: true};
    const observer = new MutationObserver(callbackFunc);
    observer.observe(targetNode, config);
}
window.addEventListener('load', onWindowLoaded, false);