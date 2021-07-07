const videos = document.querySelector('.videos');
const btnPause = document.querySelector('.btnPause');
const laBarDeLecture = document.querySelector('.laBarDeLecture');
const position = document.querySelector('.laBarDeLecturePosition');
const sockVideos = document.querySelector('.sockVideos');
const fullScreenBar=document.querySelector('.laBarDeLecturePosition');
const controlBtn = document.querySelector('.controlBtn');
const barDetemps = document.querySelector('.laBarDetemps');
const imgButtonPlayer=document.querySelector('.imgButtonPlayer');
const sangRange = document.querySelector('.songRang');
let i=1;

    sangRange.addEventListener('change',()=>{
        volumeVideo();
        console.log(sangRange.value);
        })

    function volumeVideo(){
        c=sangRange.value/100;
        videos.volume=c;    
    }
    barDetemps.addEventListener('click',(e)=>{//la bar de temps clicable 
        let z= barDetemps.getBoundingClientRect();
        let a = (e.offsetX*100)/z.width;
        let b =(a*videos.duration)/100;
        videos.currentTime=b;
        console.log(e);
        
    })    
    btnPause.addEventListener('click',()=>{//button pause
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
    })
    videos.addEventListener('timeupdate',()=>{//bar de temps qui evolue sur la durrée
        let temps = (videos.currentTime*100)/videos.duration;
        laBarDeLecture.style.width=temps+'%';
        
    })  
    window.addEventListener('keydown',(e)=>{//input clavier
        let x = e.keyCode;
        console.log(e);
        //console.log(e);
        if (x==32){//pour mettre sur pause quand en appuis sur espase
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
        if (x==37){
            videos.currentTime=videos.currentTime-10;//-10s sur la videos quand en appuis sur les fleche
        }
        if (x==39){
            videos.currentTime=videos.currentTime+10;//+10s sur la videos quand en appuis sur les fleche

        }
        if(x==80){
            console.log(sangRange.value);
            /*if(sangRange.value==100){
                sangRange.value=0;
            }*/
            //sangRange.value=0;    
            sangRange.value=parseInt(sangRange.value)+10;
           volumeVideo();
            console.log(sangRange.value);
            
        }   
        if(x==40){
            sangRange.value=sangRange.value-10;
            volumeVideo();
            console.log(sangRange.value);
        }
        if(x==77){

        if(videos.muted){
            videos.muted=false;

        }else{
            videos.muted=true;
        }
        }
        if(x==70){ //pour mettre en plan ecran quand en appuis sur F
            if(i==1){
                sockVideos.requestFullscreen();
                i=2;
                console.log(i);
            }else if(i==2){
                i=1;
                document.exitFullscreen();
                console.log(i);
            }
        
     }})
     