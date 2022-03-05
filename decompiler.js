/**
Free Decompiler By Gvbvdxx!
Also, Support Me By Following Me On Scratch!:
https://scratch.mit.edu/users/gvbvdxx/
*/
const process = require('process');
const fs = require('fs');
process.title = "Gvbvdxx's Decompiling System";
const colorlog = require('./colorsystem'); //my color loging system (Used to log text in diffrent colors)
let unsafeTypes = [ //things that may be unsafe when using safe mode
	"exe","cue","iso","img"
];
colorlog.log("-------------------------------------",colorlog.colors.white)
colorlog.log("**Gvbvdxx's Decompiling System**",colorlog.colors.green)
colorlog.log("-------------------------------------",colorlog.colors.white)
colorlog.log("Please Wait While The Decompiler Decompiles The Files..",colorlog.colors.yellow)
colorlog.log("-------------------------------------",colorlog.colors.white)
let settings = JSON.parse(fs.readFileSync("settings.json"));
function checkIfUnsafe(type) {
	if (settings.safeMode) {
		if (unsafeTypes.indexOf(type)) {
			return true;
		}
	}
	return false;
}
try{
var index = 0;
var files = fs.readdirSync("./decompiled");
while (files.length > index) {
	try{
		fs.unlinkSync("./decompiled/"+files[index])
		colorlog.log("Deleting Exsisting File In Directory ./decompiled: " + files[index],colorlog.colors.blue)
	}catch(e){};
	index += 1;
}
}catch(e){}
try {
let filedata = fs.readFileSync("file.gcompiled");
let fileJSON = JSON.parse(filedata);
var i = 0;
while (fileJSON.names.length > i) {
	var name = fileJSON.names[i];
	colorlog.log("Add: "+ name,colorlog.colors.green);
	if (checkIfUnsafe(name.split('.').pop()) == true) {
		colorlog.log("WARNING: "+ name + " Is Marked Unsafe. The App Will Not Add This To The Folder.\nTo Fix This Change safeMode In settings.json To false.",colorlog.colors.green);
	} else {
		fs.writeFileSync("./decompiled/"+name,fileJSON.files[name].split(fileJSON.base64ids[i]).pop(),{encoding:"base64"});
	}
	i += 1;
}
colorlog.log("-------------------------------------",colorlog.colors.white)
colorlog.log("Decompile Complete!!",colorlog.colors.green)
colorlog.log("-------------------------------------",colorlog.colors.white)
colorlog.log("You Can Safely Close This Console Now.",colorlog.colors.green)
colorlog.log("Check The Folder Named decompiled For All The Extracted Files",colorlog.colors.green);
} catch(e) {
	colorlog.log("There was an error when trying to compile the files.",colorlog.colors.yellow);
	colorlog.log('Make sure you have the file named to "file.gcompiled"',colorlog.colors.yellow);
}
while (true) {
	
}