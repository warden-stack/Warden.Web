const modulePrefix = 'resources/features';
const layoutPrefix = 'resources/layouts'

export default [
  {
    route: '',
    moduleId: `${modulePrefix}/home/landing`,
    name: 'landing',
    title: 'Start',
    settings: {
      hideNavbar: true,
      translationKey: 'route.start'
    }
  },
  {
    route: 'api-keys',
    moduleId: `${modulePrefix}/api-keys/api-keys-index`,
    name: 'apiKeysIndex',
    title: 'api-keys-index',
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'api-keys/new',
    moduleId: `${modulePrefix}/api-keys/api-keys-new`,
    name: 'apiKeysNew',
    title: 'api-keys-new',
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'organizations/:organizationId/wardens/:wardenId',
    moduleId: `${modulePrefix}/wardens/wardens-show`,
    name: 'wardenShow',
    title: 'warden-show',
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'organizations',
    moduleId: `${modulePrefix}/organizations/organizations-index`,
    name: 'organizationsIndex',
    title: 'organizations-index',
    nav: true,
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'organizations/:organizationId',
    moduleId: `${modulePrefix}/organizations/organization-show`,
    name: 'organizationShow',
    title: 'organization-show',
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'organizations/new',
    moduleId: `${modulePrefix}/organizations/organization-new`,
    name: 'organizationNew',
    title: 'organization-new',
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'organizations/:organizationId/wardens/new',
    moduleId: `${modulePrefix}/wardens/warden-new`,
    name: 'wardenNew',
    title: 'warden-new',
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'dashboard',
    moduleId: `${modulePrefix}/dashboard/dashboard`,
    name: 'dashboard',
    title: 'Dashboard',
    nav: true,
    settings: {
      reqLogin: true,
      translationKey: 'route.dashboard'
    }
  },
  {
    route: 'sign-in',
    moduleId: `${modulePrefix}/account/sign-in`,
    name: 'sign-in',
    title: 'Sign in',
    settings: {
      hideNavbar: true,
      translationKey: 'route.sign_in'
    }
  },
  {
    route: 'sign-up',
    moduleId: `${modulePrefix}/account/sign-up`,
    name: 'sign-up',
    title: 'Sign up',
    settings: {
      hideNavbar: true,
      translationKey: 'route.sign_up'
    }
  },
  {
    route: 'reset-password',
    moduleId: `${modulePrefix}/account/reset-password`,
    name: 'reset-password',
    title: 'Reset password',
    settings: {
      hideNavbar: true,
      translationKey: 'route.reset_password'
    }
  },
  {
    route: 'set-new-password',
    moduleId: `${modulePrefix}/account/set-new-password`,
    name: 'set-new-password',
    title: 'Set new password',
    settings: {
      hideNavbar: true,
      translationKey: 'route.set_new_password'
    }
  },
  {
    route: 'account/username',
    moduleId: `${modulePrefix}/account/set-username`,
    name: 'username',
    title: 'Set username',
    nav: false,
    settings: {
      reqLogin: true,
      translationKey: 'route.set_username'
    }
  },
  {
    route: 'account/settings',
    moduleId: `${modulePrefix}/account/settings`,
    name: 'settings',
    title: 'Settings',
    nav: true,
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'account/password',
    moduleId: `${modulePrefix}/account/change-password`,
    name: 'change-password',
    title: 'Change password',
    nav: false,
    settings: {
      reqLogin: true,
      translationKey: 'route.change_password'
    }
  },
  // {
  //   route: 'organizations',
  //   moduleId: `${modulePrefix}/organizations/organizations`,
  //   name: 'organizations',
  //   title: 'Organizations',
  //   nav: true,
  //   settings: {
  //     reqLogin: true
  //   }
  // },
  {
    route: 'organizations/:id/wardens',
    moduleId: `${modulePrefix}/organizations/organization-wardens`,
    name: 'organizationWardens',
    title: 'Organization Wardens',
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'organizations/:id/users',
    moduleId: `${modulePrefix}/organizations/organization-users`,
    name: 'organizationUsers',
    title: 'Organization Users',
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'wardens',
    moduleId: `${modulePrefix}/wardens/wardens`,
    name: 'wardens',
    title: 'Wardens',
    nav: true,
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'spawn',
    moduleId: `${modulePrefix}/wardens/spawn`,
    name: 'spawn',
    title: 'Spawn',
    nav: true,
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'test-output',
    moduleId: `${modulePrefix}/wardens/test-output`,
    name: 'test-output',
    title: 'Test output',
    nav: true,
    settings: {
      reqLogin: true
    }
  }
];
