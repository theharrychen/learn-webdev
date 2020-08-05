require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = new mongoose.model("Article", articleSchema);

// Requests for all articles
app
  .route("/articles")

  .get((req, res) => {
    Article.find((err, articles) => {
      if (!err) {
        res.send(articles);
      } else {
        res.send(err);
      }
    });
  })

  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err) => {
      if (!err) {
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    });
  })

  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });

// Requests for a specific article
app
  .route("/articles/:articleTitle")

  .get((req, res) => {
    const articleTitle = req.params.articleTitle;
    Article.findOne({ title: articleTitle }, (err, article) => {
      if (!err) {
        if (article) {
          res.send(article);
        } else {
          res.send(
            `No articles matching the title: '${articleTitle}' was found.`
          );
        }
      } else {
        res.send(err);
      }
    });
  })

  .put((req, res) => {
    const articleTitle = req.params.articleTitle;
    Article.findOneAndUpdate(
      { title: articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (err, result) => {
        if (!err) {
          if (result) {
            res.send(
              `Successfully updated the article with the title: '${articleTitle}'.`
            );
          } else {
            res.send(
              `There is no article with the title: '${articleTitle}' to be updated.`
            );
          }
        } else {
          res.send(err);
        }
      }
    );
  })

  .patch((req, res) => {
    const articleTitle = req.params.articleTitle;
    Article.updateOne(
      { title: articleTitle },
      { $set: req.body },
      (err, result) => {
        if (!err) {
          if (result.nModified) {
            res.send(
              `Successfully updated the article with the title: '${articleTitle}'.`
            );
          } else {
            res.send(
              `There is no article with the title: '${articleTitle}' to be updated.`
            );
          }
        } else {
          res.send(err);
        }
      }
    );
  })

  .delete((req, res) => {
    const articleTitle = req.params.articleTitle;
    Article.deleteOne({ title: articleTitle }, (err, result) => {
      if (!err) {
        if (result.deletedCount) {
          res.send(
            `Successfully deleted the article with the title: '${articleTitle}'.`
          );
        } else {
          res.send(
            `There is no article with the title: '${articleTitle}' to be deleted.`
          );
        }
      } else {
        res.send(err);
      }
    });
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
