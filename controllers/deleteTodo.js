const Todo = require("../models/Todo");
const mongoose = require('mongoose');

// define route handler
exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    // check if the todo id is valid
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Invalid todo id',
      });
    }

    // find the todo by its id and remove it
    const todo = await Todo.findByIdAndRemove(todoId);

    // check if todo exists
    if (!todo) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Todo not found',
      });
    }

    res.status(200).json({
      success: true,
      data: null,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal Server Error',
    });
  }
};
