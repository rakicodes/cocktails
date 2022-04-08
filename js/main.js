function makeCocktail(name, image, ingredients, instruction, index) {
    this.name = name;
    this.image = image;
    this.ingredients = ingredients;
    this.instruction = instruction;
    this.display = function() {
        document.querySelector(`#cocktail-${index}`).innerHTML += `<h2>${this.name}</h2>`;
        document.querySelector(`#cocktail-${index}`).innerHTML += `<ul>${this.ingredients}</ul>`;
        document.querySelector(`#cocktail-${index}`).innerHTML += `<img src=${this.image}>`;
        document.querySelector(`#cocktail-${index}`).innerHTML += `<p>${this.instruction}</p>`;
    }
    
}

// Search cocktails by name
document.getElementById('name-button').addEventListener('click', searchByName);

function searchByName() {
    let name = document.getElementById('name-input').value;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.drinks);
        for (let i=0; i<data.drinks.length; i++) {
            let ingredients = getIngredients(data.drinks[0])
            document.querySelector(`#cocktails`).innerHTML += `<section id=cocktail-${i}></section>`
            let cocktail = new makeCocktail(data.drinks[i].strDrink,  data.drinks[i].strDrinkThumb, ingredients, data.drinks[i].strInstructions, i);
            cocktail.display();
        }
    });
}

function getIngredients(drink) {
    let listOfIndgredients = ''
    for (let i=1; i<=15; i++) {
        const ingredient = `strIngredient${i}`;
        const measure = `strMeasure${i}`
        if (drink[ingredient]) {
            const strMeasure = drink[measure] || "";
            listOfIndgredients += `<li>${strMeasure}${drink[ingredient]}</li>`;
        }
    }
    return listOfIndgredients;
}
