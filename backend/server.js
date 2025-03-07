
// Importation des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

// Configuration des variables d'environnement
dotenv.config();

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Permet les requêtes cross-origin
app.use(express.json()); // Parse le JSON des requêtes entrantes

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/departments', departmentRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('API CONGEPIE fonctionnelle');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
