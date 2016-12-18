import {inject, bindable} from 'aurelia-framework';
import AuthService from 'resources/services/auth-service';

@inject(AuthService)
export class NavBar {
  @bindable router = null;

  constructor(authService) {
    this.authService = authService;
  }

  async attached() {
    $('.button-collapse').sideNav({
      closeOnClick: true
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateToRoute('start');
  }

  back() {
    this.router.navigateBack();
  }

  get canGoBack() {
    let routes = [ '/dashboard' ];
    return !(routes.includes(this.router.history.previousLocation));
  }

  get navigation() {
    let customNav = [];
    for (let navModel of this.router.navigation) {
      if (!((this.authService.isLoggedIn && navModel.settings.navHideAfterLogin ) ||
                 (!this.authService.isLoggedIn && navModel.settings.reqLogin ))) {
        customNav.push(navModel);
      }
    }
    return customNav;
  }
}
