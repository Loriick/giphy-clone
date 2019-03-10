class api {
  /**
   *
   *
   * @param {String} search
   * @param {String} api_key
   * @param {number} [limit=10]
   * @returns Object
   * @memberof api
   */
  async getSearchGif(search, api_key, limit = 10) {
    const res = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${api_key}&limit=${limit}`
    );
    const { data } = await res.json();
    return data;
  }
  /**
   *
   *
   * @param {String} api_key
   * @param {number} [limit=10]
   * @returns Object
   * @memberof api
   */
  async getTrendingGif(api_key, limit = 10) {
    const res = await fetch(
      `http://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=${limit}`
    );
    const { data } = await res.json();
    return data;
  }
}

export default new api();
