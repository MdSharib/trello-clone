import taskModel from "../models/taskModel.js";
import dotenv from "dotenv";

dotenv.config();


export const createTaskController = async (req, res) => {
  try {
    const { name, description, status, id } =
      req.fields;
   
      console.log(name);
      console.log(description);
      console.log(status);
      console.log(id);
      
    

    // const tasks = new taskModel(task);
    // await taskModel.save();
    // res.status(201).send({
    //   success: true,
    //   message: "task Created Successfully",
    //   tasks,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing task",
    });
  }
};

// //get all task
// export const getTaskController = async (req, res) => {
//   try {
//     const products = await productModel
//       .find({})
//       .populate("category")
//       .select("-photo")
//       .limit(12)
//       .sort({ createdAt: -1 });
//     res.status(200).send({
//       success: true,
//       counTotal: products.length,
//       message: "ALlProducts ",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Erorr in getting products",
//       error: error.message,
//     });
//   }
// };



// //delete controller
// export const deleteTaskController = async (req, res) => {
//   try {
//     await productModel.findByIdAndDelete(req.params.pid).select("-photo");
//     res.status(200).send({
//       success: true,
//       message: "Product Deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while deleting product",
//       error,
//     });
//   }
// };

// //upate producta
// export const updateTaskController = async (req, res) => {
//   try {
//     const { name, description, price, category, quantity, shipping } =
//       req.fields;
//     const { photo } = req.files;
//     //alidation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "Name is Required" });
//       case !description:
//         return res.status(500).send({ error: "Description is Required" });
//       case !price:
//         return res.status(500).send({ error: "Price is Required" });
//       case !category:
//         return res.status(500).send({ error: "Category is Required" });
//       case !quantity:
//         return res.status(500).send({ error: "Quantity is Required" });
//       case photo && photo.size > 1000000:
//         return res
//           .status(500)
//           .send({ error: "photo is Required and should be less then 1mb" });
//     }

//     const products = await productModel.findByIdAndUpdate(
//       req.params.pid,
//       { ...req.fields, slug: slugify(name) },
//       { new: true }
//     );
//     if (photo) {
//       products.photo.data = fs.readFileSync(photo.path);
//       products.photo.contentType = photo.type;
//     }
//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Updated Successfully",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in Updte product",
//     });
//   }
// };

