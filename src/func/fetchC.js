// import fetch from "node-fetch";
class toFetch {
  #method;

  constructor(URL, Header, body) {
    this.URL = URL;
    this.Header = Header;
    this.#method = "";
    this.body = body;
  }
  // Getter

  // Method
  async get() {
    this.#method = "get";
    const res = await this.#stertFetch();
    return res;
  }
  async post() {
    this.#method = "post";
    const res = await this.#stertFetch();
    return res;
  }
  async put() {
    this.#method = "put";
    const res = await this.#stertFetch();
    return res;
  }
  async delete() {
    this.#method = "delete";
    const res = await this.#stertFetch();
    return res;
  }

  #stertFetch() {
    return fetch(this.URL, {
      method: this.#method,
      headers: this.Header,
      body: this.body,
    });
  }
}

export default toFetch;
