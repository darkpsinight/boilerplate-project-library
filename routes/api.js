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
        return res.send({ title: book.title, _id: book._id });
      } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
    })

    .delete(async function (req, res) {
      try {
        // delete all books in the database
        const result = await book_model.deleteMany({});

        if (result.deletedCount > 0) {
          //The returned response will be the string complete delete successful if successful
          return res.status(200).send("complete delete successful");
        }
      } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      try {
        let bookid = req.params.id;

        const book = await book_model.findById(bookid);

        if (!book) {
          return res.send("no book exists");
        }

        return res.json({
          _id: bookid,
          title: book.title,
          comments: book.comments || [],
        });
      } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
    })

    .post(async function (req, res) {
      try {
        let bookid = req.params.id;
        let comment = req.body.comment;

        //If comment is not included in the request, return the string missing required field comment
        if (!comment) {
          return res.send("missing required field comment");
        }

        let book = await book_model.findById(bookid);

        //If no book is found, return the string no book exists.
        if (!book) {
          return res.send("no book exists");
        }

        book.comments.push(comment);
        const updatedBook = await book.save();

        return res.json({
          _id: bookid,
          title: updatedBook.title,
          comments: updatedBook.comments,
          commentcount: updatedBook.comments.length,
        });
      } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
    })

    .delete(async function (req, res) {
      try {
        let bookid = req.params.id;

        const deletedBook = await book_model.findByIdAndDelete(bookid);
        //If no book is found, return the string no book exists.
        if (!deletedBook) {
          return res.send("no book exists");
        }

        //if successful response will be 'delete successful'
        return res.send("delete successful");
      } catch (error) {
        return res.status(500).send("Internal server error");
      }
    });
};
