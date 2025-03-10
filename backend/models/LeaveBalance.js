
module.exports = (sequelize, DataTypes) => {
  const LeaveBalance = sequelize.define('LeaveBalance', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    leaveType: {
      type: DataTypes.ENUM('paid', 'sick', 'rtt', 'unpaid', 'special'),
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    used: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    pending: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    remaining: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.total - this.used - this.pending;
      }
    }
  }, {
    tableName: 'leave_balances',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'leaveType', 'year']
      }
    ]
  });

  LeaveBalance.associate = function(models) {
    // Un solde de congés appartient à un utilisateur
    LeaveBalance.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return LeaveBalance;
};
