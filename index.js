var sharp = require('sharp')
  
var fs = require('fs');
 
const FILE_NAME= 'images.zip';
 
function isImage(file)
{
	let ext= file.split('.').pop().toLowerCase();
	return ['jpg','png','gif','jpeg'].indexOf(ext) >=0 ;
}
function executeImage(path)
{
	let ext= path.split('.').pop().toLowerCase();
	console.log(ext);
	let s = sharp(path)
	  .blur(10);
	if(ext == "jpg")
	{
	 s.jpeg({
		quality: 60,
	   // chromaSubsampling: '4:4:4'
	  })
	}
	if(ext =="png")
	{
		s.png({
			quality: 60,
		   // chromaSubsampling: '4:4:4'
		  })
	}
	 s.toFile(path+'.bak' ).then(info => { 
	   fs.unlinkSync(path, function(e){
		   console.log(e)
	 	   
	   }) 
	   fs.renameSync(path+'.bak',path, function(){});
	  }).catch(  (e) =>{
		  console.log(e);
	  });
	  
	  
	  
}
function readFolder(path)
{
	var files = fs.readdirSync(path);
			files.forEach(
			
			(file) => 
			{
				
				if(fs.lstatSync(path + '/' + file).isDirectory())
				{
					readFolder(path + '/' + file)
				}
				else if(fs.lstatSync(path + '/' + file).isFile()&& isImage(path + '/' + file))
				{
					executeImage(path + '/' + file);
				}
				 
			}
		)
			
		  
}
readFolder('./input');

