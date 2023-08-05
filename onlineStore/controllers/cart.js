import { Product } from "../models/productsModel.js";


class CartController {
    async findCart(req, res){
        try{
        const cartQuery = req.query.cart
        if(cartQuery){
            const cart = await Product.find({_id:{ $in: cartQuery.split('-')}})
            // console.log(cart);
            res.json(cart);
            res.end();
        } else {
            res.send("empty query");
            res.end();
        }

        }  catch (error) {
        console.error("Error:", error);
        }


    }
}

export default new CartController();

