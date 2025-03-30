import swaggerJsdoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import {Express, RequestHandler} from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task API",
      version: "1.0.0",
      description: "Documentación de la API de tareas",
    },
    servers: [
      {
        url: "https://us-central1-task-manager-atom.cloudfunctions.net/api",
      },
    ],
    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            id: {type: "string"},
            title: {type: "string"},
            description: {type: "string"},
            createdAt: {type: "string"},
            completed: {type: "boolean"},
            userId: {type: "string"},
          },
        },
        TaskInput: {
          type: "object",
          required: ["title", "userId"],
          properties: {
            title: {type: "string"},
            description: {type: "string"},
            completed: {type: "boolean"},
            userId: {type: "string"},
          },
        },
        User: {
          type: "object",
          properties: {
            id: {type: "string"},
            email: {type: "string"},
            name: {type: "string"},
            role: {type: "string", enum: ["admin", "user"]},
            createdAt: {type: "string"},
          },
        },
        UserInput: {
          type: "object",
          required: ["email", "name"],
          properties: {
            email: {type: "string"},
            name: {type: "string"},
            role: {type: "string", enum: ["admin", "user"]},
          },
        },
      },
    },
  },
  apis: ["src/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use(
    "/docs",
        swaggerUi.serve as unknown as RequestHandler,
        swaggerUi.setup(swaggerSpec) as unknown as RequestHandler
  );
};
