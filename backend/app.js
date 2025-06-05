const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

app.use('/api/products', require('./routes/product.routes'));
app.use('/api/brands', require('./routes/brand.routes'));
db.Tenant = require('./tenant.model')(sequelize, Sequelize);
db.User = require('./user.model')(sequelize, Sequelize);
db.ServicePackage = require('./service_package.model')(sequelize, Sequelize);
db.TenantOfferedPackage = require('./tenant_offered_package.model')(sequelize, Sequelize);
db.UserPurchase = require('./user_purchase.model')(sequelize, Sequelize);
db.ServiceData = require('./service_data.model')(sequelize, Sequelize);

// Định nghĩa các mối quan hệ
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
})

db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synced.');
    app.listen(3000, () => console.log('Server running on port 3000'));
});
