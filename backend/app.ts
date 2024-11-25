import express from "express";
import './loadEnviroments';
import categories from "./routes/categories";
import {CATEGORIES_URL} from "./shared/const";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(CATEGORIES_URL, categories);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

