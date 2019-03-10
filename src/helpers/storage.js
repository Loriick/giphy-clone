class storage {
  /**
   *Creates an instance of storage.
   * @param {String} key
   * @memberof storage
   */
  constructor(key) {
    this.key = key;
  }
  /**
   *
   *
   * @param {Array} value
   * @returns JSON
   * @memberof storage
   */
  stringify(value) {
    return JSON.stringify(value);
  }

  /**
   *
   *
   * @param {Json} value
   * @returns Array
   * @memberof storage
   */
  parseJSON(value) {
    return JSON.parse(value);
  }

  /**
   *
   *
   * @returns Array
   * @memberof storage
   */
  get() {
    return this.parseJSON(localStorage.getItem(this.key));
  }

  /**
   *
   *
   * @param {Array} value
   * @memberof storage
   */
  set(value) {
    const storage = this.get();
    const newStorage = storage !== null ? [...storage, value] : [value];
    localStorage.setItem(this.key, this.stringify(new Set(newStorage)));
  }

  /**
   *
   *
   * @param {String} id
   * @memberof storage
   */
  remove(id) {
    const storage = this.get();
    const newStorage = storage.filter(element => element.id !== id);
    localStorage.setItem(this.key, this.stringify(newStorage));
  }
}

export default new storage("favorite");
