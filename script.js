document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('btn')
  const mainWeb = document.getElementById('mainWeb')

  if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
    var browser = chrome
  }

  chrome.tabs.query(
    { url: 'https://uvault-phi.vercel.app/*' },
    function (tabs) {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'getLocalStorageData',
        })
      } else {
        console.log('No matching tab found')
      }
    }
  )

  btn.addEventListener('click', function () {
    btn.disabled = true
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = {
        url: tabs[0].url,
        title: tabs[0].title,
        postId: uuid.v4(),
      }

      browser.runtime.sendMessage({ type: 'bookmark', tab }, (response) => {
      
        if (response?.status) {
          btn.style.background = 'linear-gradient(to bottom, #E6FFE6 0%, #CCFFCC 100%)'
          btn.innerHTML = 'Added'
        } else {
          btn.style.background = 'linear-gradient(to bottom, #FFE6E6 0%, #FFCCCC 100%)';
          btn.innerHTML = 'Failed'
          mainWeb.style.display = 'flex'
        }
        setTimeout(() => {
          btn.disabled = false
          btn.attributeStyleMap.clear()
          btn.innerText = 'Bookmark'
        }, 5000)
      })
    })
  })
})
