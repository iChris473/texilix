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

// Route for hot presales
app.get("/hotpresales", async (req, res) => {
    try {
        let hotSalesArray = [];
    
        const getHotSales = async (next = '', length = 5) => {
            const url = `https://api.presale.world/list-pools?flt=&sts=live&srt=total&pt=${next}`;
            const res = await axios.get(url);
            if (res?.data?.pools.length < 5) {
                getHotSales(res?.data?.nextPageToken, length - res?.data?.pools.length);
            }
            return hotSalesArray.concat(res?.data?.pools?.splice(0, length));
        }
    
        let hotPresales = await getHotSales();
        
        return res.json(hotPresales);
    } catch (error) {
        return res.status(404).json("Error retreiving data");
    }
})

const port = process.env.PORT || 3600;

app.listen(port, () => console.log(`Backend running on ${port}`));