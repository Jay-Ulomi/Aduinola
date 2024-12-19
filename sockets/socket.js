const Message = require('../models/message');

const qaDatabase = [
    {
        question: "What software development services do you offer?",
        answer: "We offer custom software development, mobile app development, web development, and software consulting services."
    },
    {
        question: "How long does it take to develop a software solution?",
        answer: "The timeline depends on the complexity and scope of the project. Generally, it can take anywhere from a few weeks to several months."
    },
    {
        question: "What technologies do you use for software development?",
        answer: "We work with a wide range of technologies including JavaScript, Python, PHP, Laravel, React, and more. We choose the technology stack based on the project requirements."
    },
    {
        question: "Do you offer ongoing maintenance after the software is developed?",
        answer: "Yes, we provide ongoing maintenance and support services after the software is developed to ensure it continues to function smoothly."
    },
    {
        question: "How do I get started with a software development project?",
        answer: "To get started, you can reach out to us through our contact form, and we’ll schedule a consultation to discuss your project requirements."
    }
];

const chatSocket = (socket, io) => {
    console.log('A user connected');
    
    // Ask for name and email from the user
    socket.emit('requestUserInfo', { message: 'Please provide your name and email.' });

    // Handle when user provides their name and email
    socket.on('init', (data) => {
        // Save user info
        socket.userData = {
            name: data.name,
            email: data.email,
            role: data.role || 'user' // Default role is 'user'
        };
        console.log(`User connected: ${socket.userData.name} (${socket.userData.email})`);
    });

    // When a new message is received from the client
    socket.on('message', async (data) => {
        try {
            // Save message to the database
            const newMessage = new Message({
                user: socket.userData.name,
                email: socket.userData.email,
                message: data.message,
                role: socket.userData.role,
            });
            await newMessage.save();

            // Check if the message matches any predefined Q&A
            const qa = qaDatabase.find(q => q.question.toLowerCase() === data.message.toLowerCase());

            if (qa) {
                // If a match is found, send the predefined answer
                socket.emit('newMessage', {
                    message: qa.answer,
                    user: 'Bot',
                    role: 'bot'
                });
            } else {
                // If no match, request a dynamic response
                await fetchDynamicAnswer(data.message, socket);
            }

          

        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    // Function to fetch dynamic answers, for example from an API
    const fetchDynamicAnswer = async (userMessage, socket) => {
        try {
            // Placeholder for dynamic API call or logic (can integrate AI models, APIs, etc.)
            // For example, using a mock response:
            const dynamicResponse = "Sorry, I don't have an answer for that. Can you ask something else?";
            
            // Emit dynamic response to the user
            socket.emit('newMessage', {
                message: dynamicResponse,
                user: 'Bot',
                role: 'bot'
            });
        } catch (error) {
            console.error('Error fetching dynamic answer:', error);
            socket.emit('newMessage', {
                message: "I'm having trouble processing your request right now.",
                user: 'Bot',
                role: 'bot'
            });
        }
    };

    // Typing indicator
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { user: data.user });
    });

    // Listen for read message event
    socket.on('readMessage', (messageId) => {
        Message.findByIdAndUpdate(messageId, { read: true }, (err) => {
            if (err) console.error(err);
            socket.emit('readMessage');
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
};

module.exports = chatSocket;
