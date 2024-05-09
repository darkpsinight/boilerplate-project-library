/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const book_model = require("../models/book-model");

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async function (_, res) {
      try {
        const book = await book_model.find({});

        if (!book) {
          return res.json([]);
        }

        //The JSON response will be an array of objects with each object (book) containing title, _id, and commentcount properties.
        const response = book.map((book) => ({
          title: book.title,
          _id: book._id,
          commentcount: book.comments.length,
        }));
        return res.json(response);
      } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
    })

    .post(async function (req, res) {
      try {
        let title = req.body.title;

        // If title is not included in the request, the returned response should be the string missing required field title.
        if (!title) {
          return res.send("missing required field title");
        }

        const newBook = new book_model({ title });
        const book = await newBook.save();

        //The returned response will be an object with the title and a unique _id as keys.
        res.json({ title: book.title, _id: book._id });
      } catch (error) {
        console.log(error);
      }
    })

    .delete(async function (req, res) {
      try {
        const result = await book_model.deleteMany({});
        if (result.deletedCount > 0) {
          return res.status(200).send("complete delete successful");
        } else {
          return res.status(404).json({ error: "No books found to delete" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
};
