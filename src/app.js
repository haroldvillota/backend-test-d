const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models')
const { getProfile } = require('./middleware/getProfile')
const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

const { SwaggerDocs } = require("./docs/swagger");
SwaggerDocs(app, 3001);


const contractRoutes = require("./routes/contractRoutes");
const jobRoutes = require("./routes/jobRoutes");

app.use("/api/contracts", getProfile, contractRoutes);
app.use("/api/jobs", getProfile, jobRoutes);

/**
 * FIX ME!
 * @returns contract by id
 */
app.get('/contracts/:id',getProfile ,async (req, res) =>{
    const { Contract } = req.app.get('models')
    const { id } = req.params
    const contract = await Contract.findOne({ where: { id } })
    if(!contract) return res.status(404).end()
    res.json(contract)
})

module.exports = app;
