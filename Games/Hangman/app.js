let word = document.querySelector('.word');
let wrongLetter = document.querySelector('#wrong-letter');
let playAgain = document.querySelector('#play-again');
let popup = document.querySelector('#popup-container');
let notification = document.querySelector('#notification');
let notificationMsg = document.querySelector('#notification p');
let finalMessage = document.querySelector('#final-message');
let man = document.querySelector('.man');
let realWord = document.querySelector('#realword')

let parts = document.querySelectorAll('.part');
let selectedWord;
let correctWords = [];
let wrongWords = [];
let wordArray = ['programming','javascript','webdevelopment','helloworld','projects']
//console.log(word,wrongLetter,playAgain,popup,notification,finalMessage,parts);

async function getWord() {
    let res = await fetch(`https://random-word-api.herokuapp.com/word?number=1`);
    let data = await res.json();
    selectedWord = data[0].toLowerCase();
    selectedWord = wordArray[Math.floor(Math.random()*wordArray.length)].toLowerCase();
    console.log(selectedWord);
    setWord();
}

function updateWrong() {
    wrongLetter.innerHTML = `
        ${wrongWords.length>0 ? `<p>Wrong</p>` : ''}
        <span>${wrongWords.join(',')}</span>
    `;
    if(wrongWords.length > 0) {
        wrongWords.forEach((word,index)=>{
            parts[index].style.opacity = '1'
            parts[index].classList.add('animation');
        })
    }else {
        parts.forEach(part=>{
            part.style.opacity = '0';
            part.classList.remove('animation');
        })
    }
    if(wrongWords.length === parts.length) {
        man.classList.add('manmove')
        finalMessage.innerText = 'Opps ! You lost ! 😯'
        realWord.innerText = `Real word is ${selectedWord}`
        setTimeout(()=>{
            popup.style.display = 'flex';
        },5000)
    }
}

function showNotification(msg = 'You have already entered this letter.') {
    notificationMsg.innerText = msg;
    notification.classList.add('show');

    setTimeout(()=>{
        notification.classList.remove('show')
    },3000)
}

window.addEventListener('keydown',e=>{
    if(e.keyCode>=65 && e.keyCode<=90) {
        if(selectedWord.includes(e.key)){
            if(!correctWords.includes(e.key)) {
                correctWords.push(e.key);
                setWord(selectedWord);
            }else {
                showNotification();
            }
        }else {
            if(!wrongWords.includes(e.key)) {
                wrongWords.push(e.key);
                updateWrong();
            }else {
                showNotification();
            }
        }
    }else {

    }
})

getWord();

function setWord() {
    word.innerHTML = `
        ${selectedWord.split('')
            .map(letter=>
                `
                    <div class="letter">
                        ${correctWords.includes(letter)?letter:''}
                    </div>
                `
            ).join('')
        }
    `;
    let choosenWord = word.innerText.split('\n').join('');
    //or choosenWord = word.innerText.replace(/\n/g,'');using regex
    if(choosenWord === selectedWord) {
        man.classList.remove('manmove');
        finalMessage.innerText = 'Congratulations ! You won ! 🙂'
        realWord.innerText = `You guessed right ! , it's ${selectedWord}`
        popup.style.display = 'flex';
        coins.textContent = +coins.textContent + 10;
    }
}

playAgain.addEventListener('click',() =>{
    correctWords.splice(0);
    wrongWords.splice(0);

    getWord();
    updateWrong();
    popup.style.display = 'none';
    man.classList.remove('manmove');

});

let howtoplay = document.querySelector('.howtoplay');
let close = document.querySelectorAll('.fa-times');

close.forEach(close=>close.addEventListener('click',()=>{
    howtoplay.classList.add('none');
    ansBox.classList.add('none');
}))

let tip = document.querySelector('.tip');

tip.addEventListener('click',()=>{
    howtoplay.classList.remove('none');
})

let coins = document.querySelector('.coins span');
coins.textContent = 10;
let hint = document.querySelector('.hint');
let answer = document.querySelector('.answer');
function revealOneLetter() {
    if(+coins.textContent>0) {
        let words = word.children;
        words = [...words]
        let blankWord = words.map((word,index)=>{
            if(word.innerText==='')
                return index;
        });
        blankWord.forEach((word,index)=>{
            if(word===undefined){
                blankWord.splice(index,1);
            }
        })
        let random = blankWord[Math.floor(Math.random()*blankWord.length)];
        //word.children[random].innerText = selectedWord[random];
        correctWords.push(selectedWord[random]);
        coins.textContent = +coins.textContent - 1;
        setWord();
    }else {
        showNotification('You have used all your hints.')
    }
}
hint.addEventListener('click',revealOneLetter)

function getAnswer() {
    let answer = selectedWord;
    let sure = confirm('Are you sure want to get answer?');
    if(sure) {
        ansBox.classList.remove('none');
        ans.innerHTML = `<strong>Answer = </strong> ${answer}`; 
    }    
}
answer.addEventListener('click',getAnswer);

let ansBox = document.querySelector('.answers');
let ans = document.querySelector('.ans p');