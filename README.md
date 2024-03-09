# Task Manager Application

## Description

This is a task management application built using T3 app, NextAuth.js, Prisma, SapaBase, and Next.js. The application allows users to create tasks, set deadlines, assign tasks to specific users, and mark tasks as completed or important. It also provides functionality to view tasks that are incomplete.

## Features

- **Task Creation:** Users can create tasks with descriptions and deadlines.
- **Task Assignment:** Tasks can be assigned to specific users.
- **Task Status:** Tasks can be marked as completed or important.
- **Filtering:** Users can view tasks based on their completion status (completed, incomplete, important).

## Technologies Used

- **T3 app:** Used for task management functionality.
- **NextAuth.js:** Handles authentication in Next.js applications.
- **Prisma:** ORM used for database operations.
- **SapaBase:** Backend database for storing tasks and user information.
- **Next.js:** Framework for building React applications with server-side rendering.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/task-manager.git`
2. Navigate to the project directory: `cd task-manager`
3. Install dependencies: `npm install`

## Configuration

1. Set up your environment variables:
   - `DATABASE_URL`: Connection URL for your SapaBase database.
   - Other environment variables required by NextAuth.js and Prisma.

## Usage

1. Start the development server: `npm run dev`
2. Open your browser and navigate to `http://localhost:3000`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- NextAuth.js documentation: [https://next-auth.js.org/](https://next-auth.js.org/)
- Prisma documentation: [https://www.prisma.io/docs/](https://www.prisma.io/docs/)
- T3 app documentation: [https://t3-app.io/docs/](https://t3-app.io/docs/)
