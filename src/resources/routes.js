const modulePrefix = 'resources/features';

export default [
  {
      route:    '',
      moduleId: `${modulePrefix}/dashboard/dashboard`,
      name:     'dashboard',
      title:    'Dashboard',
      settings: {
          reqLogin: true
      }
  },
  {
      route:    'settings',
      moduleId: `${modulePrefix}/account/settings`,
      name:     'settings',
      title:    'Settings',
      settings: {
          reqLogin: true
        }
  },
  {
    route:      'login',
    moduleId:   `${modulePrefix}/account/login`,
    name:       'login',
    title:      'Login'
  }
]
