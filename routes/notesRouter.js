// this file will hold all the routes for our NOTES resource
const express = require("express");
const knex = require("../db/client");

// router is an object which is sort of like app
const router = express.Router();

// INDEX PATH
router.get("/", (request, response) => {
  knex.select("*") // all
  .from("notes") // notes table (already connected to) "express_lab_note_saver" DB in knexfile.js
  .limit(10) // limit to 10
  .orderBy("created_at", "DESC") // descending order
  .then ( (notes) => { // apparently we need this or KNEX won't fire the db request
    // response.send(notes);
    response.render("notes/index", {
      notes
    })
  })
});

// NEW NOTE PATH
router.get("/new", (req, res) => {
  res.render("notes/new");
});

// SHOW NOTE ROUTE
router.get("/:id", (req, res) => {
  const noteId = req.params.id
  knex.select("*")
  .from("notes")
  .where("id", noteId)
  .first()
  .then( (note) => {
    if(note) {
      res.render("notes/show", {
        id: note.id,
        title: note.title,
        content: note.content,
      })
    } else {res.send(`Cannot find note with id ${noteId}`)}
  })
})

// DELETE NOTE ROUTE
router.delete("/:id", (req, res) => {
  knex("notes")
  .where("id", req.params.id)
  .delete()
  .then(data => {
    console.log(data);
    res.redirect("/notes");
  })
})

// POST NOTE PATH
//👇use express
//     👇 HTTP method
//          👇posting to /articles as specified by the middleware
router.post("/", (req, res) => {
  // console.log(req.body.title, req.body.content)
  const title = req.body.title;
  const content = req.body.content;
  knex("notes")
    .insert({
      title,
      content: content,
    })
    .returning(["id", "title", "content"])
    .then( data => {
      let [noteData] = data
      let {id, title, content} = noteData
      // go to show page with data
      if (noteData !== undefined ) {
        res.render("notes/show", {
          id: id,
          title: title,
          content: content,
        });
      } else {
        res.send("There was an error creating article")
      }
    })
})

router.get("/:id/edit", (req, res) => {
  const noteId = req.params.id;
  knex("notes")
  .where("id", noteId)
  .first()
  .then( (note) => {
    res.render("notes/edit", {
      note: note
    })
  })
})

router.patch("/:id", (req, res) => {
  const noteId = req.params.id;
  const noteTitle = req.params.title;
  const noteContent = req.params.content;
  knex("notes")
  .where("id", noteId)
  .update({
    title: noteTitle,
    content: noteContent,
  })
  .returning(["id", "title", "content"])
  .then( data => {
    let [noteData] = data
    let {id, title, content} = noteData
    res.render("notes/show", {
      id,
      title,
      content,
    })
  })
})

module.exports = router;
