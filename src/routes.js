const modulePrefix = 'features';

export default [
  {
      route:    '',
      moduleId: `${modulePrefix}/dashboard/dashboard`,
      name:     'dashboard',
      title:    'Dashboard'
  },
  {
      route:    'settings',
      moduleId: `${modulePrefix}/account/settings`,
      name:     'settings',
      title:    'Settings'
  },
  {
    route:      'login',
    moduleId:   `${modulePrefix}/account/login`,
    name:       'login',
    title:      'Login'
  }
]
