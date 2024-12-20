export default defineContentScript({
  matches: ['*://*.google.com/*'],
  main() {
    console.log('Hello content.');
  },
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "countButtons") {
    const connectButtons = Array.from(document.querySelectorAll('button')).filter(button => button.textContent.trim() === 'Connect');
    sendResponse({ totalButtons: connectButtons.length });
  }
});
