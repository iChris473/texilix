const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getPresales = async (next='') => {
    try {
        const presales = await axios.get(`https://api.presale.world/list-pools?flt=audit&sts=live&srt=total&pt=${next}`);
        return presales.data;
    } catch (error) {
        console.log(error);
        // throw new Error(error);
    }
};

// index route for home page
app.get("/", async (req, res) => {
    const data = await getPresales();
    return res.json(data);
});

const port = process.env.PORT || 3600;

app.listen(port, () => console.log(`Backend running on ${port}`));