import app from './app.js';
import { sequelize } from './config/db.js';
import './api/modules/user/user.model.js';
import './api/modules/task/task.model.js';
import { applyAssociations } from './api/modules/task/task.model.js'; // define associations here

import { env } from './config/env.js';

(async () => {
  try {
    await sequelize.authenticate();
    applyAssociations(); // set FK relations
    await sequelize.sync({ alter: true });
    console.log('✅ DB connected & synced');

    app.listen(env.port, () => {
      console.log(`🚀 Server running at http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('❌ DB error:', err);
    process.exit(1);
  }
})();
