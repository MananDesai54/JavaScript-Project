let play,
    howtoplay,
    startscreen,
    game,
    setting,
    difficulty,
    word,
    time,
    score,
    endgame,
    settingsbtn,
    text,
    difficultySET = 'easy',
    interval,
    gameContainer,
    lvl;

play = document.querySelector('#play');
howtoplay = document.querySelector('#howtoplay')
startscreen = document.querySelector('.start-screen')
game = document.querySelector('.game')
setting = document.querySelector('.cog');
difficulty = document.querySelector('.difficulty');
word = document.querySelector('#word');
settingsbtn = document.querySelectorAll('li');
time = document.querySelector('#time');
score = document.querySelector('#score');
endgame = document.querySelector('.end-game');
text = document.querySelector('#input');
gameContainer = document.querySelector('.game-container');
lvl = document.querySelector('.lvl');
timePlus = 6;

play.addEventListener('click',showSection)
howtoplay.addEventListener('click',showSection)
setting.addEventListener('click',()=>{
    difficulty.classList.toggle('show')
})
settingsbtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
        difficultySET =  btn.id;
        timePlus = difficultySET==='medium'?4:(difficultySET==='hard'?2:6);
        difficulty.classList.toggle('show');
        lvl.innerText = difficultySET
        clearInterval(interval);
        resetStat();
    })
})
text.addEventListener('input',checkWord);


function showSection(e) {
    if(event.target.id === 'play') {
        startscreen.classList.add('go');
        setTimeout(()=>{
            startscreen.style.display = 'none'
            game.classList.remove('hide');
            setWord();
            text.value = ''
        },1500)
    }
}

async function getWord() {
    const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    const data = await response.json();

    return data[0];
}

async function setWord() {
    const APIword =await getWord();
    word.innerText = APIword;
    text.focus();
    document.querySelector('header').classList.add('play')
    document.querySelector('header p').classList.add('play')
    interval = setInterval(()=>{
        decreaseTime()
    },1000)
}

function checkWord(e) {
    let timeAva = +time.textContent;
    let scoreAva = +score.textContent;
    console.log(e.target.value)
    if(e.target.value.toLowerCase()===word.textContent.toLowerCase()) {
        timeAva+=timePlus;
        scoreAva+=1
        clearInterval(interval);
        text.value = '';
        setWord();
    }
    time.textContent = timeAva;
    score.textContent = scoreAva
}

function resetStat() {
    gameContainer.style.display = 'block'
    endgame.style.display = 'none'
    word.innerText = ''
    time.textContent = 10;
    score.textContent = 0;
    setWord();
}

function decreaseTime() {
    if(+time.textContent>0) {
        time.textContent = +time.textContent-1;
    }else {
        console.log('Lost');
        clearInterval(interval);
        gameContainer.style.display = 'none';
        document.querySelector('header').classList.remove('play')
        document.querySelector('header p').classList.remove('play')
        endgame.style.display = 'flex';
        endgame.innerHTML = `
            <h1>Time  ran out</h1>
            <p>Your final scores is <span>${score.textContent}</span></p>
            <button onclick="resetStat()">Play Again</button>
        `
    }
}