// backend/models/User
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password_hash: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    tenant_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  User.associate = (models) => {
    User.belongsTo(models.Tenant, {
      foreignKey: 'tenant_id',
      as: 'tenant',
    });
    User.hasMany(models.UserPurchase, {
      foreignKey: 'user_id',
      as: 'purchases',
    });
    User.hasMany(models.ServiceData, {
      foreignKey: 'user_id',
      as: 'serviceData',
    });
  };

  return User;
};
