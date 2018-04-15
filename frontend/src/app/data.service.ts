import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Coffee } from './logic/Coffee';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable()
export class DataService {
  endpoint = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getList(callback) {
    // TODO: change it with a real web service
    // const list = [
    //   new Coffee('Double Espresso', 'Sunny Cafe', new PlaceLocation('123 Market St', 'San Francisco')),
    //   new Coffee('Caramel Americano', 'Starcoffee', new PlaceLocation('Gran Via 34', 'Madrid'))
    // ];

    // callback(list);
    this.http.get(`${this.endpoint}/coffees`)
      .subscribe(response => {
        console.log(response);
        callback(response);
      });
  }

  save(coffee, callback) {
    // TODO: change it with a real web service
    // callback(true);
    if (coffee._id) {
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
        .subscribe(response => {
          callback(true);
        });
    } else {
      this.http.post(`${this.endpoint}/coffees`, coffee)
        .subscribe(response => {
          callback(true);
        });
    }
  }

  getCoffee(coffeeId: string, callback) {
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`)
      .subscribe(response => {
        callback(response);
      });
  }

}
