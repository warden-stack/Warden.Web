const modulePrefix = 'resources/features';
const layoutPrefix = 'resources/layouts'

export default [
  {
    route: '',
    moduleId: `${modulePrefix}/home/landing`,
    layoutView: `${layoutPrefix}/sunset-layout.html`,
    name: 'landing',
    title: 'Start',
    settings: {
      hideNavbar: true,
      translationKey: 'route.start'
    }
  },
  {
    route: 'scratch/watchers',
    moduleId: `${modulePrefix}/scratch/watchers`,
    name: 'scratch-watchers',
    title: 'scratch-watchers',
    nav: true,
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'scratch/organizations',
    moduleId: `${modulePrefix}/scratch/organizations`,
    name: 'scratch-organizations',
    title: 'scratch-organizations',
    nav: true,
    settings: {
      reqLogin: true
    }
  },
  {
    route: 'scratch/organization',
    moduleId: `${modulePrefix}/scratch/organization`,
    name: 'scratch-organization',
    title: 'scratch-organization',
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
    layoutView: `${layoutPrefix}/sunset-layout.html`,
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
    layoutView: `${layoutPrefix}/particles-layout.html`,
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
  {
    route: 'organizations',
    moduleId: `${modulePrefix}/organizations/organizations`,
    name: 'organizations',
    title: 'Organizations',
    nav: true,
    settings: {
      reqLogin: true
    }
  },
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
