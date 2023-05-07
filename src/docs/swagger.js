const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "DEEL BACKEND TASK", version: "1.0.0" },
  },
  apis: [  
    
  ],
};

const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const SwaggerDocs = (app, port) => {

  // Route-Handler to visit our docs
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Make our docs in JSON format available
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Docs are available on http://localhost:${port}/api/docs`
  );

};

module.exports = { SwaggerDocs };