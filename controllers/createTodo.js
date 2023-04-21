import Todo from '../models/Todo';

// define route handler
exports.createTodo = async(req,res)=>{
    try{
        // extract title and description from req.body

        const {title, description} = req.body;
        // create a new Todo object and insert in db
        const response = await Todo.create({
            title,
            description
        });
        // send a json response with a success flag
        res.status(200).json({
            sucess: true,
            data: response,
            message: 'entry created successfully!'
        });

    }catch(e){
        console.error(e);
        console.log(e);
        res.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: e.message
        });
    }
}