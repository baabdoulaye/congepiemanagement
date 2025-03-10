
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'departments'
  });

  Department.associate = function(models) {
    // Un département peut avoir plusieurs utilisateurs
    Department.hasMany(models.User, {
      foreignKey: 'departmentId',
      as: 'users'
    });

    // Un département peut avoir un manager
    Department.belongsTo(models.User, {
      foreignKey: 'managerId',
      as: 'manager'
    });
  };

  return Department;
};
