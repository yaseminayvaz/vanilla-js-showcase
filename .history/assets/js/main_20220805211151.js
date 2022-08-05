//swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4.2,
  spaceBetween: 30,
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    640: {
        slidesPerView: 2.2,
    },
    1024: {
        slidesPerView: 4.2,
    },
},
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//swiper
let bookList = [];
var result = null
var all_categories = null
var all_products = null
var selected_category = null

const creatBookItemsHtml = (category) => {
  const shopListEl = document.querySelector(".swiper-wrapper")
  let shopListHtml = "";

  all_products[category].forEach(book => {
    shopListHtml += `
    <div class="swiper-slide showcase__slide__card">
    <div class="showcase__slide__card__img">
   <img src="${book.image}" alt="">
  </div>
  <div class="showcase__slide__card__title">
   <p class="slide__title">
    ${book.name}
   </p>
   <p class="slide__price">
     ${book.price}
   </p>
   <p class="slide__free__cargo">
     <i class="free-cargo"></i>
    Ücretsiz Kargo

   </p>

  </div>
  </div>`;
  })
  shopListEl.innerHTML = shopListHtml;
};

const setCategoriesHtml = (categories) => {

  const tabListEl = document.querySelector(".showcase__tabs__list")
  let tabListHtml = ""

  for (const item of categories) {
    tabListHtml += `<li onclick="creatBookItemsHtml('${item}')">${item}</li>`
  }

  tabListEl.innerHTML = tabListHtml;

}

const getBooks = async () => {
  const response = await fetch("./product-list.json")

  result = await response.json()

  selected_category = result.responses[0][0].params.userCategories[0]
  all_categories = result.responses[0][0].params.userCategories
  all_products = result.responses[0][0].params.recommendedProducts
  creatBookItemsHtml(selected_category)
  setCategoriesHtml(all_categories)
};
getBooks();