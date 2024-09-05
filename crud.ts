import express from "express";
import "express-async-error";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());
type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.get("api/planets/"),
  (req, res) => {
    const planet = planets;
    req.status(200).json({ planet });
  };

app.get("api/planets/:id"),
  (req, res) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    req.status(200).json({ planet });
  };

app.post("api/planets/"),
  (req, res) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    planets = [...planets, newPlanet];
    req.status(201).json({ msg: "the planet was created" });
  };

app.put("api/planets/:id"),
  (req, res) => {
    const { id } = req.params;
    const { names } = req.body;
    planets = planets.map((p) => (p.id === Number(id) ? { ...p, names } : p));

    console.log(planets);

    req.status(200).json({ msg: "the planet was updated" });
  };

  app.delete("api/planets/:id"), (req,res) => {
    const { id } = req.params
    planets = planets.filter((p) => p.id !== Number(id));
    req.status(200).json({msg: "the planet was deleted"})
  }

app.listen(port, () => {
  console.log("app listening on port 3000");
});