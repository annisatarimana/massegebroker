const amqp = require('amqplib');

amqp.connect('amqp://localhost')
    .then(conn => {
        return conn.createChannel().then(ch => {
            console.log('Mencari Pesan!!');

            const ok = ch.assertQueue('Pesan', { durable: false });
            ok.then(() => {
                return ch.consume('Pesan', msg => console.log('Pesan Masuk: ', msg.content.toString()), { noAck: true });
            }).catch(console.warn);
        }).catch(console.warn);
    }).catch(console.warn);
