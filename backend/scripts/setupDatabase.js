
const { sequelize } = require('../models');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

async function setupDatabase() {
  try {
    // Synchronise les modèles avec la base de données (crée les tables)
    await sequelize.sync({ force: true });
    console.log('Base de données créée avec succès');

    // Importe les modèles
    const { User, Department, Leave, LeaveBalance } = sequelize.models;

    // Crée le département par défaut
    const defaultDepartment = await Department.create({
      name: 'Administration'
    });

    // Crée un utilisateur admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      email: 'admin@congepie.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'System',
      role: 'admin',
      departmentId: defaultDepartment.id,
      startDate: new Date()
    });

    // Met à jour le département avec l'admin comme manager
    await defaultDepartment.update({
      managerId: admin.id
    });

    // Crée les types de soldes de congés pour l'admin
    const currentYear = new Date().getFullYear();
    await LeaveBalance.bulkCreate([
      {
        userId: admin.id,
        leaveType: 'paid',
        year: currentYear,
        total: 25
      },
      {
        userId: admin.id,
        leaveType: 'rtt',
        year: currentYear,
        total: 10
      }
    ]);

    console.log('Données initiales créées avec succès');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la configuration de la base de données:', error);
    process.exit(1);
  }
}

setupDatabase();
