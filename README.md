# Project setup

Make sure Docker is installed and running on your system before executing any Docker commands. https://docs.docker.com/get-docker/.


## Development Environment Setup

For setting up the development environment, you will use Docker Compose to build and manage your services. You have options to start the backend, frontend, or both simultaneously. Here's how you can do it:

### Building Services
Before running the whole build, you need to set environment variables in .env, its structe can be checked in .env-example file.
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

#### Running PostgreSQL
```
psql -U postgres 
```
Additionally, you can use pgAdmin4, a graphical user interface for PostgreSQL administration, which is included in PostgreSQL installations. 

**Note:** When connecting to the PostgreSQL server for the first time, you may need to specify the following parameters: 
  - Server: localhost
  - Port: 5432
  - Username: postgres
  - Password: [your_password]


#### Starting the Database

1. **Create a Database:**
``` 
CREATE DATABASE secureauthdb
```
  To check if the database was created correctly, we can see if it is listed:
```
\l
```
2. **Begin Project Work:** \
Run the script that creates the database located in the repository. You can use a terminal or the pgAdmin4 user panel to do this.
- **Terminal**
  ```
  \i /path/to/file.sql
  ```
- **pg4Admin**
  1. Add new query \
  ![image](https://github.com/mkozbial/Authorization_in_web_apps/assets/121809496/a1a8d056-baf7-4075-b293-a36bfc5f9dd8)
  2. Paste the file content and run
  ![image](https://github.com/mkozbial/Authorization_in_web_apps/assets/121809496/f5689f38-02ae-441f-85da-0fa306b77cdb)

3. **Connect to the Database:** 
**Note** You need to have postgreSQL running (point "Running PostgreSQL")
```
\c secureauthdb
```



