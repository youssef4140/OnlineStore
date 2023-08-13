import  Product  from "../models/productsModel.js";
import  order  from "../models/ordersModel.js";
import  usersModel  from "../models/usersModel.js";


import Stripe from "stripe";
import dotenv from "dotenv"; 

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_KEY)

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

    async checkoutSession(req, res) {

        this.saveOrderInfo(req,res);

        try{
            //console.log(req.body)
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: await this.findLineItems(req,res),
                success_url: 'http://localhost:8080/views/shop.html',
                cancel_url: 'http://localhost:8080/views/checkout.html',
                shipping_address_collection: {
                    allowed_countries: ['US','CA','AE'],
                  },
                  shipping_options: [
                    {
                      shipping_rate: 'shr_1Ne829J4aFi2GGEPucI2WL2y',
                    },
                ],
            })
            res.json({url: session.url})
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }

    async findLineItems(req,res) {
        const itemIds = req.body
        const ids = itemIds.items.map(item => item.id)
        // const quantity = itemIds.items.map(item => item.quantity)

        const items = JSON.parse(JSON.stringify(await Product.find({_id:{$in:ids}})))
        let itemswithquantity = []
        for (let i in items){
            let obj = {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: items[i].title
                    },
                    unit_amount: items[i].price * 100
                },
                quantity: itemIds.items.map(item => item.quantity)[i]
            }
            itemswithquantity.push(obj)
        }
        

        return  itemswithquantity;
        
    }

   async saveOrderInfo(req,res){
        try{

            const orderData = {paymentMethod : "visa", shippingMethod: "ship"};
            const products = req.body.items;
            const info = req.body.info;
            orderData.subTotal = 0;
            
            for(const p of products){

               const pro = await Product.findById(p.id);

               if(pro) orderData.subTotal+= pro.price*p.quantity;

               p._id = p.id;
            }

            orderData.totalPrice = orderData.subTotal + 15;

            orderData.products = products;

            orderData.shippingInfo = info;

            orderData.date = new Date( new Date().toLocaleDateString());

            orderData.status = "pending";

            orderData.userId = ( await usersModel.findOne({"email": res.locals.user.email}) )?._id || "id";

            await order.create(orderData);
        }
        catch(error){}

    }

}

export default new CartController();

