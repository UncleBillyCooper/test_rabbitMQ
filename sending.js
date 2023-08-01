const amqplib = require('amqplib');

const queueName = "greeting";
const msg = "Привет Илья снова!";



const sendMsg = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, {durable: false})
    for(i=1; i<=8; i++) {
        channel.sendToQueue(queueName, Buffer.from(msg+i));//отправка сообщения 
    }
    
   
    setTimeout(()=>{
        connection.close();
        process.exit(0)
    }, 500)

    
    
}

sendMsg()

