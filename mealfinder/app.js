let search = document.querySelector('#search'),
  random = document.querySelector('#random'),
  submit = document.querySelector('#submit'),
  meal = document.querySelector('#meals'),
  resultHeading = document.querySelector('#result-heading'),
  singleMeal = document.querySelector('#single-meal');

function searchMeal(e) {
    e.preventDefault();

    singleMeal.innerHTML = '';
    
    const term = search.value;

    if(term.trim()){
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
       .then(res => res.json())
       .then(data => {
         console.log(data);
         resultHeading.innerHTML = `<h2>Search results for ${term}:</h2>`;

         if(data.meals === null) {
            resultHeading.innerHTML = `<h2>There are no search results . Please try again or search something else or click on random.</h2>`
         }else {
            meal.innerHTML = data.meals.map(meal => `
              <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <a href="#single" class="meal-info" data-mealID="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
                </a>
              </div>
            `).join('');
         }
       })
       search.value = ''
    }else {
        alert('Please Search something.')
    }
}
submit.addEventListener('submit',searchMeal);

window.addEventListener('load',()=>{
    search.value = ''
})

function getMealByid(mealid) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
     .then(res => res.json())
     .then(data => {
        let meal = data.meals[0];
        console.log(meal)
        addMealToDOM(meal);
     })
}

function addMealToDOM(meal) {
    let ingredient = [];

    for(let i=1;i<=20;i++) {
      if(meal[`strIngredient${i}`]) {
        ingredient.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
      }else {
        break;
      }
    }
    singleMeal.innerHTML = `
    <hr>
      <div class="single-meal" id="single">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="single-meal-info">
          ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
          ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <h1>Ingredients</h1>
        <ul>
          ${ingredient.map(ing=>`<li>${ing}</li>`).join('')}
        </ul>
        <h1>How to make?</h1>
        <div class="main">
          <p>${meal.strInstructions}</p>
        </div>
      </div>
    `;
}

meal.addEventListener('click',(e)=>{
    const info = e.target;
    let id = e.target.dataset.mealid;
    getMealByid(id);    
})

function randomMeal() {
    meal.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
     .then(res => res.json())
     .then(data => addMealToDOM(data.meals[0]))
}
random.addEventListener('click',randomMeal);