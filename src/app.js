const express = require("express");
const cors = require("cors");
const {uuid} = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const repo = {
    id: uuid(),
    title, url, techs, likes: 0
  }
  repositories.push(repo);
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(repo => repo.id === id);
  console.log(repositoryIndex);
  if (repositoryIndex < 0){
    return response.status(400).json({error: "Repositorio Inexistente"});
  }
  const project = repositories[repositoryIndex];

  const updatedProject = {
    id,
    title,
    url,
    techs,
    likes: project.likes
  }
  repositories[repositoryIndex] = updatedProject;
  return response.json(updatedProject);

});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repositoryIndex = repositories.findIndex(repo => repo.id === id);
  if (repositoryIndex < 0){
    return res.status(400).json({error: "Repositorio Inexistente"});
  }
  const project = repositories[repositoryIndex];
  repositories.splice(repositoryIndex, 1);
  return res.status(204).json({});
  // TODO
});

app.post("/repositories/:id/like", (req, res) => {
const {id} = req.params;
const repositoryIndex = repositories.findIndex(repo => repo.id === id);
if (repositoryIndex < 0){
  return res.status(400).json({error: "Repositorio Inexistente"});
}
repositories[repositoryIndex].likes++;
return res.json(repositories[repositoryIndex]);


});

module.exports = app;
