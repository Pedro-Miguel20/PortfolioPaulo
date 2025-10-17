var express = require('express');
var router = express.Router();
var cloudinary = require("cloudinary").v2;
var dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

let cache = null;
let lastFetch = 0;
let cloudinaryCalls = 0; // contador de chamadas pesadas ao Cloudinary

router.get("/", async (req, res) => {
  try {
    const now = Date.now();

    // cache de 10 minutos
    if (!cache || now - lastFetch > 10 * 60 * 1000) {
      cloudinaryCalls++; // incrementa contador

      console.log("⏳ Buscando imagens no Cloudinary... (chamada nº", cloudinaryCalls, ")");

      // pega ilustracoes
      const ilustracoes = await cloudinary.api.resources_by_asset_folder("ilustracoes", {
        type: "upload",
        resource_type: "image",
        transformations: [
          { fetch_format: "auto", quality: "auto" },
        ],
      });
      console.log("📂 Ilustrações carregadas:", ilustracoes.resources.length);

      // pega camisas
      const camisas = await cloudinary.api.resources_by_asset_folder("camisas", {
        type: "upload",
        resource_type: "image",
        transformations: [
          { fetch_format: "auto", quality: "auto" },
        ],
      });
      console.log("📂 Camisas carregadas:", camisas.resources.length);

      // pega logos
      const logos = await cloudinary.api.resources_by_asset_folder("logos", {
        type: "upload",
        resource_type: "image",
        transformations: [
          { fetch_format: "auto", quality: "auto" },
        ],
      });
      console.log("📂 Logos carregadas:", logos.resources.length);

      const posts = await cloudinary.api.resources_by_asset_folder("posts", {
        type: "upload",
        resource_type: "image",
        transformations: [
          { fetch_format: "auto", quality: "auto" },
        ],
      });
      console.log("📂 Logos carregadas:", posts.resources.length);

      // transforma em um único array com categoria
      cache = [
        ...ilustracoes.resources.map(r => ({
          url: r.secure_url,
          id: r.public_id,
          categoria: "ilustracao"
        })),
        ...camisas.resources.map(r => ({
          url: r.secure_url,
          id: r.public_id,
          categoria: "camisa"
        })),
        ...logos.resources.map(r => ({
          url: r.secure_url,
          id: r.public_id,
          categoria: "logo"
        })),
        ...posts.resources.map(r => ({
          url: r.secure_url,
          id: r.public_id,
          categoria: "post"
        })),
      ];

      lastFetch = now; // atualiza momento da última busca
    } else {
      console.log("⚡ Servindo imagens do cache (última chamada Cloudinary nº", cloudinaryCalls, ")");
    }

    res.render("index", { imagens: cache });

    console.timeEnd("⏱ Tempo resposta /"); // fim da medição de tempo

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar imagens");
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
