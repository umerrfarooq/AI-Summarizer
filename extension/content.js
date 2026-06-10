chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getPageContent") {
        const text = document.body.innerText.substring(0, 8000);
        const title = document.title;
        const url = document.location.href;
        sendResponse({ text, title, url });

    }
    return true;
})