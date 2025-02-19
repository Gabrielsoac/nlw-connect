import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import  { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi} from '@fastify/swagger-ui';


const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(
    fastifyCors,
    {
        origin: true
    }
);

app.register(
    fastifySwagger,
    {
        openapi: {
            info: {
                title: 'NLW Connect',
                version: '0.0.1'
            }
        },
        transform: jsonSchemaTransform
    }
);

app.register(
    fastifySwaggerUi,
    {
        routePrefix: '/docs'
    }

)

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