import { Router } from "express";
import bookModel from "../models/bookModel.js";
import BookController from "../controllers/bookController.js";
import multer from "multer";
const router= Router();
let imageName;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      imageName = Date.now() + '-' + Math.round(Math.random() * 1E9)+
      "-"+
      file.originalname.trim();
      cb(null, imageName);
    }
  })
  
  const upload = multer({ storage: storage });
  const bookController = new BookController();

//Book/add

router.post("/add", upload.single("image"), (req, res)=>{
    bookController.addBook(req, res, imageName);
});

router.get("/:id", bookController.getBookByID);

router.get("/", bookController.getBooks);

router.put("/update/:id", bookController.updateBook);

router.delete("/delete/:id", bookController.deleteBook);

router.get("/search/all", bookController.searchBook);

export default router;