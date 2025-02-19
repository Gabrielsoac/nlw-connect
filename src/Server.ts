import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';

const app = fastify();

app.register(
    fastifyCors,
    {
        origin: true
    }
);

app.get('/hello', () => {
    return 'hello world'
});

app.listen(
    {
        port: 4000
    }
).then(
    () => {
        console.log('Run Server');   
    }
);