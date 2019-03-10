import "core-js/shim"; // included < Stage 4 proposals
import "regenerator-runtime/runtime";
import "./styles/styles.scss";
import api from "./helpers/api";
import Gif from "./components/gif";
import storage from "./helpers/storage";
const gallery = document.querySelector(".main__gallery");
const form = document.querySelector(".header__form");
const input = form.querySelector("input");
const loadMainPage = document.querySelector("h2.header__text");
const favoriteBtn = document.querySelector("p.header__text");
const title = document.querySelector("h1");
const config = {
  API_KEY: process.env.API_KEY,
  limit: 30,
  isLiked: false,
  getUrlElement: (arr, fromApi = true) => {
    return arr.map(element => {
      if (fromApi) {
        var {
          id,
          images: {
            downsized_medium: { url }
          }
        } = element;
        //var parce que "let" est défini que dans la condition
      } else {
        var { id, url } = element;
      }

      const gif = new Gif({ url, id, container: gallery });
    });
  }
};

const setSlug = (page, slug) => {
  history.pushState({ key: slug }, page, slug);
};

const Dispatcher = async e => {
  const { API_KEY, limit } = config;
  let data;
  gallery.innerHTML = "";
  if (window.location.pathname.includes("/favorite")) {
    data = storage.get();
    title.textContent = "Favorite";
    config.getUrlElement(data, false);
  } else if (window.location.pathname.includes("/search/")) {
    data = await api.getSearchGif(input.value, API_KEY, limit);
    config.getUrlElement(data);
  } else {
    title.textContent = "Gallery";
    data = await api.getTrendingGif(API_KEY, limit);
    config.getUrlElement(data);
  }
};

const loadGif = async () => {
  if (window.location.pathname !== "/") {
    setSlug("Favorite", "/");
  }
  Dispatcher();
};

const handleSubmit = async e => {
  e.preventDefault();
  if (input.value === "") return;
  setSlug("Search", `/search/${input.value}`);
  Dispatcher();
};

const loadFavorite = () => {
  setSlug("Favorite", "/favorite");
  Dispatcher();
};

form.addEventListener("submit", handleSubmit);
loadMainPage.addEventListener("click", loadGif);
favoriteBtn.addEventListener("click", loadFavorite);
window.addEventListener("load", Dispatcher);
window.addEventListener("popstate", Dispatcher);
