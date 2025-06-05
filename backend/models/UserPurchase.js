// backend/models/UserPurchase
module.exports = (sequelize, DataTypes) => {
  const UserPurchase = sequelize.define('UserPurchase', {
    purchase_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    package_id: {
      type: DataTypes.INTEGER,
    },
    purchase_date: {
      type: DataTypes.DATE,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'user_purchases',
    timestamps: false,
  });

  UserPurchase.associate = (models) => {
    UserPurchase.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    UserPurchase.belongsTo(models.ServicePackage, {
      foreignKey: 'package_id',
      as: 'package',
    });
  };

  return UserPurchase;
};