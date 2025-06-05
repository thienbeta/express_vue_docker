// backend/models/ServiceData
module.exports = (sequelize, DataTypes) => {
  const ServiceData = sequelize.define('ServiceData', {
    data_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tenant_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    package_id: {
      type: DataTypes.INTEGER,
    },
    data: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'service_data',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  ServiceData.associate = (models) => {
    ServiceData.belongsTo(models.Tenant, {
      foreignKey: 'tenant_id',
      as: 'tenant',
    });
    ServiceData.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    ServiceData.belongsTo(models.ServicePackage, {
      foreignKey: 'package_id',
      as: 'package',
    });
  };

  return ServiceData;
};
