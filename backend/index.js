const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const router = express.Router();

const redis = require('redis');
const redisClient = redis.createClient(6379,'127.0.0.1');
redisClient.on('error', (err) => {
    console.log('Error occured while connecting or accessing redis server');
});
redisClient.connect().then(() => {
    if(!redisClient.get('customer_name',redis.print)) {
        //create a new record
        redisClient.set('customer_name','John Doe', redis.print);
        console.log('Writing Property : customer_name');
    } else {
        let val = redisClient.get('customer_name',redis.print);
        console.log(`Reading property : customer_name - ${val}`);
    }
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3001;
app.use(cors());
app.use(express.json());

app.use("/", router);


router.post('/addData',async (request,response) => {
    const data = {id: '' + Date.now(),...request.body}
    await redisClient.set(data.id, JSON.stringify(data));
    const value = await redisClient.get(data.id)
    const payId = JSON.parse(value).id
    response.json({payId})
});

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
