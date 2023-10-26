document.addEventListener('DOMContentLoaded', function () {
    const modifyButton = document.getElementById('modify');

  
    modifyButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("onClick");
        const tab = tabs[0];
        //const prefix = prefixInput.value;
        //const suffix = suffixInput.value;
        currentURL = tab.url;

        regex = /youtube.com/g;

        currentURL = currentURL.replace(regex,"youtube-nocookie.com");

        regex = /watch\?v=/g;

        currentURL = currentURL.replace(regex,"embed/");

        regex = /&.*$/g;

        currentURL = currentURL.replace(regex,'');



        console.log("new URL: " + currentURL);
        console.log("tab is " + tab.id);
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: (url) => {
            console.log("changing URL");
            window.location.href = url;
          },
          args: [currentURL]
        });      
    });
    });
});