module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define('ProductCategory', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        parent_id: { type: DataTypes.INTEGER },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE }
    }, {
        tableName: 'product_categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    ProductCategory.associate = (models) => {
        ProductCategory.hasMany(models.ProductCategory, {
            foreignKey: 'parent_id',
            as: 'children',
        });

        ProductCategory.belongsTo(models.ProductCategory, {
            foreignKey: 'parent_id',
            as: 'parent',
        });
    };

    return ProductCategory;
};
