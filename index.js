const videos = document.querySelector('.videos');
const btnPause = document.querySelector('.btnPause');
const laBarDeLecture = document.querySelector('.laBarDeLecture');
const position = document.querySelector('.laBarDeLecturePosition');
const sockVideos = document.querySelector('.sockVideos');
const fullScreenBar=document.querySelector('.laBarDeLecturePosition');
const controlBtn = document.querySelector('.controlBtn');
const barDetemps = document.querySelector('.laBarDetemps');
const imgButtonPlayer = document.querySelector('.imgButtonPlayer');
const sangRange = document.querySelector('.songRang');
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




/**
 * la bar de temps clicable 
 */
barDetemps.addEventListener('click',(e)=>updateTimeBar(e.offsetX));

sangRange.addEventListener('change',()=>volumeVideo());

window.addEventListener('keydown',(e)=>keyboardHandler(e.keyCode));

/**
 * button pause
 */
btnPause.addEventListener('click',() => videoPlayAndPause());

/**
 * bar de temps qui evolue sur la durrée
 */
videos.addEventListener('timeupdate',()=>updateTimeBarByVideoTime());

const volumeVideo = () => videos.volume = parseInt(sangRange.value) / 100;

const updateTimeBar = (mousePositionX) => {
    let timeBarWidth= barDetemps.getBoundingClientRect().width;
    let timeBarInPercentage = (mousePositionX * 100) / timeBarWidth;
    let videoInPercentage =(timeBarInPercentage * videos.duration) /100;
    videos.currentTime = videoInPercentage;
}    

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
            sangRange.value=parseInt(sangRange.value)+10;
            volumeVideo();
            break;

        case keyCodeName.keyArrowDown:
            sangRange.value=sangRange.value-10;
            volumeVideo();
            break;

        case keyCodeName.keyM:
            if(videos.muted) videos.muted = false;
            else videos.muted = true;
            break;

            //pour mettre en plan ecran quand en appuis sur F
        case keyCodeName.keyF:
            if(!fullScreen){
                sockVideos.requestFullscreen();
                fullScreen = true;
            }else{
                fullScreen = false;
                document.exitFullscreen();
            }
            break;

        default:
          // code block
      }
}
    

        

     