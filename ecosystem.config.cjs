module.exports = {
  apps: [{
    name: 'annuaire-backend',
    cwd: './backend',
    script: 'npm',
    args: 'start',
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 5000
    },
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    error_file: "./backend/logs/pm2-error.log",
    out_file: "./backend/logs/pm2-out.log",
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
