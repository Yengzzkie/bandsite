class BandSiteApi {
  constructor(apiKey) {
    this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
    this.apiKey = apiKey;
  }

  async getComments() {
    return await axios.get(`${this.baseUrl}/comments?api_key=${this.apiKey}`);
  }

  async postComment(name, comment) {
    return await axios.post(`${this.baseUrl}/comments?api_key=${this.apiKey}`, { name, comment });
  }

  async getShows() {
    return await axios.get(`${this.baseUrl}/showdates?api_key=${this.apiKey}`);
  }
}
