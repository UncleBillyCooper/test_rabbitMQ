const amqplib = require('amqplib');

const getQueueName = "greeting";

const backQueueName = "callBack";



const getMsg = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(getQueueName, {durable: false})
    
    channel.consume(getQueueName, msg => {
        
        channel.assertQueue(backQueueName, {durable: false});
        let backMsg = msg.content.toString();
        channel.sendToQueue(backQueueName, Buffer.from('Ваше сообщение: '+backMsg));
        console.log(backMsg);
        backMsg = '';
        
        setTimeout(()=>{
            connection.close();
            process.exit(0)
        }, 500)
    })
       
}



getMsg()






