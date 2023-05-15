// Importing Router
const router = require("express").Router();

// Then We Need To Import This In Our Project ...
const todoItemModel = require("../models/todoItem.js");

// Add
router.post("/api/item", async (req, res) => {
  try {
    // We Will Import
    const newItem = new todoItemModel({
      item: req.body.item,
    });
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to Add Todo" });
  }
});

// Get Data
router.get("/api/items", async (req, res) => {
  try {
    const allTodoItems = await todoItemModel.find({});
    res.status(200).json(allTodoItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
});

// Update The Data By Id
router.put("/api/item/:id", async (req, res) => {
  try { 
    const updatedItem = await todoItemModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("Item Updated");
  } catch (error) {
    res.status(500).json({ error: "Failed to edit todos" });
  }
});

// Delete The Item .. 
router.delete("/api/item/:id", async (req,res) => {
  try {
    const deleteItem = await todoItemModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Item Deleted");
  } 
  catch (error) {
    res.status(500).json({ error: "Failed To Delete todo"});
  }
})

// We Also Need To Export Router ...

module.exports = router;
