/**
Free Compiler By Gvbvdxx!
Also, Support Me By Following Me On Scratch!:
https://scratch.mit.edu/users/gvbvdxx/
*/
const colorlog = require('./colorsystem'); //my color loging system (Used to log text in diffrent colors)
try {
const fs = require("fs");
const process = require('process');
process.title = "Gvbvdxx's Compiling System";
colorlog.log("-------------------------------------",colorlog.colors.white)
colorlog.log("**Gvbvdxx's Compiling System**",colorlog.colors.green)
colorlog.log("-------------------------------------",colorlog.colors.white)
colorlog.log("Please Wait While The Compiler Compiles The Files..",colorlog.colors.yellow)
colorlog.log("-------------------------------------",colorlog.colors.white)
var i = 0;
var files = fs.readdirSync("./files");
var result = {files:{},filecount:0,names:[],base64ids:[]};
let filetypes = {
	//normal types
	wav:"audio",
	ogg:"audio",
	mp3:"audio",
	mp4:"video",
	avi:"video",
	svg:"image",
	png:"image",
	gif:"image",
	txt:"text",
	wmv:"video",
	ico:"image",
	js:"javascript"
};
let unsafeTypes = [ //things that may be unsafe
	/*"exe","cue","iso","img"*/
]; //safeMode is a replacement for this.
function getType(t) {
	var typewarning = "WARNING: This File Is Unknown For The Web Browser, It Will Not Become Compadible With The Browser";
	try {
		if (filetypes[t]) {
			return filetypes[t];
		} else {
			colorlog.log(typewarning,colorlog.colors.yellow);
			return "text";
		}
	}catch(e) {
		colorlog.log(typewarning,colorlog.colors.yellow);
		return "text";
	}
}
if (files.length == 0) {
	colorlog.log("No files to compile.",colorlog.colors.yellow)
}
else {
	while (files.length > i){
		colorlog.log("Adding File: " + files[i],colorlog.colors.blue);
		if (fs.lstatSync("./files/"+files[i]).isDirectory()) {
			colorlog.log("WARNING: This Is A Directory, Not A File! Files In This Directory Are Not Going To Be Compiled.",colorlog.colors.yellow);
		} else {
			try {
				var type = files[i].split(".").pop()
				if (!(unsafeTypes.indexOf(type) == -1)) {
					colorlog.log("WARNING: This Is An File That Can Be Extucuted, For Saftey Reasons You Can Not Compile This File.",colorlog.colors.yellow);
				} else {
					result.files[files[i]] = ("data:"+getType(type)+"/"+type+";base64,"+fs.readFileSync("./files/"+files[i], {encoding:"base64"}));
					colorlog.log("File Added: " + files[i],colorlog.colors.green);
					result.filecount += 1;
					result.names.push(files[i]);
					result.base64ids.push("data:"+getType(type)+"/"+type+";base64,");
				}
			} catch(e) {
				colorlog.log("ERROR: Can not Compile: " + files[i],colorlog.colors.red);
				colorlog.log("Check If The File Has Read Access." + files[i],colorlog.colors.red);
			}
		}
		i += 1;
	}
	fs.writeFileSync("./file.gcompiled",JSON.stringify(result));
	colorlog.log("-------------------------------------",colorlog.colors.white)
	colorlog.log("Compile Complete!!",colorlog.colors.green)
	colorlog.log("-------------------------------------",colorlog.colors.white)
	colorlog.log("You Can Safely Close This Console Now.",colorlog.colors.green)
	colorlog.log("Check The Folder For The file.gcompiled File.",colorlog.colors.green)
}
} catch(e) {
	colorlog.log(e,colorlog.colors.red) //Usefull for debuging what went wong.
}
while (true) {
	//stay open untill the user closes it
}