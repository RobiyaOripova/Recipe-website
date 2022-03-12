const catcontainer = document.querySelector(" .card-container");
const headingCat = document.querySelector(".heading");

let Mealname = window.location.search.slice(1).split("&")[0].split("=")[1];
let Mealharf = window.location.search.slice(1).split("&")[1].split("=")[1];





console.log(Mealname);
console.log(Mealharf);
const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${Mealharf}=${Mealname}`;



async function getCatApi(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function showCategory() {
    catcontainer.innerHTML = "";
    getCatApi(url).then(res => {

        headingCat.innerHTML = `${Mealname} category meals`;
        const catmeal = res.meals;

        Meals.showReasult(catmeal, catcontainer);


    }).catch(err => console.log(err));
}

document.addEventListener("DOMContentLoaded", showCategory);