const express = require("express"),
PORT = 3000,
app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/api", (req,res) => {
    let data = "hello";
    res.status(200).json(data);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));