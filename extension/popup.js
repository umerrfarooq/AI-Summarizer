const BACKEND_URL = "http://localhost:5000";

document.getElementById("summarize-btn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Get page content via content script
    const { text, title, url } = await chrome.tabs.sendMessage(tab.id, {
        action: "getPageContent"
    });

    document.getElementById("loading").classList.remove("hidden");

    const res = await fetch(`${BACKEND_URL}/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, title, url })
    });

    const data = await res.json();
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("summary-text").textContent = data.summary;
    document.getElementById("summary-box").classList.remove("hidden");

    // Store for export
    chrome.storage.local.set({ lastSummary: data.summary, lastTitle: title, lastUrl: url });
});

document.getElementById("export-btn")?.addEventListener("click", async () => {
    const { lastSummary, lastTitle, lastUrl } = await chrome.storage.local.get([
        "lastSummary", "lastTitle", "lastUrl"
    ]);

    const res = await fetch(`${BACKEND_URL}/export-notion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: lastSummary, title: lastTitle, url: lastUrl })
    });

    const data = await res.json();
    document.getElementById("status").textContent = data.message;
});