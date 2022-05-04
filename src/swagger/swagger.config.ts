import { SwaggerConfig } from './swagger.interface';

/**
 * Configuration for the swagger UI (found at /api).
 * Change this to suit your app!
 */
export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Nois Invest API',
  description: 'Api da ferramenta Nois Invest.',
  version: '1.0.0',
  tags: [],
  contact: {
    name: 'Nois Invest',
    url: 'noisinvest.com',
    email: 'suport@noisinvest.com',
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
