function makeCocktail(name, image, ingredients, instruction, index) {
    this.name = name;
    this.image = image;
    this.ingredients = ingredients;
    this.instruction = instruction;
    this.display = function() {
        document.querySelector(`#cocktail-${index}`).innerHTML += `<h2 class="name">${this.name}</h2>`;
        document.querySelector(`#cocktail-${index}`).innerHTML += `<ul class="ingredients">${this.ingredients}</ul>`;
        document.querySelector(`#cocktail-${index}`).innerHTML += `<img src=${this.image} alt="${this.name}">`;
        document.querySelector(`#cocktail-${index}`).innerHTML += `<p class="instruction">${this.instruction}</p>`;
    }
    
}

let cocktails = []

function makeCarousel(items, current=0) {
    this.items = items;
    this.current = current;
    this.prev = function() {
        document.querySelector(`#cocktail-${this.current}`).classList.remove('active');
        document.querySelector(`#cocktail-${this.current}`).classList.add('hidden');

        if (this.current !== 0) {
            this.current--;
        } else {
            this.current = this.items.length-1;
        }
        document.querySelector(`#cocktail-${this.current}`).classList.remove('hidden');
        document.querySelector(`#cocktail-${this.current}`).classList.add('active');


    }.bind(this);
    this.next = function() {
        document.querySelector(`#cocktail-${this.current}`).classList.remove('active');
        document.querySelector(`#cocktail-${this.current}`).classList.add('hidden');

        if (this.current < this.items.length-1) {
            this.current++;
        } else {
            this.current = 0;
        }
        
        document.querySelector(`#cocktail-${this.current}`).classList.remove('hidden');
        document.querySelector(`#cocktail-${this.current}`).classList.add('active');

    }.bind(this);

}

// Search cocktails by name
document.getElementById('name-button').addEventListener('click', searchByName);

function searchByName() {
    let name = document.getElementById('name-input').value;
    cocktails = [];

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data.drinks);

        document.querySelector(`#cocktails`).innerHTML = '';
        if (data.drinks === null) {
            document.querySelector(`#cocktails`).innerHTML += `<section class="cocktail active" id=cocktail-${0}><p>No cocktails found</p></section>`
            document.querySelector(`#prev`).classList.add('visibility-hidden');
            document.querySelector(`#next`).classList.add('visibility-hidden');
        } else {
            for (let i=0; i<data.drinks.length; i++) {
                let ingredients = getIngredients(data.drinks[i])
                if (i===0) {
                    document.querySelector(`#cocktails`).innerHTML += `<section class="cocktail active" id=cocktail-${i}></section>`
                } else {
                    document.querySelector(`#cocktails`).innerHTML += `<section class="cocktail hidden" id=cocktail-${i}></section>`
                }
    
                let cocktail = new makeCocktail(data.drinks[i].strDrink,  data.drinks[i].strDrinkThumb, ingredients, data.drinks[i].strInstructions, i);
                cocktails.push(cocktail);
                cocktail.display();
            }    
        }
        
        carousel.items = cocktails;
        carousel.current = 0;
    });

    document.querySelector(`#carousel`).classList.add('visibility-visible');
    document.querySelector(`#carousel`).classList.remove('visibility-hidden');

    document.querySelector(`#prev`).classList.remove('visibility-hidden');
    document.querySelector(`#next`).classList.remove('visibility-hidden');


}

function getIngredients(drink) {
    let listOfIndgredients = ''
    for (let i=1; i<=15; i++) {
        const ingredient = `strIngredient${i}`;
        const measure = `strMeasure${i}`
        if (drink[ingredient]) {
            const strMeasure = drink[measure] || "";
            listOfIndgredients += `<li class="ingredient">${strMeasure} ${drink[ingredient]}</li>`;
        }
    }
    return listOfIndgredients;
}


// Implement carousel
let carousel = new makeCarousel(cocktails, 0);
document.getElementById('prev').addEventListener('click', carousel.prev);
document.getElementById('next').addEventListener('click', carousel.next);

console.log(cocktails);