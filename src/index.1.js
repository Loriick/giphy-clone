import "core-js/shim"; // included < Stage 4 proposals
import "regenerator-runtime/runtime";
import "./styles/styles.scss";
import api from "./helpers/api";
import storage from "./helpers/storage";
const gallery = document.querySelector(".main__gallery");
const form = document.querySelector(".header__form");
const input = form.querySelector("input");

const config = {
  API_KEY: "nQGyiET79hGhMAayxnVEkOMhuSWxDvB5",
  limit: 20,
  isLiked: false,
  getUrlElement: arr => {
    return arr.map(element => {
      const {
        images: {
          downsized_medium: { url }
        }
      } = element;
      return gifHTML(url);
    });
  }
};

const displayGif = data => {
  gallery.insertAdjacentHTML("beforeend", config.getUrlElement(data));
};

const loadGif = async () => {
  const { API_KEY, limit } = config;
  const data = await api.getTrendingGif(API_KEY, limit);
  displayGif(data);

  const gifs = gallery.querySelectorAll(".gif");

  gifs.forEach(gif => {
    gif.addEventListener("click", setFavorite.bind(null, gif, data));
  });
};

const setFavorite = (gifHTML, data) => {
  const url = gifHTML.querySelector("img").src;
  if (!gifHTML.classList.contains("liked")) {
    storage.set(data);
    gifHTML.classList.add("liked");
  } else {
    storage.remove(data);
    gifHTML.classList.remove("liked");
  }
};

const handleSubmit = async e => {
  e.preventDefault();
  if (input.value === "") return;
  const { API_KEY, limit } = config;
  const data = await api.getSearchGif(input.value, API_KEY, limit);
  gallery.innerHTML = "";
  displayGif(data);
  input.value = "";
};

form.addEventListener("submit", handleSubmit);
window.addEventListener("load", loadGif);
