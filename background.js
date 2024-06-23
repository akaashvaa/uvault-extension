if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
  var browser = chrome
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'bookmark') {
    console.log('hooraayyyy')
    const { url, title, postId } = message.tab
    let userId = ''

    chrome.storage.sync.get(['userId'], function (result) {
      if (result.userId) {
        userId = result.userId
        // console.log('bg.js => User ID retrived from storage  ', result.userId)

        const bookmarkData = { url, title, postId, userId }
        console.log(bookmarkData)
        sendBookmarkToServer(bookmarkData, sendResponse)
      } else {
        console.log('user id doesnt exist')
        sendResponse({ status: false })
      }
    })
    return true
  }
})

function sendBookmarkToServer(bookmarkData, sendResponse) {
  fetch('https://uvault-sever.vercel.app/api/v1/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookmarkData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      console.log('post', data)
      sendResponse({ status: true })
    })
    .catch((error) => {
      console.log(error)
      sendResponse({ status: false })
    })
}
