module.exports = {
  apps : [{
    name: 'conversionService',
    script: 'conversionService.js',
    instances: 3,
    watch: './conversionService.js',
    log_file: 'service.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {

    }
  }, {
    name: 'conversionClient',
    script: 'conversionClient.js',
    instances: 1,
    watch: './conversionClient.js',
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
