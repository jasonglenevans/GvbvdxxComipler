module.exports = {
	colors:{
		red:'\x1b[31m%s\x1b[0m',
		green:'\x1b[32m%s\x1b[0m',
		yellow:'\x1b[33m%s\x1b[0m',
		blue:'\x1b[34m%s\x1b[0m',
		white:null
	},
	log: function (text,color) {
		if (color) {
			console.log(color,text);
		} else {
			console.log(text);
		}
	}
}