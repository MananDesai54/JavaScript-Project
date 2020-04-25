let main = document.querySelector('main');
let voiceSelect = document.querySelector('#voices');
let textArea = document.querySelector('textarea');
let readBtn = document.querySelector('#read');
let toggleBtn = document.querySelector('#toggle');
let closeBtn = document.querySelector('#close');

//console.log(main,voiceSelect,textArea,readBtn,toggleBtn,closeBtn);

const data = [
    {
        image:'./img/drink.jpg',
        text:"I'm Thirsty"
    },
    {
        image:'./img/food.jpg',
        text:"I'm Hungry"
    },
    {
        image:'./img/tired.jpg',
        text:"I'm Tired"
    },
    {
        image:'./img/hurt.jpg',
        text:"I'm Hurt"
    },
    {
        image:'./img/happy.jpg',
        text:"I'm Happy"
    },
    {
        image:'./img/angry.jpg',
        text:"I'm Angry"
    },
    {
        image:'./img/sad.jpg',
        text:"I'm Sad"
    },
    {
        image:'./img/scared.jpg',
        text:"I'm Scared"
    },
    {
        image:'./img/outside.jpg',
        text:"I want to go outside"
    },
    {
        image:'./img/home.jpg',
        text:"Stay home ,Stay safe"
    },
    {
        image:'./img/school.jpg',
        text:"College is too boring"
    },
    {
        image:'./img/grandma.jpg',
        text:"Don't go outside , corona is there."
    },
]


data.forEach(createBox);
function createBox(item) {
    const box = document.createElement('div');

    const { image,text } = item;

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}">
        <p class="info">${text}</p>
    `;

    box.addEventListener('click',()=>{
        setTextMsg(text);
        speakText();

        box.classList.add('active');
        setTimeout(()=>{
            box.classList.remove('active');
        },800);
    })

    main.appendChild(box);
}


//speech making
const message = new SpeechSynthesisUtterance();
function setTextMsg(text) {
    message.text = text;
}
function speakText() {
    speechSynthesis.speak(message);
}



let toggle = document.querySelector('#toggle');
let textBox = document.querySelector('#text-box');
let close = document.querySelector('#close');
close.addEventListener('click',()=>{
    textBox.classList.toggle('show');
})
toggleBtn.addEventListener('click',()=>{
    textBox.classList.toggle('show');
})


//add Voices using speech synthesis

speechSynthesis.addEventListener('voiceschanged',getVoices)

let voices = [];
function getVoices() {
    console.log('Hello');
    voices = speechSynthesis.getVoices();
    console.log(voices);
    voices.forEach(voice=>{
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voiceSelect.appendChild(option);
    })
}
getVoices();

//change voices
voiceSelect.addEventListener('change',(e)=>{
    message.voice = voices.find(voice=>voice.name===e.target.value);
})

//read text

readBtn.addEventListener('click',()=>{
    setTextMsg(textArea.value.trim()||'You need to enter some text');
    speakText();
})