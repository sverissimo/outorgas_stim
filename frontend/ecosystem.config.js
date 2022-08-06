module.exports = {
  apps: [
    {
      name: 'outorgas_frontEnd',
      script: 'yarn',
      interpreter: 'none',
      automation: false,
      args: 'vite preview',
      autorestart: false

    }

  ],

  /* deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  } */
};
