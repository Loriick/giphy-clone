const API_KEY = "nQGyiET79hGhMAayxnVEkOMhuSWxDvB5";
const limit = 20;
const root = document.getElementById("gallery");
const form = document.querySelector("form");
const input = form.querySelector("input");

const getGif = async search => {
  const res = await fetch(
    `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}&limit=${limit}`
  );
  const { data } = await res.json();
  gallery.innerHTML = getUrlElement(data);
  console.log(data);
};

const getUrlElement = arr => {
  return arr.map(element => {
    const {
      images: {
        downsized_medium: { url }
      }
    } = element;
    console.log(url);
    return `<img src="${url}" />`;
  });
};

const handleSubmit = e => {
  e.preventDefault();
  getGif(input.value);
};

form.addEventListener("submit", handleSubmit);
