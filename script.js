

const video=document.querySelector('.videoplayer');
const videoCovered=document.querySelector('.videocovered');
const volumecontrole=document.querySelector('.volumecontrol');
const selecters=document.querySelectorAll('.inter');
const pausedbutton=document.querySelector('.pausebutton');
const playbutton=document.querySelector('.playbutton');
const playpause=document.querySelector('.changing');
const controllers=document.querySelector('.controllers');
const videoBar=document.querySelector('.bar');
const videoBarCover=document.querySelector('.bigcovering');
let ispaused=0;
let ismute=0;
let videoSize;
let value;
console.log(videoBarCover);

function mouseIn()
{
    selecters.forEach((data)=>{
        data.classList.remove('inter')
    })
}
function mouseOut()
{
    selecters.forEach((data)=>{
        data.classList.add('inter')
    })

}
video.addEventListener('mouseenter',mouseIn)
video.addEventListener('mouseleave',mouseOut)



controllers.addEventListener("mouseenter",()=>{
    mouseIn();
})

controllers.addEventListener('mouseleave',()=>{
    mouseOut();
})

videoBarCover.addEventListener('mouseenter',mouseIn);
videoBarCover.addEventListener('mouseleave',mouseOut);

// videoBar.addEventListener('mouseenter',()=>{
//     mouseIn();
// })

// videoBar.addEventListener('mouseleave',()=>{
//     mouseOut();
// })

// videoCovered.addEventListener('mouseenter',()=>{
//     mouseIn();
// })
// videoCovered.addEventListener('mouseleave',()=>{
//     mouseOut();
// })

function generateGraphics()
{
    console.log(videoSize);
    videoCovered.style.width='0px';
   let start=setInterval(() => {
         value=video.currentTime;
        let Barwidth=(value/videoSize)*98;
        videoCovered.style.width=`${Barwidth}%`;
        if(value===videoSize)
        {
            clearInterval(start);
        }
        
    }, 500);
}

video.addEventListener('loadedmetadata', function() {
    videoSize=video.duration;
    generateGraphics()
});


function adjustPlayPause()
{
    if(ispaused===0)
    {
        pausedbutton.classList.remove('hidden');
        playpause.src='/content/play.png';
        pausedbutton.classList.add('animate');
        let timer=setInterval(()=>{
            pausedbutton.classList.remove('animate');
            pausedbutton.classList.add('hidden');
            clearInterval(timer);
        },400);
        video.pause();
        ispaused=1;
    }
    else{
        playbutton.classList.remove('hidden');
        playpause.src='/content/largerPause.png';
        playbutton.classList.add('animate');
        let timer1=setInterval(() => {
            playbutton.classList.remove('animate');
            playbutton.classList.add('hidden');
            clearInterval(timer1);
        },400);
        video.play();
        ispaused=0;
    }
}


video.addEventListener('click',()=>{
    adjustPlayPause();
})
playpause.addEventListener('click',()=>{
    adjustPlayPause();
})

volumecontrole.addEventListener('click',function(){

    if(ismute===0)
    {
    volumecontrole.src='/content/mute.png'
    video.muted=true;
    ismute=1;
    }
    else{
        volumecontrole.src='/content/volume.png';
        video.muted=false;
        ismute=0;
    }
})




function moveBar(e){
    console.log(e.offsetX);
    let width=videoBarCover.offsetWidth;
    console.log(width);
    let percentChange=(e.offsetX/width)*100;
    videoCovered.style.width=`${percentChange}%`;
    // console.log(`${value}/${videoSize}*98=${percentChange}`);
    let definedValue=(videoSize*percentChange)/98;
    video.currentTime=definedValue;
}

videoBarCover.addEventListener('click',moveBar.bind(this))