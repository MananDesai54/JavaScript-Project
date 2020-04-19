let play,
    forward,
    backward,
    img,
    title,
    progress,
    audio,
    musicContainer,
    progressContainer;

play = document.querySelector('.fa-play');
forward = document.querySelector('.fa-forward');
backward = document.querySelector('.fa-backward');
img = document.querySelector('img');
title = document.querySelector('#title');
progress = document.querySelector('#progress');
musicContainer = document.querySelector('.music-player');
progressContainer = document.querySelector('.progress-container');
audio = document.querySelector('audio');
//console.log(play,forward,backward,img,title,progress)

const songs = ['Avengers','creativeminds','happyrock'];
let songIndex = 0;

loadSong(songs[songIndex]);
function loadSong(song) {
    title.innerText = song;
    audio.src = `${song}.mp3`;
    img.src = `${song}.png`;
}

function playMusic() {
    musicContainer.classList.add('play');
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
    audio.play();
}

function pauseMusic() {
    musicContainer.classList.remove('play');
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
    audio.pause();
}

play.addEventListener('click',()=>{
    if(audio.paused) {
        playMusic();
    }else {
        pauseMusic();
    }
});

function playNext() {
    if(songIndex===songs.length-1) {
        songIndex=0;
    }else {
        songIndex++;
    }
    loadSong(songs[songIndex]);
    playMusic();
}
function playPrevious() {
    if(songIndex===0) {
        songIndex=0;
    }else {
        songIndex--;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

forward.addEventListener('click',playNext);
backward.addEventListener('click',playPrevious);

audio.addEventListener('timeupdate',(e)=>{
    const { duration,currentTime } = e.srcElement;
    const percentage = (currentTime/duration)*100;
    progress.style.width = `${percentage}%`
})
audio.addEventListener('ended',()=>{
    playNext();
})

progressContainer.addEventListener('click',function(e){
    let percentage = (e.offsetX/this.clientWidth)*100;
    audio.currentTime = (percentage*audio.duration)/100;
})