const container = document.querySelector(".card-container"),
    reasultHeading = document.querySelector(".heading"),
    bottom = document.querySelector(".bottom");




let input = window.location.search.split('?')[1];
console.log(input);
async function getApi(name) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data;
}




function searchMeal() {

    getApi(input).then(res => {
        const meal = res.meals;
        reasultHeading.innerHTML = `<h2>Search results for ${input} </h2>`;


        if (meal === null) {
            reasultHeading.innerHTML = `<h2>There are no search reasult </h2>`;
            bottom.style.position = "fixed";
            bottom.style.width = "100%";
            bottom.style.bottom = "0";



        } else {
            reasultHeading.style.height = "3rem";
            Meals.showReasult(meal, container);

        }

    }).catch(err => console.log(err));




}
document.addEventListener("DOMContentLoaded", () => {
    searchMeal();

});