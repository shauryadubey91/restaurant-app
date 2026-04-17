const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect("mongodb+srv://sauryadubey91_db_user:test123@cluster0.jqspfwp.mongodb.net/restaurant")
.then(()=>console.log("DB Connected ✅"))
.catch(err=>console.log(err));

// MODEL
const Order = mongoose.model("Order", {
  name: String,
  phone: String,
  address: String,
  items: Array,
  total: Number,
  status: String
});

// SAVE ORDER
app.post("/order", async (req, res) => {
  let order = new Order({
    ...req.body,
    status: "Pending"
  });

  await order.save();
  res.send("Order Saved");
});

// GET ORDERS
app.get("/orders", async (req, res) => {
  let orders = await Order.find();
  res.json(orders);
});

// UPDATE STATUS
app.post("/update", async (req, res) => {
  await Order.findByIdAndUpdate(req.body.id, {
    status: req.body.status
  });
  res.send("Updated");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

const Menu = mongoose.model("Menu", {
  name: String,
  price: Number,
  category: String
});

// GET MENU
app.get("/menu", async (req,res)=>{
  let data = await Menu.find();
  res.json(data);
});

// ADD MENU
app.post("/menu", async (req,res)=>{
  let item = new Menu(req.body);
  await item.save();
  res.send("Item Added");
});

// DELETE MENU
app.post("/deleteMenu", async (req,res)=>{
  await Menu.findByIdAndDelete(req.body.id);
  res.send("Deleted");
});

// UPDATE MENU
app.post("/updateMenu", async (req,res)=>{
  const {id,name,price,category} = req.body;

  await Menu.findByIdAndUpdate(id,{
    name,
    price,
    category
  });

  res.send("Updated ✅");
});
