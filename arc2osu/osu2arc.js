/**
========== osu! to Arcaea Beatmap Convert Utility ==========
v 1.0                                            by EmiyaSyahriel

For now, It currently supports hold and tap notes, no arcs

osu! Beatmap requirements:
- 4K osu!mania only
- A pure osu!mania, indicated by several 128s in note type
  If you look inside the .osu file with text editors

TODOs:
- Support for other osu! beatmap modes
- Support non-4K osu!mania
- Ability to convert osu!std sliders to Arcaea arc note.

Phone Requirement:
- Rooted Android
- Arcaea + Obb (Both Play Store and Mod APKs are working)
- Root-capable File Explorer

Preparation:
- Ogg version of the osu!song
	> you can convert the mp3 yourself using FormatFactory
	> Rename it to the song you want to replace + "_base"
	  e.g: "halcyon_base.ogg" , "inkarusi_base.ogg"
- A JPEG Album image, one 256x256 and 512x512
	> rename it to "base_256.jpg" for the 256x256
	> and base.jpg for the 512x512
- Prepared file is:
	+ base_256.jpg
	+ base.jpg
	+ 0.aff
	+ 1.aff
	+ 2.aff
	+ [songname]_base.ogg

How To Mod:
- Launch Arcaea then minimize when tap-to-start
  screen appear
- Open your File Explorer
- Navigate to /mnt/obb/
- Find Arcaea's folder, it contains [songname]_base.ogg
  in it's directory
- Replace the Original Song OGG to the one you have
- Navigate to [Arcaea folder]/songs/[songname]
  They usually contains:
  + base.jpg : Album Art 512x512
  + base_256.jpg : Album Art 256x256
  + 0.aff : Past Beatmap
  + 1.aff : Present Beatmap
  + 2.aff : Future Beatmap
- Replace the file the with the one you have
- Back to Arcaea, Now find the song you replace and play it!
- Enjoy!

Tips:
- You cannot change the song name since they are contained
  in the APK, except you mod the APK itself
- Always replace songs that you've unlocked, since you can
  play it right away.
- Obb changes is permanent. therefore, you shall make a
  backup first or you need to re-download the full game
- You can share the Obb you've mod with others, but only
  with the same game version.
- Even though it's fun, I can consider it as a cheat since
  you can make a simple map and easy-unlock other songs.
- This utility only convert osu!beatmap to a valid
  Arcaea beatmap text, Text Editor is needed for saving.
- osu!mania lanes were full-screen height but Arcaea
  is half-screen perspective, you may notice speed
  difference and increased difficulty there.
- Standard OGG Bitrate for Arcaea is 192Kbps.
- If Arcaea is frozen/force-closed after you select the
  song, then there must be something wrong with the
  .aff you made

**/

var osu2arcCfg = {
	noteSpeedDivider:2
}

function osu2arc(lines){
	var newLines = []
	if(!INFIParser){
		return new Error('UnkoError','INFIParses is undefined!')
	}
	
	var infi = new INFIParser(lines)
	
	var osu = infi.parsedProperties
	var osua = infi.parsedArraysProperties
	 
	//search for timing point in cut texts
	var osuaIndex = 0, beats = undefined, tp = undefined
	while(osuaIndex<osua.length){
		console.log(osua[osuaIndex][0].trimEnd() == '[TimingPoints]', osua[osuaIndex][0])
		switch(osua[osuaIndex][0].trimEnd()){
			case '[TimingPoints]':tp = osua[osuaIndex];break;
			case '[HitObjects]':beats = osua[osuaIndex];break;
		}
		osuaIndex++
	}

	console.log("tp/beats",tp,beats)
	
	var arcBeats = []
	 
	// check for standalone timing point (not the inherited one)
	var remappedTP = tp.filter(tp => {return (tp.split(',')[6] == '1')})
	
	var circles = beats.filter(beat => {var ints = beat.split(',');return (ints[3] == 1 || ints[3] == 5)})
	var holds = beats.filter(beat => {var ints = beat.split(',');return ints[3] == 128})
	
	for(i = 0; i<remappedTP.length; i++){
		var args = remappedTP[i].split(','), cur = arcBeats.length
		arcBeats[cur] = {}
		arcBeats[cur].type = 'timing'
		arcBeats[cur].startTime = Math.round(Number(args[0]))
		arcBeats[cur].bpm = (Number(args[1])/osu2arcCfg.noteSpeedDivider).toFixed(2)
	}
	
	for(i = 0;i<circles.length;i++){
		var args = circles[i].split(','), cur = arcBeats.length
		arcBeats[cur] = {}
		arcBeats[cur].type = 'tap'
		arcBeats[cur].lane = 1+((Number(args[0])-64)/128) || 1
		arcBeats[cur].startTime = Number(args[2])
	}
	
	for(i = 0;i<holds.length;i++){
		var args = holds[i].split(','), cur = arcBeats.length
		arcBeats[cur] = {}
		arcBeats[cur].type = 'hold'
		arcBeats[cur].lane = 1+((Number(args[0])-64)/128) || 1
		arcBeats[cur].startTime = Number(args[2])
		arcBeats[cur].endTime = Number(args[5].split(':')[0])
	}
	
	function sortByStart(a,b){
		const startA = a.startTime, startB = b.startTime;let com = 0;if(startA > startB){com = 1}else{com = -1};return com
	}
	
	arcBeats = arcBeats.sort(sortByStart)
	console.log(arcBeats)
	
	function arcaeaAffGenerator(beats){
		var aff = ["AudioOffset:0","-"]
		for(i in beats){
			var d = aff.length
			if(beats[i].type == 'timing'){
				aff[d] = 'timing('+beats[i].startTime+','+beats[i].bpm+',4.00);'
			}else if(beats[i].type == 'tap'){
				aff[d] = '('+beats[i].startTime+','+beats[i].lane+');'
			}else if(beats[i].type == 'hold'){
				aff[d] = 'hold('+beats[i].startTime+','+beats[i].endTime+','+beats[i].lane+');'
			}
		}
		console.log(aff)
		return aff.join('\n')
	}
	
	return arcaeaAffGenerator(arcBeats)
}