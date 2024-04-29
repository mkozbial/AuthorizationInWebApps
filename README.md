# Project setup

Make sure Docker is installed and running on your system before executing any Docker commands. https://docs.docker.com/get-docker/

## Development Environment Setup

For setting up the development environment, you will use Docker Compose to build and manage your services. You have options to start the backend, frontend, or both simultaneously. Here's how you can do it:

### Building Services

To build all the services necessary for the development environment, run the following command in your terminal:

```bash
docker-compose build
```

### Starting Services

You can start the services individually or both at once depending on your need:

- **Backend Only**

  To start only the backend services in development mode, run:

  ```bash
  make dev-b
  ```

- **Frontend Only**

  To start only the frontend services in development mode, run:

  ```bash
  make dev-f
  ```

- **Both Backend and Frontend**

  To start both backend and frontend services simultaneously in development mode, use:

  ```bash
  make dev
  ```

## Production Environment Setup

Setting up the production environment requires building the frontend assets and the Docker images, followed by launching the services.

### Building Frontend Assets

Before building your Docker images in production, ensure that the frontend assets are compiled, use the following command in required directories:

```bash
npm run build
```

### Building Services

To build all the services necessary for the production environment, run:

```bash
docker-compose build
```

### Starting Services

Like in development, you can start the backend, frontend, or both in production mode:

- **Backend Only**

  To deploy only the backend services in production mode, run:

  ```bash
  make prod-b
  ```

- **Frontend Only**

  To deploy only the frontend services in production mode, run:

  ```bash
  make prod-f
  ```

- **Both Backend and Frontend**

  To deploy both backend and frontend services simultaneously in production mode, use:

  ```bash
  make prod
  ```