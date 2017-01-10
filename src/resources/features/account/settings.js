import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Settings {
  constructor(router) {
    this.router = router;
  }
}
