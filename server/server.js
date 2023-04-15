const express = require("express"),
PORT = 3000,
app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/api", (req,res) => {
    let data = "hello";
    res.status(200).json(data);
});

// Unknown route handler
app.use((req, res) => res.status(404).send('Page not found'));

// Global error handler
app.use((err, req, res, next) => {
  console.log('Uh oh.. reached global error handler');
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));