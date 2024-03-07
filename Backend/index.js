const express = require("express");
const { addUsertoCourse } = require("./utilities/addUser");
const { Queue } = require("bullmq");
const app = express();

const PORT = process.env.PORT ?? 4000;

const emailQueue = new Queue("email-queue", {
    connection: {
        host: "redis-822ff42-ayushver9918-45da.a.aivencloud.com",
        port: 27609,
        username: "default",
        password:"AVNS_pgMG7eTuJr7bqhqOWjs"
    }
});

app.get('/', (req,res)=>{
    return res.json({ status : 'success'});
})

app.post('/add-user', async (req,res)=>{
    await addUsertoCourse();
    await emailQueue.add(`${Date.now()}` , {
        from:"ayushver9918@gmail.com",
        to: "ayushve35406603@gmail.com",
        subject: "Enrolled on course",
        body: "Dear Student, you have been enrolled to course"
    } );

    return res.json({ status : "success", message: "Enrollment success"});
})

app.listen(PORT,()=>{console.log(`Server started at PORT ${PORT}`)})