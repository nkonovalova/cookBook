import express from "express";
import './loadEnviroments';
import users from "./routes/users";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());


// Load the /posts routes
app.use("/users", users);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

