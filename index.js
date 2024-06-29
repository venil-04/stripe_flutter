const express = require('express')
const Stripe = require('stripe')

const app = express();

const key = 'sk_test_51OSDrYSE8zZrBXkyS7izzU3hDaASdiXqSpsx2WIDieQ5HFgwHOEb0QnEzhc0F2i5fnAWGofm7rtu35SVCtLKglMs00DEILHQts'

const stripe = new Stripe(key)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/api/payment',async(req,res)=>{
    
    const {body} = req;
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount:body?.amount,
            currency:body?.currency
        });

        if(paymentIntent?.status!=='completed'){
            console.log("======in=====")
            return res.status(200).json({
                message:"confirm payment please",
                client_secret:paymentIntent?.client_secret,
            })
        }

        return res.status(200).json({message:"payment completed succefully"})
    }catch(err){
        console.log("error "+err);
    }
    res.send("hello")
})

app.listen(5000,()=>{console.log('app listning on port 5000')})