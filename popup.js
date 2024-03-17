document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('groupTabsButton').addEventListener('click', function() {
    chrome.tabs.query({}, function(tabs) {
      // Create a dictionary to keep track of URLs and their corresponding tabs
      const urlMap = {};

      // Iterate through tabs and populate the urlMap
      tabs.forEach(tab => {
        const url = tab.url;
        if (urlMap[url]) {
          // If a tab with the same URL already exists, group it
          chrome.tabs.group({ tabIds: [tab.id] }, function() {
            // Close the tab after grouping
            chrome.tabs.remove(tab.id);
          });
        } else {
          // Otherwise, add it to the urlMap
          urlMap[url] = tab.id;
        }
      });
    });
  });
});
