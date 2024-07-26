const fs = require('fs/promises');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

// var customData=[];

// for(let i = 0;i<10000;i++){
//     var user ={
//         id: `_id${i}`,
//         name: `User`+ (i+1)
//     };
//     customData.push(user);
// }

// var finaldata = {
//     data: customData
// }

// async function populate(){
//     await fs.writeFile('./data.json', JSON.stringify(finaldata));
// }

// populate()



app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.get('/data/:pageParam', async (req, res) => {
    const pageParam=req.params.pageParam;
    console.log(pageParam)
    const fileContent = await fs.readFile('./data.json');
    const backEndData = JSON.parse(fileContent);
    // if(startIndex>backEndData.data.length){
    //     throw new Error('Data Fetched out of bounds!')
    // }
    const dataToSend = backEndData.data.splice(pageParam*50,50);
    const data = {
        data: dataToSend,
        "hasNextPage": true,
        "nextPage": +pageParam+1
    };
    res.status(200).json(data);
});

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000)