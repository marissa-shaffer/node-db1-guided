const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const messages = await db.select("*").from("messages")
        res.json(messages)
    } catch(err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const message = await db.select("*").from("messages").where("id", req.params.id).limit(1)
        res.json(messages)
    } catch(err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
       const payload = {
           title: req.body.title,
           contents: req.body.contents,
       }

       if (!payload.title || !payload.contents) {
           return res.status(400).json({
               message: "Need a title and contents",
           })
       }
       const [id] = await db.insert(payload).into("messages")
       const message = await db.insert(payload).into("messages")

       res.status(201).json(messages)
    } catch(err) {
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const payload = {
            title: req.body.title,
            contents: req.body.contents,
        }
 
        if (!payload.title || !payload.contents) {
            return res.status(400).json({
                message: "Need a title and contents",
            })
        }
        await db("messages").where("id", req.params.id).update(payload)

        const message = await db.first("*").from("messages").where("id", req.params.id)
        res.json(message)

     } catch(err) {
         next(err)
     }
})

router.delete("/:id", async (req, res, next) => {
 try {
        await db("messages").where("id", req.params.id).del()

        res.status(204).end()
        
    } catch(err) {
        next(err)
    }
})

module.exports = router