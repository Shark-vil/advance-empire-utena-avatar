// ==UserScript==
// @name         AlexandriА Utena Avatar
// @namespace    https://shark.vincy.ru/
// @version      2024-02-06
// @description  Правильная аватарка.
// @author       Shark_vil
// @match        *://*.vk.com/im
// @match        *://*.vk.com/im?*
// @match        *://*.vk.com/im/*
// @match        *://*.vk.com/groups
// @match        *://*.vk.com/advance_empire
// @match        *://*.vk.com/advance_empire/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

const rightAvatar = "https://i.ibb.co/JptVWP1/alexandria.png";
let groupAvatarHasReplacment = false;
let groupAvatarHasReplacmentDialogPreview = false;
//let isFirstLaunch = true;
//let isScrolled = false;
//let scrolledTimer = undefined;
let yieldTimeMs = 10;

const sleepAsync = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function imageIsChanged(imageElement) {
    if (imageElement === undefined || imageElement.src === rightAvatar) return true;
    return false;
}

function setImageNewAvatar(imageElement) {
    if (imageIsChanged(imageElement)) return;
    imageElement.src = rightAvatar;
}

async function replaceGroupAvatarAsync() {
    const avatarElements = document.getElementsByClassName("AvatarRich__img");
    if (avatarElements !== undefined && avatarElements.length != 0) {
        for (const avatar of avatarElements) {
            if (avatar._rightAvatarHasChecked !== undefined && avatar._rightAvatarHasChecked == true) {
                await sleepAsync(yieldTimeMs);
                continue;
            }
            avatar._rightAvatarHasChecked = true;
            if (avatar.getAttribute('alt') == 'AlexandriА (Аниме новости)') {
                setImageNewAvatar(avatar);
            }
            await sleepAsync(yieldTimeMs);
        }
    }
}

async function replaceGroupListAvatarAsync() {
    const elements = document.getElementsByClassName("group_row_photo");
    if (elements !== undefined && elements.length != 0) {
        for (const element of elements) {
            if (element._rightAvatarHasChecked !== undefined && element._rightAvatarHasChecked == true) {
                await sleepAsync(yieldTimeMs);
                continue;
            }
            element._rightAvatarHasChecked = true;
            const elementLink = element.querySelector('a');
            if (elementLink === undefined || elementLink.getAttribute('href').indexOf('/advance_empire') != 0) {
                continue;
            }
            const avatar = elementLink.querySelector('img');
            if (avatar === undefined) {
                continue;
            }
            setImageNewAvatar(avatar);
            await sleepAsync(yieldTimeMs);
        }
    }
}

async function replaceMessageAvatarAsync() {
    const dialogElements = document.getElementsByClassName("_im_header_link");
    if (dialogElements !== undefined && dialogElements.length != 0) {
        for (const dialogElement of dialogElements) {
            if (dialogElement._rightAvatarHasChecked !== undefined && dialogElement._rightAvatarHasChecked == true) {
                await sleepAsync(yieldTimeMs);
                continue;
            }
            dialogElement._rightAvatarHasChecked = true;
            if (dialogElement.getAttribute('href') == '/advance_empire') {
                const avatar = dialogElement.querySelector('img');
                setImageNewAvatar(avatar);
            }
            await sleepAsync(yieldTimeMs);
        }
    }

    const imageContainerElements = document.querySelectorAll(".im_grid,.post_image_stories");
    if (imageContainerElements !== undefined && imageContainerElements.length != 0) {
        for (const imageContainer of imageContainerElements) {
            if (imageContainer._rightAvatarHasChecked !== undefined && imageContainer._rightAvatarHasChecked == true) {
                await sleepAsync(yieldTimeMs);
                continue;
            }

            const imageElement = imageContainer.querySelector('img');
            if (imageElement === undefined) {
                continue;
            }

            if (imageElement.getAttribute('alt') == 'AlexandriА (Аниме новости)') {
                setImageNewAvatar(imageElement);
            } else {
                imageContainer._rightAvatarHasChecked = true;
            }
            await sleepAsync(yieldTimeMs);
        }
    }
}

async function parseAvatarsAsync() {
    const url = window.location.href;
    if (url.indexOf('https://vk.com/advance_empire') == 0 || url.indexOf('https://vk.com/groups') == 0) {
        if (url.indexOf('https://vk.com/groups') == 0) await replaceGroupListAvatarAsync();
        await replaceGroupAvatarAsync();
    } else if (url.indexOf('https://vk.com/im') == 0) {
        await replaceMessageAvatarAsync();
    }
}

/*
window.addEventListener('scroll', async function() {
    if (scrolledTimer !== undefined) clearTimeout(scrolledTimer);
    scrolledTimer = setTimeout(() => { isScrolled = false }, 1000);
    isScrolled = true;
}, false);
*/

window.addEventListener('load', async function() {
    while (true) {
        //if (isScrolled || isFirstLaunch) await parseAvatarsAsync();
        //if (isFirstLaunch) isFirstLaunch = false;
        await parseAvatarsAsync();
        await sleepAsync(yieldTimeMs);
    }
}, false);