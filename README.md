# Webapp - Casting Agency

The Casting Agency models a company that is responsible for creating movies and managing and assigning actors to those movies. Users on the system will have 1 of 2 rights (Casting Assistant, Casting Director) to use the functions corresponding to each right. After the user successfully registers an account on the application, send a request to the admin to grant permission (because the application does not have the function of granting permission yet)

The Casting Agency app that will be used for this project consists of a simple API with some functions:

1. Movie

- View list movie:

  - Casting Assistant, Casting Director can access the function
  - List all movies in system

- View detail movie:

  - Casting Assistant, Casting Director can access the function
  - Display all information related the particular movie, which actors enroll the movie

- Edit movie:

  - only Casting Director can access the function
  - The user can update movie's information, by input information and click <i>Submit</i> button

- Delete movie:
  - only Casting Director can access the function
  - Click on <i>trash</i> icon, show popup confirmation. Click <i>Yes</i> to delete or <i>No<i> to cancel

2. Actor

- View list actor:

  - Casting Assistant, Casting Director can access the function
  - List all actors in system

- View detail actor:

  - Casting Assistant, Casting Director can access the function
  - Display all information related the particular actor, which actors enroll the actor

- Edit actor:

  - only Casting Director can access the function
  - The user can update actor's information, by input information and click <i>Submit</i> button

- Delete actor:
  - only Casting Director can access the function
  - Click on <i>trash</i> icon, show popup confirmation. Click <i>Yes</i> to delete or <i>No<i> to cancel

3. Permission denied page

- If user redirect to page that user doesn't have permission, the page is rendered

4. Logout

## Running Webapp by URL

1. Redirect to url:

2. Login with 1 of 2 accounts:

- Casting Assistant:
  account: / pasword:

- Casting Director:
  account: / password:

## Running Webapp on local

### Setting up the Webapp on local

1. Install Dependencies

- Install Nodejs v20.0

- Install Angular v17.0

- Open terminal and run command:

```bash
npm install
```

2. Run the Webapp

Open the terminal and run command:

```bash
npm start
```

3. Login
