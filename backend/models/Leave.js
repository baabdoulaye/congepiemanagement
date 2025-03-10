
module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define('Leave', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    leaveType: {
      type: DataTypes.ENUM('paid', 'sick', 'rtt', 'unpaid', 'special'),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    halfDayStart: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    halfDayEnd: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    duration: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'cancelled'),
      defaultValue: 'pending'
    },
    approvalDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'leaves'
  });

  Leave.associate = function(models) {
    // Une demande de congé appartient à un utilisateur
    Leave.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    // Une demande de congé peut être approuvée par un manager
    Leave.belongsTo(models.User, {
      foreignKey: 'approvedById',
      as: 'approvedBy'
    });
  };

  return Leave;
};
