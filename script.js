const formSubmit = document.querySelector(".flex-form"),
    search = document.querySelector(".input-1"),
    categoryBtn = document.querySelectorAll(".catli .category-btn"),
    areaBtn = document.querySelectorAll(" .areali .area-btn"),
    navbarToggler = document.querySelector(".navbar-toggler"),
    navbarMenu = document.querySelector(".navbar"),
    searchme = document.querySelector(".header-container  .searchme"),
    form = document.querySelector("form"),
    randomMeal = document.querySelector(".random");



eventListeners();

function eventListeners() {
    formSubmit.addEventListener("submit", showSearchReaslut);
    navbarToggler.addEventListener("click", navbarTogglerClick);
    searchme.addEventListener("click", searchClick);



}


function navbarTogglerClick() {
    navbarToggler.classList.toggle("open-navbar-toggler");
    navbarMenu.classList.toggle("active");
}

function searchClick() {
    searchme.classList.toggle("fa-times");

    form.classList.toggle("formActive");
}

function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function showSearchReaslut(e) {
    e.preventDefault();

    const input = search.value;
    console.log(input);
    if (input.trim()) {
        console.log(input);
        /*  window.open("search.html?" + input);*/
        window.location = "search.html?" + input;
    } else {
        alert("Value please")
    }
    search.value = "";
}

class Meals {


    static showReasult(mealsme, cont) {
        for (let meals of mealsme) {
            const card = document.createElement("div");
            card.setAttribute("class", "meal-card");
            const image = document.createElement("div");
            image.setAttribute("class", "image");
            const text = document.createElement("div");
            text.setAttribute("class", "text");
            const img = document.createElement("img");
            setAttribute(img, {
                class: "myimg",
                src: `${meals.strMealThumb}`,
                alt: `${meals.strMeal}`
            })

            const h4 = document.createElement("h4");

            h4.innerText = `${meals.strMeal}`;
            const btn = document.createElement("button");
            btn.setAttribute("class", "mybtn ");
            btn.innerText = "Read more";
            image.appendChild(img);
            text.appendChild(h4);
            text.appendChild(btn);

            card.appendChild(image);
            card.appendChild(text);

            cont.appendChild(card);
            clickBtn(meals, btn);



        }




    }



}




function clickBtn(meal, btn) {
    btn.addEventListener("click", () => {


        localStorage.setItem(meal.idMeal, JSON.stringify(meal));
        console.log(localStorage);
        window.open("ingredient.html?" + meal.idMeal);




    })

}

function selectBtn(click) {

    click.forEach(btn => {
        btn.addEventListener("click", e => {

            const clickBtn = btn.innerText;
            console.log(clickBtn)
            if (clickBtn) {
                if (click === categoryBtn) {
                    let harf = "c";

                    window.open(`category.html? btn=${clickBtn}&harfi=${harf}`);
                } else {
                    let harf = "a";

                    window.open(`category.html? btn=${clickBtn}&harfi=${harf}`);
                }






            } else {
                console.log("Not found");
            }
        })
    });

}
selectBtn(categoryBtn);
selectBtn(areaBtn);

async function getRandomApi() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data = await response.json();
    return data;
}

function showRandomMeal() {
    getRandomApi().then(res => {
        const ranmeal = res.meals[0];
        console.log(ranmeal);
        const h3 = document.createElement("h3");
        h3.innerText = "Random Recipe";
        const rancard = document.createElement("div");
        rancard.setAttribute("class", "card random-card");
        rancard.style.width = "18rem";
        const ranimg = document.createElement("img");
        setAttribute(ranimg, {
            class: "card-img-top c-img",
            src: `${ranmeal.strMealThumb}`,
            alt: `${ranmeal.strMeal}`
        });
        const cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body c-body");
        const title = document.createElement("h5");
        const button = document.createElement("button");
        button.setAttribute("class", "mybtn");
        button.innerText = "Read more";
        title.setAttribute("class", "c-title");
        title.innerText = `${ranmeal.strMeal}`;
        cardBody.appendChild(title);
        cardBody.appendChild(button);
        rancard.appendChild(ranimg);
        rancard.appendChild(cardBody);
        randomMeal.appendChild(h3);
        randomMeal.appendChild(rancard);
        clickBtn(ranmeal, button);

    }).catch(err => console.log(err));
}
showRandomMeal();