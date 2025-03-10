
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('employee', 'manager', 'admin'),
      defaultValue: 'employee'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const bcrypt = require('bcryptjs');
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password') && user.password) {
          const bcrypt = require('bcryptjs');
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    },
    tableName: 'users'
  });

  User.associate = function(models) {
    // Un utilisateur peut avoir un manager
    User.belongsTo(models.User, {
      foreignKey: 'managerId',
      as: 'manager'
    });
    
    // Un utilisateur peut appartenir à un département
    User.belongsTo(models.Department, {
      foreignKey: 'departmentId',
      as: 'department'
    });

    // Un utilisateur peut avoir plusieurs demandes de congés
    User.hasMany(models.Leave, {
      foreignKey: 'userId',
      as: 'leaves'
    });

    // Un manager peut approuver plusieurs demandes de congés
    User.hasMany(models.Leave, {
      foreignKey: 'approvedById',
      as: 'approvedLeaves'
    });
  };

  User.prototype.comparePassword = async function(candidatePassword) {
    const bcrypt = require('bcryptjs');
    return bcrypt.compare(candidatePassword, this.password);
  };

  return User;
};
