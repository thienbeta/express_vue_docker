// backend/models/ServicePackage
module.exports = (sequelize, DataTypes) => {
  const ServicePackage = sequelize.define('ServicePackage', {
    package_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    service_type: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'service_packages',
    timestamps: false,
  });

  ServicePackage.associate = (models) => {
    ServicePackage.belongsToMany(models.Tenant, {
      through: models.TenantOfferedPackage,
      foreignKey: 'package_id',
      as: 'tenants',
    });
    ServicePackage.hasMany(models.UserPurchase, {
      foreignKey: 'package_id',
      as: 'purchases',
    });
    ServicePackage.hasMany(models.ServiceData, {
      foreignKey: 'package_id',
      as: 'serviceData',
    });
  };

  return ServicePackage;
};
