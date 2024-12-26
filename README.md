# Webapp - Casting Agency

**Casting Agency** is an application that simulates a company responsible for creating movies, managing actors, and assigning them to those movies. Users in the system will have one of two roles: **Casting Assistant** or **Casting Director**, with each role having corresponding permissions. After successfully registering an account, users need to send a request to the admin to be granted permissions (as the application does not yet support automated permission assignment).

The Casting Agency application provides the following main features:

---

## **Features**

### **Movie Management**

#### **View Movie List**

- **Access Rights**: Casting Assistant, Casting Director
- Displays a list of all movies in the system.

#### **View Movie Details**

- **Access Rights**: Casting Assistant, Casting Director
- Displays detailed information about a specific movie, including the list of actors participating.

#### **Edit Movie**

- **Access Rights**: Casting Director only
- Allows users to update movie details by entering new information and clicking the **Submit** button.

#### **Delete Movie**

- **Access Rights**: Casting Director only
- Deletes a movie.
  - Click the trash icon to display a confirmation popup.
  - Click **Yes** to confirm deletion or **No** to cancel.

---

### **Actor Management**

#### **View Actor List**

- **Access Rights**: Casting Assistant, Casting Director
- Displays a list of all actors in the system.

#### **View Actor Details**

- **Access Rights**: Casting Assistant, Casting Director
- Displays detailed information about a specific actor, including the list of movies they participate in.

#### **Edit Actor**

- **Access Rights**: Casting Director only
- Allows users to update actor details by entering new information and clicking the **Submit** button.

#### **Delete Actor**

- **Access Rights**: Casting Director only
- Deletes an actor.
  - Click the trash icon to display a confirmation popup.
  - Click **Yes** to confirm deletion or **No** to cancel.

---

### **Permission Denied Page**

- If a user attempts to access a page they do not have permission for, the system redirects them to a **Permission Denied** page.

### **Logout**

- Users can log out of the application at any time.

---

## **Running the Webapp via URL**

1. Navigate to the provided URL.
2. Log in using one of the following accounts:
   - **Casting Assistant**
     - **Username**: `[Provide username here]`
     - **Password**: `[Provide password here]`
   - **Casting Director**
     - **Username**: `[Provide username here]`
     - **Password**: `[Provide password here]`

---

## **Running the Webapp Locally**

### **Setting up the Webapp**

1. **Install Dependencies**

   - Install **Node.js v20.0**.
   - Install **Angular v17.0**.
   - Open a terminal and run the following command:
     ```bash
     npm install
     ```

2. **Run the Webapp**

   - Open a terminal and run the following command:
     ```bash
     npm start
     ```
   - Open the provided local URL in your browser to access the application.

3. **Log in**
   - Use one of the accounts mentioned in the **Running the Webapp via URL** section to log in.
