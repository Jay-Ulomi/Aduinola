const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const chatSocket = require('./sockets/socket');
const dotenv = require('dotenv');
// Load environment variables
dotenv.config();
// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

// Use express-ejs-layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const serviceRouter = require('./routes/service');
const projectsRouter = require('./routes/projects');
const blogsRouter = require('./routes/blog');
const testimonialsRouter = require('./routes/testimonials');
const communityRouter = require('./routes/community');
const contactsRouter = require('./routes/contact');
const educationRouter = require('./routes/education');
const teamsRouter = require('./routes/team');
const keyRoutes = require('./routes/key');

// Use Routes
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/service', serviceRouter);
app.use('/projects', projectsRouter);
app.use('/blogs', blogsRouter);
app.use('/testimonials', testimonialsRouter);
app.use('/community', communityRouter);
app.use('/contact', contactsRouter);
app.use('/education', educationRouter);
app.use('/teams', teamsRouter);
app.use('/keys', keyRoutes);

// Load Socket Logic
// require('./sockets/socket')(io);

// Socket connection and event handling
io.on('connection', (socket) => {
    chatSocket(socket, io);
});

// Start Server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
