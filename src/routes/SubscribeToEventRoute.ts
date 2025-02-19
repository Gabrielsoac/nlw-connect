import { z } from 'zod';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {

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
}