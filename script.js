const items = [{
        title: "Колье из жемчуга",
        description: "В колье используются натуральные жемчужины и чешские бусины.",
        price: 138,
        img: "./img/1.jpg",
    },
    {
        title: "Браслет из Барочного жемчуга",
        description: "Браслет с крупным барочным жемчугом может выглядеть очень элегантно и стильно.",
        price: 88,
        img: "./img/2.jpg",
    },
    {
        title: "Браслет Авантюрин",
        description: "Браслет из натуральных камней отлично подойдёт на каждый день.",
        price: 65,
        img: "./img/3.jpg",
    },
    {
        title: "Браслет цепь",
        description: "Браслет-цепь из нержавеющей стали станет идеальным дополнением к вашему образу.",
        price: 30,
        img: "./img/4.jpg",
    },
    {
        title: "Браслет из жемчуга",
        description: "Браслет из белого жемчуга и чешских бусин придаст изюминку вашему наряду.",
        price: 58,
        img: "./img/5.jpg",
    },
    {
        title: "Серьги Авантюрин",
        description: "Серьги из камня Авантюрин подойдут под любой образ.",
        price: 58,
        img: "./img/6.jpg",
    },
    {
        title: "Серьги звезда",
        description: "Серьги с кристаллами Сваровски Звёздочка подходят под любой образ.",
        price: 68,
        img: "./img/7.jpg",
    },
    {
        title: "Колье из Барочного жемчуга",
        description: "Колье из крупного натурального жемчуга подчеркнет Вашу женственность.",
        price: 168,
        img: "./img/8.jpg",
    },
    {
        title: "Комплект Аквамарин",
        description: "В комплекте используются натуральные камни и позолоченая фурнитура.",
        price: 198,
        img: "./img/9.jpg",
    },
    {
        title: "Колье Солнышко",
        description: "Колье из натурального жемчуга в серых оттенках с кулоном  в форме солнца.",
        price: 118,
        img: "./img/10.jpg",
    },
    {
        title: "Серьги солнышки",
        description: "Серьги солнышки с цирконами изящно подчеркнут ваш образ.",
        price: 65,
        img: "./img/11.jpg",
    },
    {
        title: "Колье гранж",
        description: "Колье гранж из жемчуга с дополнением различных цепочек в позолоте и в серебре.",
        price: 328,
        img: "./img/12.jpg",
    }
]

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function prepareShopItem(shopItem) {
    const { title, description, price, img } = shopItem;
    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price} Br`;

    return item;
}


let currentState = [...items];

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";

    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
})

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));

    renderItems(currentState);
    sortControl.selectedIndex = 0;

}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);