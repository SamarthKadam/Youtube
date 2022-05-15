

const video=document.querySelector('.videoplayer');
const videoCovered=document.querySelector('.videocovered');
const volumecontrole=document.querySelector('.volumecontrol');
const selecters=document.querySelectorAll('.inter');
const pausedbutton=document.querySelector('.pausebutton');
let ispaused=0;
let videoSize;

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



volumecontrole.addEventListener("mouseenter",()=>{
    mouseIn();
})


function generateGraphics()
{
    console.log(videoSize);
    videoCovered.style.width='0px';
   let start=setInterval(() => {
        let value=video.currentTime;
        console.log(value);
        let width=(value/videoSize)*98;
        videoCovered.style.width=`${width}%`;
        if(value===videoSize)
        {
            clearInterval(start);
        }
        
    }, 1000);
}

video.addEventListener('loadedmetadata', function() {
    videoSize=video.duration;
    generateGraphics()
});



video.addEventListener('click',()=>{
    console.log(pausedbutton)
    if(ispaused===0)
    {
        pausedbutton.classList.remove('hidden');
        pausedbutton.classList.add('animate');
        setInterval(()=>{
            pausedbutton.classList.remove('animate');
            pausedbutton.classList.add('hidden');
        },400)
        video.pause();
        ispaused=1;
    }
})


