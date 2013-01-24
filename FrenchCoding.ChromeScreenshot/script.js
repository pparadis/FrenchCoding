chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.captureVisibleTab(tab.windowId, {"format": "png"}, function(img) {
  	console.log(img.replace('data:image/png;base64,',''));
    $.post('http://localhost:4567/image', 
    	{
    		imageData: img.replace('data:image/png;base64,',''),
    		imageName : ""
    	}, 
    	function (data) { 
    		console.log(data)
    	}
	);
  });
});