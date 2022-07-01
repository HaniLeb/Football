"use strict";

class LocalStorage {
  constructor(name, data) {
    this.name = name;
    this.data = data;
    this.arr_data = this.get();
  }

  get() {
    if (!localStorage.getItem(this.name)) {
      localStorage.setItem(this.name, "[]");
    }
    return JSON.parse(localStorage.getItem(this.name));
  }

  set() {
    this.arr_data.push(this.data);
    localStorage.setItem(this.name, JSON.stringify(this.arr_data));
  }
}
