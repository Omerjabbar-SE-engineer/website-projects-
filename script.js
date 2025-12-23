
const currentsong = new Audio();
/*waiting to content load*/

 let songs = []
 let currentindex=-1
 let folder="song"


document.addEventListener("DOMContentLoaded", () => {
    let btn = document.querySelector(".songlist button")
    let songlists = document.querySelector(".songlist")
    /*we push another image and dom it*/
    let controls = document.getElementById("controlIcon")
  let previous = document.getElementById("previous");
let next = document.getElementById("next");
/*click on the button then stores the folder in a variable and fetch it */

function playsong(index){
    
    currentindex=index;
    let songpath = `${folder}/${songs[index]}`;
    currentsong.src=songpath;
     currentsong.play();
    controls.src = "pause.png";
  
}
    btn.addEventListener("click", async () => {

         songs = []
        let res = await fetch(folder + "/")
        /*after fetching move text from it*/
        let text = await res.text()
        /*make the element then stores its inner html as the text of that song */
        let div = document.createElement("div")
        div.innerHTML = text

        /*this text have a href links so get it*/
        let anchors = div.getElementsByTagName("a")
        /*after getting element check a href(link ) is ends with mp3?*/
        for (const a of anchors) {
            if (a.href.endsWith(".mp3")) {
                /*if yes push the a.href and remove"/" from this*/
                songs.push(a.href.split("/").pop())
            }
        }
        /*change the html after pushing song of sonlist*/
        songlists.innerHTML = "<h3 > playlist </h3>"
        /*creating ul*/
        let ul = document.createElement("ul")
        /*make loop that for each element(song)that is push */
        songs.forEach((element,index) => {
            /*for each element we make list*/
            let li = document.createElement("li")
            /*in that text %20 and some other uri compnents comes so we decode it */
            li.textContent = decodeURIComponent(element);
            li.style.margin="8px"
/*create elemnt and push png in it and styling*/
            let pausebtn = document.createElement("img")
            pausebtn.src = "stop.png"
            pausebtn.style.width = "20px"
            pausebtn.style.height = "20px"
            pausebtn.style.marginLeft = "10px"
            pausebtn.style.cursor = "pointer"
            li.appendChild(pausebtn)

/*so the song comes from folder now we want taht when click it should play*/
            li.addEventListener("click", () => {
                /*song path stores the folder and element for particularly that song */
            if(currentindex===index){
        if(currentsong.paused){
            currentsong.play()
            pausebtn.src = "pause.png";
                        controls.src = "pause.png";
    }
    else{
          currentsong.pause()
            pausebtn.src = "stop.png";
                        controls.src = "stop.png";
    }

         }
         else
                   {
    playsong(index);
           pausebtn.src = "pause.png";
                   }

            })
/*li after ul*/
            ul.appendChild(li)
        });
        songlists.appendChild(ul)
    })
    /*add event listner to the html png*/
controls.addEventListener("click", ()=>{
if(currentsong.paused){
    currentsong.play()
    controls.src="pause.png"
}
else{
    currentsong.pause()
    controls.src="stop.png"
}
})

previous.addEventListener("click",()=>{
    if(currentindex>0){
        
        playsong(currentindex-1)
     
    }
    else{
        playsong(songs.length-1)
    }
})

next.addEventListener("click",()=>{
    if(currentindex<songs.length-1){
        playsong(currentindex+1)
    }
    else{
        playsong(0)
    }
})   
  /*to moving the ball with song*/
  let progressbar=document.querySelector(".progressbar")
  let progressball=document.querySelector(".progressball")
  let progressfill=document.querySelector(".progressfill")
  currentsong.addEventListener("timeupdate",()=>{
    if(currentsong.duration){
        let percent=(currentsong.currentTime/currentsong.duration)*100
        progressball.style.left=percent +"%"
        progressfill.style.width=percent+"%"
    
    }
  })

  progressbar.addEventListener("click",(e)=>{
    let barwidth=progressbar.clientWidth;
    let cx=e.offsetX;
    let duration=currentsong.duration;
    currentsong.currentTime=(cx/barwidth)*duration;
  })


  let volumeimg=document.querySelector(".volumecontainer img")
  volumeimg.addEventListener("click",()=>{
    if(currentsong.volume>0){
        currentsong.volume=0;
        volumeimg.src="volume.png";
    }
    else{
    currentsong.volume=1;
    volumeimg.src="volume-up.png"
    }
  })
  let volumebarcontainer=document.querySelector(".volumebarcontainer")
  let volumebar=document.querySelector(".volumebar")
  volumebarcontainer.addEventListener("click",(e)=>{
    let volumewidth=volumebarcontainer.clientWidth
    let clix=e.offsetX
    let newvolume=clix/volumewidth
    currentsong.volume=newvolume
    if(currentsong.volume>0.8){
        alert("listing loud music injerous to health")
    }

    volumebar.style.width=(newvolume*100)+"%"
  })
})