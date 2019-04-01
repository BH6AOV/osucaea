//A basic Autorun.inf parser, No.. It was a general INF/INI (and alike) parser with some specification
//adapted to osu2arc

const INFIParser = function(lines,ids){
	let parsed = [], parsedArray = [],temp = {lineToParse:0,id:0,idparse:0}
	var ids = ids || []
	this.parsedString = parsedArray
	window.temp = temp; window.parsedArray = parsedArray;window.parsed = parsed
	window.ids = ids
	const parseString = function(input){
		temp.inParse = input
		const lines = input.split('\n')
		temp.id = getIdentifier(lines[temp.lineToParse])
		if(lines[temp.lineToParse]!=''){
		parsedArray[temp.id][parsedArray[temp.id].length] = lines[temp.lineToParse]
		}
		//console.log(lines,lines[temp.lineToParse])
		if(lines[temp.lineToParse+1]!=undefined){
			//console.log('Valid next line, Proceed..')
			temp.lineToParse++
			parseString(temp.inParse)
		}else{
			report('Finished Line Parsing')
			temp.lineToParse = 0
		}
		return parsedArray
	}
	const concatString = function(Array,contype,start,end){
		var trueEnd = end || Array.length, con = ''
		for(a=start;a<trueEnd;a++){
			if(a>start){
				con += contype+Array[a]
			}else{
				con += Array[a]
			}
		}
		return con
	}
	const autoGetIdentifier = function(input){
		temp.inParseID = input
		const lines = input.split('\n')
		//console.log(lines)
		const charc = lines[temp.idparse].split('')
		if(charc[0]=='['){
			ids[ids.length] = lines[temp.idparse]
		}
		if(lines[temp.idparse+1]!=undefined){
			//console.log('Valid next line, Proceed..')
			temp.idparse++
			autoGetIdentifier(temp.inParseID)
		}else{
			report('Finished Identifier Parser')
			temp.idparse = 0
		}
	}
	const getIdentifier = function(line){var id =ids;var idx = temp.id, txd = idx;for(l in id){var d1 = id[l].split(''), d2 = line.split(''), d3 = '', d4 = '';for(g in d2){d3+=d1[g], d4 += d2[g]};if(d4.toLowerCase() == d3.toLowerCase()){txd = Number(l);};};return txd}
	const getProperties = function(){
		for(y in parsedArray){
			var lastprop = ids[y].replace('[','').replace(']','')
			parsed[lastprop] = {}
			for(x in parsedArray[y]){
				var vx = parsedArray[y][x].split(':')
				if(vx[1]!=undefined){
					if(!isNaN(Number(vx[1]))){
						parsed[lastprop][vx[0]]= Number(vx[1])
					}else{
						parsed[lastprop][vx[0]] = concatString(vx,':',1)
					}
				}
			}
		}
	}
	let report = function(string){console.log(string)}
	if(ids.length==0){
		autoGetIdentifier(lines)
	}
	for(y in ids){
		parsedArray[y] = []
	}
	parseString(lines)
	getProperties()
	this.parsedProperties = parsed
	this.parsedArraysProperties = parsedArray
	return JSON.stringify(parsed)
}