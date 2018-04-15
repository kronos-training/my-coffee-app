import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Coffee } from './../logic/Coffee';
import { GeolocationService } from './../geolocation.service';
import { DataService } from './../data.service';
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
  tastingEnabled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private geolocation: GeolocationService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.coffee = new Coffee();

    this.routingSubscription = this.route.params
      .subscribe(params => {
        if (params['id']) {
          this.data.getCoffee(params['id'], (response) => {
            this.coffee = response;

            if (this.coffee.tastingRating) {
              this.tastingEnabled = true;
            }
          });
        }
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

  save() {
    this.data.save(this.coffee, result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }

}
