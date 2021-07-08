const videos = document.querySelector('.videos');
const btnPause = document.querySelector('.btnPause');
const laBarDeLecture = document.querySelector('.laBarDeLecture');
const position = document.querySelector('.laBarDeLecturePosition');
const stockVideos = document.querySelector('.sockVideos');
const fullScreenBar=document.querySelector('.laBarDeLecturePosition');
const controlBtn = document.querySelector('.controlBtn');
const barDetemps = document.querySelector('.laBarDetemps');
const imgButtonPlayer = document.querySelector('.imgButtonPlayer');
const sangRange = document.querySelector('.songRang');
const imgSound = document.querySelector('.imgMuteButton');
const muteBtn = document.querySelector('.muteButton');
const keyCodeName = {
    keyF : 70,
    keyEspace : 32,
    keyArrowRight : 39,
    keyArrowLeft : 37,
    keyArrowUp : 38,
    keyArrowDown : 40,
    keyM : 77,
}
let fullScreen = false;
let mouseDown = false;



/**
 * la bar de temps clicable 
 */
barDetemps.addEventListener('click',(e)=>updateTimeBar(e.offsetX));

muteBtn.addEventListener('click',()=>muteBtnFortheMute());

sangRange.addEventListener('mousedown',()=>mouseDown=true);

sangRange.addEventListener('mouseup',()=>mouseDown=false);

sangRange.addEventListener('mousemove',()=> {
    if(mouseDown)volumeVideo();
});

window.addEventListener('keydown',(e)=>keyboardHandler(e.keyCode));

/**
 * button pause
 */
btnPause.addEventListener('click',() => videoPlayAndPause());

/**
 * bar de temps qui evolue sur la durrée
 */
videos.addEventListener('timeupdate',()=>updateTimeBarByVideoTime());

/**
 * pour le volume et pour changer les imge par raprore au volume
 */
const volumeVideo = () =>{ 
    videos.volume = parseInt(sangRange.value) / 100;
    if(videos.volume == 0)imgSound.src='img/volume%20niveau/volume-niveau-01(0-0.1).png';
    else if(videos.volume > 0 && videos.volume < 0.3 ) imgSound.src='img/volume%20niveau/volume-niveau-02(0.1-0.4).png';
    else if(videos.volume >= 0.3 && videos.volume < 0.6 ) imgSound.src='img/volume%20niveau/volume-niveau-03(0.4-0.7).png';
    else if(videos.volume >= 0.6 && videos.volume <= 1 ) imgSound.src='img/volume%20niveau/volume-niveau-04.png';

}
/** 
 * mute btn funtion 
 */
const muteBtnFortheMute = ()=>{
    videos.muted = !videos.muted;
    if(videos.muted){   
        imgSound.style.opacity='0.4';
    }else{
        imgSound.style.opacity='1';
    }
}


/**
 * pour trouver la position ou en click sur la bar de temps
 */
const updateTimeBar = (mousePositionX) => {
    let timeBarWidth= barDetemps.getBoundingClientRect().width;
    let timeBarInPercentage = (mousePositionX * 100) / timeBarWidth;
    let videoInPercentage =(timeBarInPercentage * videos.duration) /100;
    videos.currentTime = videoInPercentage;
}    

/**
 * pour mettre en pause et pour le play la video  
 */
const videoPlayAndPause = ()=>{
    if(videos.paused){
        videos.play();
        imgButtonPlayer.src='img/pauseButton.png'
        imgButtonPlayer.classList.toggle('imgButtonPause')
        imgButtonPlayer.classList.toggle('imgButtonPlayer')
    }
    else{
        videos.pause();
        imgButtonPlayer.src='img/playerButton.png'
        imgButtonPlayer.classList.toggle('imgButtonPause')
        imgButtonPlayer.classList.toggle('imgButtonPlayer')
    }
}

/**
 * pour mettre a jour la bar de temps
 */
const updateTimeBarByVideoTime = () => {
    let time = (videos.currentTime * 100) / videos.duration;
    laBarDeLecture.style.width = time + '%';
}

const keyboardHandler = (keyCode)=>{
    switch(keyCode) {
        case keyCodeName.keyEspace:
            // pour mettre sur pause quand en appuis sur espase
            if(videos.paused){
                videos.play();
                imgButtonPlayer.src='img/pauseButton.png'
                imgButtonPlayer.classList.toggle('imgButtonPause')
                imgButtonPlayer.classList.toggle('imgButtonPlayer')
            }   
            else{
                videos.pause();
                imgButtonPlayer.src='img/playerButton.png'
                imgButtonPlayer.classList.toggle('imgButtonPause')
                imgButtonPlayer.classList.toggle('imgButtonPlayer')
            }
            break;

        case keyCodeName.keyArrowLeft:
            //-10s sur la videos quand en appuis sur les fleche
            videos.currentTime=videos.currentTime-10;         
            break;
        
        case keyCodeName.keyArrowRight:
            //+10s sur la videos quand en appuis sur les fleche
            videos.currentTime=videos.currentTime+10;
            break;
            
        case keyCodeName.keyArrowUp:
            //pour mantre le volume
            sangRange.value=parseInt(sangRange.value)+10;
            volumeVideo();
            break;

        case keyCodeName.keyArrowDown:
            //pour decentre le volume
            sangRange.value=sangRange.value-10;
            volumeVideo();
            break;

        case keyCodeName.keyM:
            //pour le mute
            muteBtnFortheMute();
            break;

            //pour mettre en plan ecran quand en appuis sur F
        case keyCodeName.keyF:
            if(!fullScreen){
                stockVideos.requestFullscreen();
                fullScreen = true;
            }else{
                fullScreen = false;
                document.exitFullscreen();
            }
            break;

        default:
          
      }
}
    

        

     