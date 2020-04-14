let add = document.querySelector('#add-user');
let double = document.querySelector('#double');
let showonly = document.querySelector('#show-millionaires');
let sort = document.querySelector('#sort');
let calculate = document.querySelector('#calculate-wealth');
let main = document.querySelector('#main');

let data = [];

fetchPerson();
fetchPerson();
fetchPerson();


async function fetchPerson() {
    let res = await fetch('https://www.randomuser.me/api');
    let dt = await res.json();
    
    let newuser = {
      name : `${dt.results[0].name.first} ${dt.results[0].name.last}`,
      money : Math.floor(Math.random()*1000000)
    }
    addData(newuser);
}

function addData(user) {
    data.push(user);
    
    updateDOM();
}

function updateDOM(users = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'
    users.forEach((user)=>{
        let element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> $${formatMoney(+user.money)}`;
        main.appendChild(element);
    })
}

function doubleIncome() {
    data = data.map((user,index)=>{
      return {
        ...user,money:user.money*2
      };
    });
    updateDOM()
}

function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function sortArray() {
    data.sort((user1,user2) => user2.money-user1.money);
    updateDOM();
}

function showMillion() {
    let users = data.filter(user=>user.money>999999)
    updateDOM(users);
}

function showTotal() {
    let total = data.reduce((acc,user2)=>(acc+=user2.money),0);
    
    let wealth = document.createElement('div');
    wealth.innerHTML = `<h3><strong>Total wealth : </strong> $${formatMoney(+total)}</h3>`
    main.appendChild(wealth)
}

add.addEventListener('click',fetchPerson);
double.addEventListener('click',doubleIncome);
showonly.addEventListener('click',showMillion);
sort.addEventListener('click',sortArray);
calculate.addEventListener('click',showTotal);