// backend/models/Tenant
module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define('Tenant', {
    tenant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    admin_user_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'tenants',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  Tenant.associate = (models) => {
    Tenant.hasMany(models.User, {
      foreignKey: 'tenant_id',
      as: 'users',
    });
    Tenant.belongsTo(models.User, {
      foreignKey: 'admin_user_id',
      as: 'adminUser',
    });
    Tenant.belongsToMany(models.ServicePackage, {
      through: models.TenantOfferedPackage,
      foreignKey: 'tenant_id',
      as: 'offeredPackages',
    });
    Tenant.hasMany(models.ServiceData, {
      foreignKey: 'tenant_id',
      as: 'serviceData',
    });
  };

  return Tenant;
};