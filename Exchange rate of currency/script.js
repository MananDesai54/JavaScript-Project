let currency1 = document.getElementById('currency-one');
let currency2 = document.getElementById('currency-two');
let amount1 = document.getElementById('amount-one');
let amount2 = document.getElementById('amount-two');
let rate = document.getElementById('rate');
let swap = document.getElementById('swap');

function calculate() {
    let c1 = currency1.value;
    let c2 = currency2.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${c1}`)
     .then(res => res.json())
     .then(data => {
         const rate1 = data.rates[c2];
         rate.innerText = `1 ${c1} = ${rate1} ${c2}`;

         amount2.value = (amount1.value*rate1).toFixed(2);

     })
} 

currency1.addEventListener('change',calculate);
currency2.addEventListener('change',calculate);
amount1.addEventListener('input',calculate);
amount2.addEventListener('input',calculate);
swap.addEventListener('click',()=>{
    [currency1.value,currency2.value] = [currency2.value,currency1.value]
    calculate(); 
})

calculate();