function readFile(file){
	var r = new FileReader()
	r.onload = function(e){
		document.getElementById('hasil').value = osu2arc(e.target.result)
	}
	r.readAsText(file)
}
