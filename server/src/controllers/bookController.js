import { Op } from "sequelize";
import bookModel from "../models/bookModel.js";

 export default class BookController{
    async addBook(req, res, imageName){
        const data= await bookModel.create({...req.body, image:imageName});
        console.log(data);
        if(data){
            res.json(data);
        }
        else res.json({success: false, message:"Error during adding the book"});
    
    };
    //get book by ID
    async getBookByID(req, res){
        const { id } = req.params;
        if (id){
            const data= await bookModel.findByPk(id);
            if (data){
                res.json(data);
            }else res.json([]);
        }else res.json({success:false, message:"Book ID not Provided"})
  
    };
    //Update
    async updateBook(req, res){
        const { id }= req.params;
        if (id){
            res.body;

            await bookModel.update(res.body, {
                where: {
                    id:id,
                },

            });
            if(data[0]==1){
                res.json({success:true, message:"Updated"});
            }else{
                res.json({success: false, message: "Can't Update"})
            }

        }else res.json({success:false, message:"Book ID not Provided"})
    }
    //Delete
    async deleteBook(req, res){
        const { id }= req.params;
        if (id){
            res.body;

            await bookModel.destroy({
                where: {
                    id:id,
                },

            });
            if(data){
                res.json({success:true, message:"Deleted"});
            }else{
                res.json({success: false, message: "Can't delete"})
            }

        }else res.json({success:false, message:"Book ID not Provided"})
    }
// Search Book
    async searchBook(req, res){
        const { q }= req.query;

        if (q){
            const data = await bookModel.findAll({
                where: {
                    [Op.or]:{
                        name: {
                            [Op.like]: `%${q}%`,
                        },
                        author:{
                            [Op.like]: `%${q}%`,
                        }
                    },
                },
            });
            console.log(data);
            res.json(data)

        }else
        res.json({success:false, message:"Search string"});
    }
    async getBooks(req, res){
        let { limit }= req.query;
        if (!limit) limit= 20;
        const data = await bookModel.findAll({
            limit,

        });
        console.log(data);
        for (let d of data){
           //console.log(d.datavalues); 
           d.dataValues.image="http://localhost:8000/uploads/"+d.dataValues.image;
        }
        res.json(data);
    }

}