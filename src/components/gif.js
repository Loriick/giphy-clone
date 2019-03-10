import storage from "../helpers/storage";

class Gif {
  /**
   *Creates an instance of Gif.
   * @param {*} { id, url }
   * @memberof Gif
   */
  constructor({ id, url, container }) {
    this.$el = document.createElement("div");
    this.id = id;
    this.url = url;
    this.$el.addEventListener("click", this.setFavorite.bind(this));
    this.render(container);
  }

  /**
   *
   *
   * @param {Node} container
   * @memberof Gif
   */
  render(container) {
    this.$el.className = "gif";
    const img = document.createElement("img");
    img.className = "gif__img";
    img.setAttribute("src", this.url);
    const favorite = document.createElement("div");
    favorite.className = "gif__favorite";
    this.$el.classList.toggle("liked", this.getLike());
    this.$el.appendChild(img);
    this.$el.appendChild(favorite);
    container.appendChild(this.$el);
  }

  /**
   *
   *
   * @returns {Boolean}
   * @memberof Gif
   */
  isLiked() {
    return this.$el.classList.contains("liked");
  }

  /**
   *
   *
   * @returns
   * @memberof Gif
   */
  getLike() {
    const data = storage.get();
    return data.some(element => element.id === this.id);
  }

  /**
   *
   *
   * @returns
   * @memberof Gif
   */
  setFavorite() {
    if (!this.isLiked()) {
      storage.set({ url: this.url, id: this.id });
      this.$el.classList.add("liked");
      return;
    }
    storage.remove(this.id);
    this.$el.classList.remove("liked");
  }
}

export default Gif;
