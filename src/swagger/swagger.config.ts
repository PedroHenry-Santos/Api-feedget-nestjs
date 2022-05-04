import { SwaggerConfig } from './swagger.interface';

/**
 * Configuration for the swagger UI (found at /api).
 * Change this to suit your app!
 */
export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'API Feedget',
  description: 'Api de envio de feedback.',
  version: '1.0.0',
  tags: [],
  contact: {
    name: 'Pedro',
    url: '',
    email: 'pedrohenry.viana@gmail.com',
  },
  bearer: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT token',
    in: 'header',
  },
};
