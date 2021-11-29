import swDocument from './swagger.def'

const { sequelize, User } = require("../models");

const express = require("express"),
  http = require("http"),
  swaggerUI = require('swagger-ui-express')
const app = express();

const bodyParser = require("body-parser").json();
const server = http.createServer(app);
const hostname = "0.0.0.0";
const port = 3001;

app.use(bodyParser);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swDocument))

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  //sequelize.authenticate()
  sequelize.sync()
  console.log('Database Connected!')
});


app.post("/users", async (req: any, res: any) => {
  const { login, password, mail} = req.body;
  try{
    const user = await User.create({login, password, mail})
    return res.json(user)
  } catch(err){
    console.log(err)
    return res.status(500).json(err)

  }
});

app.get("/users", async (_: any, res: any) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
  
});

app.get('/users/:id', async (req: any, res: any) =>{
  const id = req.params.uuid
  try{
    const user = await User.findOne({
      were: { id }
    })
    return res.json(user)
  } 
  catch(err){
    console.log(err)
    return res.status(500).json({eror:'Something went wrong'})
  }

});

app.delete('/users/:id', async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({
      where: { id },
    });

    await user.destroy();
    return res.status(204).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

app.put("/users/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const { login, password, mail } = req.body;

  try {
    const user = await User.findOne({
      where: { id },
    });


    user.login = login;
    user.password = password;
    user.mail = mail;

    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});