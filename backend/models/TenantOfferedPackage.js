// backend/models/TenantOfferedPackage
module.exports = (sequelize, DataTypes) => {
  const TenantOfferedPackage = sequelize.define('TenantOfferedPackage', {
    tenant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    package_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    tableName: 'tenant_offered_packages',
    timestamps: false,
  });

  return TenantOfferedPackage;
};