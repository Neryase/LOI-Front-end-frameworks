export class Service {
  constructor(url, model) {
    this.url = url;
    this.model = model;
  }

  async getAll() {
    const res = await fetch(this.url, {
      method: "GET",
    });

    if (!res.ok) throw Error("Something went wrong");

    const items = await res.json();
    return items.map((i) => new this.model(i));
  }

  async getById(id) {
    const res = await fetch(this.url + `/${id}`, {
      method: "GET",
    });

    if (!res.ok) throw Error("Something went wrong");

    return new this.model(await res.json());
  }
}
