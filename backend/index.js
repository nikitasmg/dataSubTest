const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const redisClient = require('./redis-init')
const router = express.Router();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/", router);

router.post('/addData', async (request, response) => {
    const data = {id: '' + Date.now(), ...request.body}
    await redisClient.set(data.id, JSON.stringify(data));
    console.log(data)
    const currentPay = await redisClient.get(data.id)
    const payId = JSON.parse(currentPay).id
    const amount = JSON.parse(currentPay).data.amount
    response.json({payId, amount})
});

const PORT = 3001;
const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server app listening at http://192.168.2.16:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};
start();
