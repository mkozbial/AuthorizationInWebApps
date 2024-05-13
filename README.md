# Project setup

Make sure Docker is installed and running on your system before executing any Docker commands. https://docs.docker.com/get-docker/.


## Development Environment Setup

For setting up the development environment, you will use Docker Compose to build and manage your services. You have options to start the backend, frontend, or both simultaneously. Here's how you can do it:


### Required .env file
Before running the whole build, you need to set environment variables in *.env* as presented in *.env-example* file.

#### Generating JWT Secret
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

```
Now you can copy the result and paste into the .env file.

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

### Database connection

#### Installing PostgreSQL

1. **Windows**
   - Go to the official PostgreSQL website: [Download PostgreSQL](https://www.postgresql.org/download/).
   - Choose the appropriate version for your operating system and download the installer.
   - Run the installer and follow the instructions to install PostgreSQL.
   - After the installation completes, ensure PostgreSQL has been successfully installed by running either the psql program or pgAdmin.
   - **Note:** If you want to use `psql` in the Windows terminal, you need to set the environment variable for PostgreSQL bin directory. This can usually be done during the installation process or manually by updating the system's PATH variable.

2. **Unix/Linux (Ubuntu):**
   - Open a terminal.
   - Execute the following commands to install PostgreSQL:
     ```
     sudo apt update
     sudo apt install postgresql postgresql-contrib
     ```
   - After the installation completes, PostgreSQL will automatically start as a service.

#### PostgreSQL setup
```
psql -U postgres 
```
The whole setup is managed by the **docker compose**, all you have to do is fill the example create your **.env** file basing of the given example.

**Note:** When you want to develop locally the host should be named as the database container name. 


#### Starting the Database

1. **Setup:**
After running the docker-compose and make command, you can enter the database container in order to setup the DB.

```
pqsl -U <username>
```

2. **Connect to DB:**
```
\c <database-name>
```
3. **Begin Project Work:** 

Run the database's structure initialization.

```
\i /path/to/file.sql
```





