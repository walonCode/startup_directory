
---
### **📌 Freetown Startup Directory**  
A public directory website showcasing essential startups in Freetown, allowing users to explore, review, and manage startup profiles.

---

## **🚀 Features**
✅ Browse startup listings with details like services, contact info, and reviews  
✅ Add new startups to the directory  
✅ Update or delete startup profiles (admin access)  
✅ Customers can leave and read reviews  
✅ Responsive design for mobile and desktop users  

---

## **📂 Project Structure**
```
/startup_directory
│── /client              # React.js frontend
│── /server              # Node.js + Express backend
│   │── /controllers     # Request handlers
│   │── /configs         # cors and mongodb config are in here
│   │── /models          # Mongoose schemas
│   │── /routes          # Express routes
│   │── index.js         # Main server file
│   │── /data            # Directory with sample data
│   │── .env             # Environment variables
└── README.md            # Project documentation
```

---

## **🛠 Tech Stack**
### **Frontend:**  
🔹 React.js (Vite)  
🔹 Tailwind CSS  
🔹 Axios  
🔹 React Toolkit and Redux (for state management)
🔹 React-Router-Dom-v7 (page routing and navigation)
🔹 Lucide-React and React-Icons 



### **Backend:**  
🔹 Node.js + Express.js  
🔹 MongoDB + Mongoose  
🔹 CORS + Dotenv  



---

## **📌 Setup Instructions**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/walonCode/startup-directory.git
cd startup-directory
```

### **2️⃣ Backend Setup**
```sh
cd server
npm install
```

- **Create a `.env` file** in `server/` with the following content:
  ```
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
  ```

- **Run the server**
  ```sh
  npm run dev
  ```

### **3️⃣ Frontend Setup**
```sh
cd ../client
npm install
npm run dev
```

---

## **📌 Prepopulate Database with Sample Data**
To populate the database with sample data, you can run a function in the `startupController`. This function will use the data provided in the `data/data.js` file to prepopulate the startup directory.

### **Steps to Prepopulate the Database:**

1. **Ensure you have completed the Backend Setup** as described above, and your server is running.
   
2. **Navigate to the `server/controllers/startupController.js`** file, and find the function that populates the database. It should look something like this:

   ```javascript
   const insertStartups = async () => {
     // Function to insert data into the database
     const startup = require('../data/data.js'); // Import data

     // Insert data into the database using your model
     try {
       await StartupModel.insertMany(startupData);
       console.log('Database successfully populated!');
     } catch (error) {
       console.error('Error populating database: ', error);
     }
   };
   ```

3. **Run the Prepopulation Function**:
   - Open your `server/index.js` file and call the `insertStartups()` function like so:

   ```javascript
   const { insertStartups } = require('./controllers/startupController');
   
   insertStartups(); // This will run the function and insert the data
   ```

4. **Restart the Backend** to trigger the function:

   ```sh
   npm run dev
   ```

   This will automatically insert the sample startup data from `data/data.js` into your MongoDB database.

---

## **🌍 API Endpoints**
| METHOD | ENDPOINT            | DESCRIPTION              |
|--------|---------------------|--------------------------|
| GET    | `/api/startups`     | Get all startups        |
| GET    | `/api/startups/:id` | Get a single startup    |
| POST   | `/api/startups`     | Add a new startup       |
| DELETE | `/api/startups/:id` | Remove a startup        |

---

## **🚀 Deployment**
- **Frontend:** Deployed on **Vercel**
- **Backend:** Hosted on **Vercel**
- **Database:** MongoDB Atlas  

---

## **📌 Contributing**
1. Fork the repo  
2. Create a feature branch: `git checkout -b feature-name`  
3. Commit changes: `git commit -m "Added feature"`  
4. Push to GitHub: `git push origin feature-name`  
5. Submit a pull request  

---
