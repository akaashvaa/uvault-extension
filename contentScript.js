// Listen for messages from the extension
console.log('Message received in content script:')

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log('hit....')
  if (request.action === 'getLocalStorageData') {
    // Retrieve data from localStorage based on the key sent in the message
    const userId = localStorage.getItem('userId')
    chrome.storage.sync.set({ userId: userId })
  }
})
