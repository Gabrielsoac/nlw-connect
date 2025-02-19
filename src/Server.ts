import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import  { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(
    fastifyCors,
    {
        origin: true
    }
);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/hello', () => {
    return 'hello world'
});

app.post(
    '/subscriptions', 
    {
        schema: {
            body: z.object(
                {
                    name: z.string(),
                    email: z.string().email(),
                }
            ),
            response: {
                201: z.object(
                    {
                        name: z.string(),
                        email: z.string().email()
                    }
                )
            }
        }
    },
    async (req, reply) => {
        const {name, email} = req.body;

        return reply.status(201).send(
            {
                name,
                email
            }
        );
    }
)

app.listen(
    {
        port: 4000
    }
).then(
    () => {
        console.log('Run Server');   
    }
);