const express = require("express");

const router = express.Router();

//Item Model

const Item = require("../../models/Item");

//post a item

router.post("/", async (req, res) => {
  const newitem = new Item({
    name: req.body.name,
  });

  try {
    const item = await newitem.save();
    res.json(item);
  } catch (error) {
    console.log(error);
  }
});

//delete a item with id
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    item.remove();
    res.json({ sucsess: true });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
