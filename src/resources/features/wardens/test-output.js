import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class TestOutput {
    constructor(router) {
        this.router = router;
    }
}
