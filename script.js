const SUPERHERO_TOKEN = "9031376556934546";
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;

const button = document.getElementById("button");
const heroImageDiv = document.getElementById("heroImage");
const serachButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

const getSuperHero = (id) => {
  fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      const superHero = json;
      getStatsHTML(superHero);
    });
};

const statToEmoji = {
  intelligence: "🧠",
  strength: "💪",
  speed: "⚡",
  durability: "🏋️‍♂️",
  power: "📊",
  combat: "⚔️",
};

const getSearchHero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      const hero = json.results[0];

      getStatsHTML(hero);
    });
};

const getStatsHTML = (character) => {
  const name = `<h2 style="text-align:center;">${character.name}</h2>`;

  const img = `<img src = "${character.image.url}"
        height=300 width=400/>`;

  const stats = Object.keys(character.powerstats)
    .map((stat) => {
      return `<p style="font-size:18px; text-align:center;">${
        statToEmoji[stat]
      } ${stat.toUpperCase()}: ${character.powerstats[stat]} </p>`;
    })
    .join(" ");

  heroImageDiv.innerHTML = `${name}${img} ${stats}`;
};

const randomHero = () => {
  const numberOfHeroes = 731;
  return Math.ceil(Math.random() * numberOfHeroes);
};

button.onclick = () => getSuperHero(randomHero());
serachButton.onclick = () => getSearchHero(searchInput.value);
