module.exports = {
  apps: [
    {
      name: 'mywings-pwa',
      cwd: './.',
      script: 'server.js',
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};  