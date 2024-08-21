const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");
const Customer = require("../models/customer.model");
const ObjectId = require("mongodb").ObjectId;

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    console.log(orders);

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        console.log(order._id);

        const orderItems = await OrderItem.find({
          orderId: order._id,
        });
        console.log(orderItems);

        return {
          ...order,
          orderItems: orderItems,
        };
      })
    );

    res.json(ordersWithItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getOrder = async (req, res) => {
  const Id = req.params.id;

  try {
    const order = await Order.findOne({ _id: new ObjectId(Id) });

    const orderItems = await OrderItem.find({
      orderId: new ObjectId(order._id),
    });

    res.json({
      ...order,
      orderItems: orderItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addOrder = async (req, res) => {
  const order = req.body.order;
  const orderItems = req.body.orderItems;
  console.log(order);
  console.log(orderItems);

  //   req.body = orderinfo customer info orderitems
  try {
    const addedCustomer = await Customer.create({
      name: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
      address: order.customerAddress,
    });
    console.log(addedCustomer);

    const addedOrder = await Order.create({
      orderNumber: order.orderNumber,
      orderStatus: order.orderStatus,
      orderDate: order.orderDate,
      orderTotal: order.orderTotal,
      paymentMethod: order.paymentMethod,
      customerId: addedCustomer._id,
    });

    orderItems.forEach(async (orderItem) => {
      let item = {
        ...orderItem,
        orderId: addedOrder._id,
      };
      console.log(item);

      await OrderItem.create(item);
    });
    res.json(addedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateOrderStatus = async (req, res) => {
  const Id = req.params.id;

  const status = req.body.status;
  console.log(status);

  try {
    const editedOrder = await Order.updateOne(
      { _id: new ObjectId(Id) },
      { $set: { orderStatus: status } },
      { upsert: false }
    );

    res.json(editedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getOrders, updateOrderStatus, addOrder, getOrder };
