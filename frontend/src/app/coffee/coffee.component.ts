import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Coffee } from './../logic/Coffee';
import { GeolocationService } from './../geolocation.service';
import { TastingRating } from '../logic/TastingRating';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit, OnDestroy {
  coffee: Coffee;
  types = ['Espresso', 'Ristretto', 'Americano', 'Cappuccino'];
  routingSubscription;

  constructor(
    private route: ActivatedRoute,
    private geolocation: GeolocationService
  ) { }

  ngOnInit() {
    this.coffee = new Coffee();

    this.routingSubscription = this.route.params
      .subscribe(params => {
        console.log(params['id']);
      });

    this.geolocation.requestLocation(location => {
      if (location) {
        this.coffee.location.latitude = location.latitude;
        this.coffee.location.longitude = location.longitude;
      }
    });
  }

  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }

  tastingRatingChange(checked: boolean) {
    if (checked) {
      this.coffee.tastingRating = new TastingRating();
    } else {
      this.coffee.tastingRating = null;
    }
  }


}
