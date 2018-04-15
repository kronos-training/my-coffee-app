import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Coffee } from './logic/Coffee';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable()
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  getList(callback) {
    // TODO: change it with a real web service
    const list = [
      new Coffee('Double Espresso', 'Sunny Cafe', new PlaceLocation('123 Market St', 'San Francisco')),
      new Coffee('Caramel Americano', 'Starcoffee', new PlaceLocation('Gran Via 34', 'Madrid'))
    ];

    callback(list);
  }

  save(coffee, callback) {
    // TODO: change it with a real web service
    callback(true);
  }

}
