const Todo = require("../models/Todo");
const mongoose = require("mongoose");

exports.getTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    // check if the todo id is valid
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Invalid todo id",
      });
    }

    // find the todo by its id
    const todo = await Todo.findById(todoId);

    // check if todo exists
    if (!todo) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
      message: "Todo found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal Server Error",
    });
  }
};
