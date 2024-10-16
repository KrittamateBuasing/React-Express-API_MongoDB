const Product = require('../Models/Product')
const fs = require('fs')
exports.read = async (req, res) => {
    try {
        const id = req.params.id
        const producted = await Product.findOne({ _id: id }).exec()
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error ')
    }
}

exports.list = async (req, res) => {
    try {
        const producted = await Product.find({}).exec()
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error ')
    }
}
exports.listby = async (req, res) => {
    try {
        const{limit,sort,order} = req.body
        const producted = await Product.find({}).limit(limit).sort([[sort,order]]).exec()
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error ')
    }
}

exports.create = async (req, res) => {
    try {


        var data = req.body
        if (req.file) {
            data.file = req.file.filename
        }

        console.log(req.body)
        console.log(req.file)
        const producted = await Product(data).save()
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error ')
    }
}
exports.update = async (req, res) => {
    try {
        const id = req.params.id
        var newData = req.body
        console.log(newData)
        console.log(req.file)
        if(typeof req.file !== 'undefined'){
            newData.file = req.file.filename
            await fs.unlink('./uploads/' + newData.oldfile, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Edit success')
                }
            })
        }
        
        const updated = await Product.findOneAndUpdate({ _id: id }, newData, { new: true }).exec()
        res.send(updated)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error ')
    }
}

exports.remove = async (req, res) => {
    try {
        const id = req.params.id
        const removed = await Product.findOneAndDelete({ _id: id }, req.body, { new: true }).exec()
        if (removed?.file) {
            await fs.unlink('./uploads/' + removed.file, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('remove success')
                }
            })
        }

        res.send(removed)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error ')
    }
}
