const express = require('express');
const dotenv = require('dotenv');
const compressResponse = require('./middleware/compressResponse');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const responseLogger = require('./middleware/responseLogger'); // Importa il middleware
const auth = require('./middleware/auth');
const requestId = require('./middleware/requestid'); // Importa il middleware per generare un ID unico


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Use built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use custom middleware
app.use(requestId);

// Use response logger middleware (deve essere subito dopo le rotte)
app.use(responseLogger);

//app.use(requestLogger); per delle request log, ma non sono utili (per ora)

//app.use(compressResponse);  // Use the custom compression middleware


// Routes
const matchRoutes = require('./routes/matchRoutes');
// const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
// const leagueRoutes = require('./routes/leagueRoutes');

// Apply authentication middleware to protected routes
app.use('/api/matches', auth, matchRoutes);
// app.use('/api/players', auth, playerRoutes);
app.use('/api/teams', auth, teamRoutes);
// app.use('/api/leagues', auth, leagueRoutes);


// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
