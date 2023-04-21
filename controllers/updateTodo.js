const Todo = require("../models/Todo");
const mongoose = require('mongoose');

exports.updateTodo = async (req, res) => {
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

    const { title, description, completed } = req.body;

    // check if title or description is provided
    if (!title && !description) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Title or description is required",
      });
    }

    // find the todo by its id and update it
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description, completed },
      { new: true }
    );

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
      message: "Todo updated successfully",
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
