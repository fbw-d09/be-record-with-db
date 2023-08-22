/** EXTERNAL DEPENDENCIES */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')


/** IMPORTS */
const recordsRouter = require("./routes/records");
const { setCors } = require("./middlewares/cors");


/** VARIABLES */
const port = process.env.PORT || 8000
const app = express();


/** MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setCors);



/** ROUTES */
app.use("/records", recordsRouter);



/** ERROR HANDLING */
app.use((req, res, next) => {
    const error = new Error("Looks like something broke...");
    error.statusCode = 404;
    next(error);
});

app.use((err, req, res, next) => {

    res.status(err.statusCode || 500).send({
        error: {
            message: err.message
        }
    });

});


/** LISTENER */
app.listen(port, () => {
    console.log(`server is listenig on ${port} ...🐒`)
})