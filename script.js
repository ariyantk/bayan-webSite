let person;

//Make a search bar
const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const categoryTemplate = document.querySelector("[category-template]");
const dataCategoryContainer = document.querySelector(
  "[data-category-container]"
);

//array for mapping users
let users = [];
let categories = [];

//Get input and check it
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.job.toLowerCase().includes(value);
    user.Element.classList.toggle("hide", !isVisible);
  });
});

const dropDowns = document.querySelectorAll(".dropdown-filter");

dropDowns.forEach((dropDown) => {
  const select = dropDown.querySelector(".select");
  const caret = dropDown.querySelector(".caret");
  const menu = dropDown.querySelector(".menu");

  select.addEventListener("click", () => {
    select.classList.toggle("select-cliked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  //mapping categories
  fetch("./category.json")
    .then((res) => res.json())
    .then((data) => {
      categories = data.map((cat) => {
        const title = categoryTemplate.content.cloneNode(true).children[0];
        const dataList = title.querySelector("[data-list]");
        dataList.textContent = cat.instrumentName;

        title.addEventListener("click", () => {
          const options = document.querySelectorAll(".menu .innerlist li");
          const selected = document.querySelector(".selected");
          selected.innerText = cat.instrumentName;
          const newInstrument = cat.instrumentName;
          users.forEach((user) => {
            if (newInstrument == "همه") {
              location.reload();
            }
            const isVisible = user.job.includes(newInstrument);
            user.Element.classList.toggle("hide", !isVisible);
            menu.classList.remove("menu-open");
          });

          options.forEach((opt) => {
            opt.classList.remove("active");
          });

          title.classList.add("active");
          title.classList.remove("active");
        });

        dataCategoryContainer.append(title);
        return { title: cat.instrumentName, Element: title };
      });
    });
});

//Mapping users
fetch("./masters.json")
  .then((res) => res.json())
  .then((data) => {
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      const image = card.querySelector("#profile");
      header.textContent = user.name;
      body.textContent = user.job;
      image.setAttribute("src", user.image);
      userCardContainer.append(card);
      return { name: user.name, job: user.job, Element: card };
    });
  });
