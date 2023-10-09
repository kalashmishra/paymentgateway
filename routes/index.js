var express = require('express');
const Razorpay = require('razorpay');
var router = express.Router();
var { validatePaymentVerification, validateWebhookSignature } = require('../node_modules/razorpay/dist/utils/razorpay-utils');
var instance = new Razorpay({
  key_id: 'rzp_test_hRRXG0Yj1zPNJF',
  key_secret: 'QPs4GI8GtYDsBJgC96yH1PmF',
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create/orderId', (req, res) => {
  try {
    var instance = new Razorpay({ key_id: 'rzp_test_hRRXG0Yj1zPNJF', key_secret: 'QPs4GI8GtYDsBJgC96yH1PmF' })

    var options = {
      amount: 50000,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function (err, order) {
      console.log(order);
      res.send(order)
    });

  } catch (error) {
    console.log(error)
  }
})

router.post('/api/payment/verify',(req,res)=>{
var razorpayOrderId=req.body.response.razorpay_order_id;
var razorpayPaymentId= req.body.response.razorpay_payment_id;  
var signature= req.body.response.razorpay_signature;
var secret = 'QPs4GI8GtYDsBJgC96yH1PmF'
var status = validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
console.log(status);
res.send({signatureIsValid:status});
})

router.get('/success',(req,res)=>{
  res.render('success.ejs')
})

module.exports = router;
