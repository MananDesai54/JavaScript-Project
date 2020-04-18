let balance,
    income,
    expense,
    history,
    text,
    amount,
    form;

balance = document.querySelector('#current-balance p');
income = document.querySelector('#income');
expense = document.querySelector('#expense');
history = document.querySelector('#track-history');
text = document.querySelector('#text');
amount = document.querySelector('#amount');
form = document.querySelector('#form');

let transactions = [];

window.addEventListener('load',()=>{
    text.value = '';
    amount.value = '';
    
    if(JSON.parse(localStorage.getItem('transactions')) !== null) {
        transactions=JSON.parse(localStorage.getItem('transactions'));
        createTransaction();
    }
})

let sign = {
    '+' : [
        'spent in',
    ],
        
    '-' : [
        'spent out',
    ]
}

function formatNumber(number) {
    return  +number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

function createTransaction() {
    let class_;
    console.log(transactions);
    history.innerHTML = '';
    transactions.forEach(transaction=>{
        if(transaction.amount>0) {
            class_ = sign['+'][0];
        }else {
            class_ = sign['-'][0]
        }
        let item = document.createElement('div');
        item.classList.value = class_;
        item.innerHTML = `
            <p>${transaction.text}</p>
            <p>${transaction.amount}</p>
            <button class="delete" data-tag="${transaction.id}">
                <i class="fa fa-times"></i>
            </button>
        `;
        history.appendChild(item);
    })
    updateValues();
    let deletebtn = document.querySelectorAll('.delete');
    deletebtn.forEach(btn=>{
        btn.addEventListener('click',deletetransaction);
    })
}

function deletetransaction(e) {
    let searchDelete = transactions.find(transaction=>
            transaction.id === +e.target.dataset.tag
        )
    
    e.target.parentElement.classList.add('animate');
    transactions.splice(transactions.indexOf(searchDelete),1);
    updateLocalStorage();
    setTimeout(()=>{
        createTransaction();
    },999);
}

function updateValues() {
    const amounts = transactions.map(transaction=>
        transaction.amount);

    const total = amounts.reduce((base,amount)=>base+=amount,0);
    
    balance.innerText = total;

    let incomes = formatNumber(amounts
                    .filter(amount=>amount>0)
                    .reduce((base,income)=>base+=income,0)
                    ).toFixed(2);
    
    let expenses = formatNumber(amounts
                    .filter(amount=>amount<0)
                    .reduce((base,income)=>base+=income,0)
                    ).toFixed(2);
    
    income.innerText = '$'+incomes;
    expense.innerText = '-$'+expenses;
}

function validateForm() {
    let flag = 0;
    if(text.value.trim()==='') {
        text.style.borderColor = 'red';
        flag+=1;
    }else {
        text.style.borderColor = '#d1cfcf';
        flag-=1;
    }
    if(amount.value.trim()==='' ||  !(amount.value.slice(1) >= 0)) {
        amount.style.borderColor = 'red';
        flag+=1;
    }
    else {
        amount.style.borderColor = '#d1cfcf';
        flag-=1;
    }
    return flag;
}
function updateLocalStorage() {
    localStorage.setItem('transactions',JSON.stringify(transactions));
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(validateForm()<0) {
        let id = Math.floor(Math.random()*100000000);
        const text_ = text.value;
        const amount_ = amount.value;
        transactions.push({
            id:id,
            text:text_,
            amount:+amount_
        });
        updateLocalStorage();
        createTransaction();
        amount.value = '';
        text.value = '';
    }
})