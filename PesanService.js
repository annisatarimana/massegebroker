const amqp = require('amqplib');

console.log('Masukkan Pesan: ');
process.stdin.once('data', (chunk) => {
    let pesan = chunk.toString().trim();
    console.log('Pesan Terkirim!: ' + pesan + '|');

    async function sendMessage() {
        try {
            const connection = await amqp.connect('amqp://localhost');
            const channel = await connection.createChannel();

            const q = 'Pesan';
            const msg = pesan;

            await channel.assertQueue(q, { durable: false });
            channel.sendToQueue(q, Buffer.from(msg));

            await channel.close();
            await connection.close();
        } catch (error) {
            console.warn(error);
        }
    }

    sendMessage();
});
