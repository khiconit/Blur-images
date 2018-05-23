var fs = require('fs');
var httpRequest = require('request');
var images = fs.readFileSync('input.txt','utf-8');
images = JSON.parse(images );
for(let i in images)
{
	let url = images[i]
	download(url);
}

function download(url)
{
	var image = url.split('?')[0].split('/').pop();
	console.log(image);
	httpRequest.get({url: url, encoding: 'binary'}, function (err, httpResponse, body) {
  
	  fs.writeFile('downloads/'+ image, body, 'binary', function(err) {
		if(err) { 
		  console.log('Error: '+err);
		} else {  
		  console.log('Saved image');
		}
	  }); 
	});
}