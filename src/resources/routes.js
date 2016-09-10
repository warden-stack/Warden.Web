const modulePrefix = 'resources/features';

export default [
  {
    route:    '',
    moduleId: `${modulePrefix}/dashboard/dashboard`,
    name:     'dashboard',
    title:    'Dashboard',
    nav:      true,
    settings: {
        reqLogin: true
    }
  },
  {
    route:      'login',
    moduleId:   `${modulePrefix}/account/login`,
    name:       'login',
    title:      'Login',
      settings: {
          hideNavbar:        true
      }
  },
    {
        route:    'settings',
        moduleId: `${modulePrefix}/account/settings`,
        name:     'settings',
        title:    'Settings',
        nav:      true,
        settings: {
            reqLogin: true
        }
    },
    {
        route:    'organizations',
        moduleId: `${modulePrefix}/organizations/organizations`,
        name:     'organizations',
        title:    'Organizations',
        nav:      true,
        settings: {
            reqLogin: true
        }
    },
    {
        route:    'wardens',
        moduleId: `${modulePrefix}/wardens/wardens`,
        name:     'wardens',
        title:    'Wardens',
        nav:      true,
        settings: {
            reqLogin: true
        }
    },
    {
        route:    'spawn',
        moduleId: `${modulePrefix}/wardens/spawn`,
        name:     'spawn',
        title:    'Spawn',
        nav:      true,
        settings: {
            reqLogin: true
        }
    },
    {
        route:    'test-output',
        moduleId: `${modulePrefix}/wardens/test-output`,
        name:     'test-output',
        title:    'Test output',
        nav:      true,
        settings: {
            reqLogin: true
        }
    }
]
