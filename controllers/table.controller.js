import Table from '../models/table';

export const getTables = (req, res) => {
    Table.find().sort('ordinal').exec((err, tables) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Tables fetched successfully', tables });
    });
}

export const getTable = (req, res) => {
    Table.find({ _id: req.params._id }).exec((err, table) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        if (table.length) {
            return res.json({ 'success': true, 'message': 'Product fetched by id successfully', table });
        } else {
            return res.json({ 'success': false, 'message': 'Product with the given id not found' });
        }
    })
}

export const addTable = (req, res) => {
    const newTable = new Table(req.body);
    console.log(newTable);
    newTable.save((err, table) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'Table added successfully', table });
    })
}

export const updateTable = (req, res) => {
    Table.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, table) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        console.log(table);
        return res.json({ 'success': true, 'message': 'Updated successfully', table });
    })
}

export const deleteTable = (req, res) => {
    Table.findByIdAndRemove(req.params._id, (err, table) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        console.log(table);
        return res.json({ 'success': true, 'message': ' deleted successfully' });
    })
}