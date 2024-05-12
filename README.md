# Real-Time Messaging App with End-to-End Encryption

This project consists of both a NestJS backend and a Vite React frontend for real-time messaging with end-to-end encryption using the Diffie–Hellman key exchange protocol and Prisma ORM.

## Backend

The backend repository can be found [here](https://github.com/eduhdev12/echat).

## Features

- Real-time messaging system
- End-to-end encryption using Diffie–Hellman key exchange
- Secure storage and retrieval of messages using Prisma ORM
- Scalable and maintainable architecture with NestJS
- Secure auth sessions system

## Requirements

- Node.js
- NestJS
- Prisma

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/eduhdev12/echat-web.git
   ```

2. Install dependencies:

   ```bash
   cd echat-web
   npm install
   ```

3. Set up the database connection in `.env` file:

   ```env
   VITE_API_ENDPOINT="backend_endpoint"
   ```

4. Start the server:

   ```bash
   npm run build && npm run preview
   ```

## Frontend

The frontend is built using Vite and React.

## Usage

Once both the backend and frontend are set up, you can run the app and test the real-time messaging functionality

## Testing

To test the application:

1. Start the backend server.
2. Start the frontend development server.
3. Open your browser and navigate to the frontend URL.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- [Prisma](https://www.prisma.io/) - A modern database toolkit for TypeScript and Node.js.
- [Vite](https://vitejs.dev/) - A next-generation frontend tooling.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
