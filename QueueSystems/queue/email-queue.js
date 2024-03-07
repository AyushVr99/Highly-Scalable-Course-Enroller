const { Worker } = require("bullmq");

const sendMailtoUser = ({from, to , subject, body}) =>{
    return new Promise((resolve, reject) => {
        console.log(`Sending Email to ${to}....`);
        setTimeout(() => resolve(1), 2 * 1000);
      });
}

const worker = new Worker("email-queue", async(task)=>{
    const data = task.data;
    await sendMailtoUser({
        from : data.from,
        to : data.to,
        subject : data.subject,
        body : data.body
    });
},{
    connection: {
        host: "redis-822ff42-ayushver9918-45da.a.aivencloud.com",
        port: 27609,
        username: "default",
        password:"AVNS_pgMG7eTuJr7bqhqOWjs"
    }
})

module.exports = worker;