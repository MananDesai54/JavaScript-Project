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
    gameContainer;

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

play.addEventListener('click',showSection)
howtoplay.addEventListener('click',showSection)
setting.addEventListener('click',()=>{
    difficulty.classList.toggle('show')
})
settingsbtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
        difficultySET =  btn.textContent;
        difficulty.classList.toggle('show');
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
    interval = setInterval(()=>{
        decreaseTime()
    },1000)
}

function checkWord(e) {
    let timeAva = +time.textContent;
    let scoreAva = +score.textContent;
    console.log(e.target.value)
    if(e.target.value===word.textContent) {
        timeAva+=5;
        scoreAva+=1
        clearInterval(interval);
        text.value = '';
        setWord();
    }
    time.textContent = timeAva;
    score.textContent = scoreAva
}

function decreaseTime() {
    if(+time.textContent>0) {
        time.textContent = +time.textContent-1;
    }else {
        console.log('Lost');
        clearInterval(interval);
        gameContainer.style.display = 'none';
        endgame.style.display = 'flex';
        endgame.innerHTML = `

        `
    }
}