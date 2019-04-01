# osu2arc.js (minimal) : an osu! to Arcaea Beatmap Convert Tool
## by EmiyaSyahriel
For now, It currently supports hold and tap notes, no arcs. This tool is written in *pure* JavaScript, **HTML** file or **node.js** is needed



### osu! Beatmap requirements:
- 4K osu!mania only
- A pure osu!mania, indicated by several 128s in note type if you look inside the .osu file with text editors



### Phone Requirement:
- **Rooted** Android
- A copy of **osu! game** to open **.osz file (osu! beatmap pack)**
- Arcaea + with Obb (Both **Play Store** and **Mod APK**s are working, don't worry about it)
- Root-capable **File Explorer**



### Preparation:
- **Ogg version of the osu!song**, you can convert the mp3 yourself using **FormatFactory**. Rename it to the **song you want to replace + "_base"**, e.g: "**halcyon_base.ogg**" , "**inkarusi_base.ogg**"
- **A JPEG Album image**, one **256x256 and 512x512**, rename it to **base_256.jpg** for the 256x256
  and **base.jpg** for the 512x512, You can edit the exisiting osu! map background to make them
- **Prepare the _.osu_** files, and **convert** the files with this tool, **then save** them as _**.aff**_. 
- List of files you have to prepare at the start:
  + **base_256.jpg** : small album art (256x256)
  + **base.jpg** : album art (512x512)
  + **0.aff** : Past / EZ beatmap
  + **1.aff** : Present / NM beatmap
  + **2.aff** : Future / HD beatmap
  + **[songname]_base.ogg** : The song



### How To Mod (Android):
- **Launch Arcaea**, then **minimize when tap-to-start screen** appear
- Open your **Root-capable File Explorer**
- Navigate to **/mnt/obb/**
- Find Arcaea's folder, it contains **[songname]_base.ogg** in it's directory
- Replace the **original song OGG** to the one you have
- Navigate to **[Arcaea folder]/songs/[songname]**, They usually contains:
  + **base.jpg** : Album Art 512x512
  + **base_256.jpg** : Album Art 256x256
  + **0.aff** : **_Past_** Beatmap
  + **1.aff** : _**Present**_ Beatmap
  + **2.aff** : _**Future**_ Beatmap
- **Replace** these files the with the one you have
- **Back to Arcaea**, Now find the song you replace **and play** it!
- Enjoy!



### Tips
- You cannot **change the song name** since they are contained **inside the APK file**, except you **mod the APK** itself
- Always **replace songs that you've unlocked**, since you can play it **right away**.
- Obb **changes is permanent**. therefore, you shall **make a backup first** or you need to re-download the full game in case something's gone wrong.
- You can **share the Obb you've mod** with others, but **only with the same game version**.
- Even though it's fun, I can **consider it as a cheat** since you can make a simple map and **easy-unlock other songs**.
- This tool **only convert osu**!beatmap to a valid **Arcaea beatmap text**, a **Text Editor is needed** for saving.
- **osu!mania lanes were full-screen height** but **Arcaea is half-screen perspective**, you may notice **speed difference** and **increased difficulty** there.
- **Standard OGG Bitrate** for Arcaea is **192Kbps.**
- **Never put a non-4K osu!mania** file, it can make a **computational error** and can cause **Arcaea freeze** or generates **a faulty beatmap** *(like double single notes, hold note with tap inside, etc.).*
- If you put a **non osu!mania** (**for now**), It **only registers circles** as tap, **no sliders** or spinners.
- If **Arcaea is frozen/force-closed** after you select the song, then there must be **something wrong with the _.aff_** you made, _(It can be my fault with the converter too.. Send the faulty .aff via **issue tracker** if you made a mistake and see if I can help)._
- I **don't** know how to **do it in iOS** since I don't have them. *(Or you can say I hate them* 🤫*)*



### Bug / Issues
Use issue tracker to **report bugs or issues**. Don't use it to ask help!



### TODO:
- Support for other osu! beatmap modes
- Support non-4K osu!mania
- Ability to convert osu!std sliders to Arcaea arc note.



### DISCLAIMER
I don't have any affiliation with the creators of **osu! (peppy)** or **Arcaea (lowiro)**.  This tool is only made for **fun and as a experiment**. If you choose to use it, It's ***your own risk***. I am not responsible to any mistakes and damages that this tool made. This tool is released under **BSD 3-clause License**.
