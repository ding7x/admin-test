module.exports = {
  apps: [
    {
      name: 'admin-test',
      exec_mode: 'cluster',
      port: 3000,
      //instances: 'max', // Or a number of instances
      instances: 1,
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      autorestart: true,
      max_memory_restart: '1G',
    },
  ]
}
