import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import  { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi} from '@fastify/swagger-ui';
import { subscribeToEventRoute } from './routes/SubscribeToEventRoute';


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

app.register(subscribeToEventRoute);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

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