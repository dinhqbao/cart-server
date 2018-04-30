import Order from '../models/order';

export const getNewOrderByTable = (req, res) => {
    Order.findOne({ tableName: req.params.tableName, status:{ $ne: 2 }}).exec((err, order) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Orders fetched successfully', order });
    });
}

export const getOrders = (req, res) => {
    Order.find({ status: { $ne: 2 } }).exec((err, orders) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Orders fetched successfully', orders });
    });
}

export const addOrder = (io, T) => {
    let result;
    const newOrder = new Order(T);
    newOrder.save((err, order) => {
        if (err) {
            result = { 'success': false, 'message': 'Some Error' };
            console.log(result);
        }
        else {
            const result = { 'success': true, 'message': 'Order added successfully', order };
            io.emit('orderAdded', result);
        }
    })
}

export const updateOrder = (io, T) => {
    let result;
    Order.findOneAndUpdate({ _id: T._id }, T, { new: true }, (err, order) => {
        if (err) {
            result = { 'success': false, 'message': 'Some Error', 'error': err };
            console.log(result);
        }
        else {
            result = { 'success': true, 'message': 'Updated successfully', order };
            switch (order.status) {
                case 0: {
                    io.emit('orderUpdated', result);
                    break;
                }
                case 1: {
                    io.emit('orderSucceeded', result);
                    break;
                }
                default: {
                    io.emit('orderPaid', result);
                    break
                }
            }
        }
    })
}

export const deleteOrder = (io, T) => {
    let result;
    console.log(req.body);
    Order.findByIdAndRemove(rT._id, (err, order) => {
        if (err) {
            result = { 'success': false, 'message': 'Some Error' };
        }
        else {
            result = { 'success': true, 'message': ' deleted successfully' };
            io.emit('orderDeleted', result);
        }
    })
}