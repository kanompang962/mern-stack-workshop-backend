// connect to the database
const slugify = require('slugify');
const Blogs = require('../models/blogs');
const { v4: uuidv4 } = require('uuid');

// insert data 
exports.create = (req, res) => {
    const { title, content, author } = req.body;
    let slug = slugify(title);

    // check slug null and insert uuid
    if (!slug) {
        slug = uuidv4();
    }

    // validate data
    switch (true) {
        case !title:
            return res.status(400).json({ error: 'กรุณาป้อนชื่อบทความ' });
            break;
        case !content:
            return res.status(400).json({ error: 'กรุณาป้อนเนื้อหาบทความ' });
            break;
    }
    // insert data into database
    Blogs.create({ title, content, author, slug }, (err, data) => {
        if (err) {
            res.status(400).json({ error: 'บทความชื่อซ้ำกัน' });
        }
        res.json(data);

    });
};
// read data
exports.read = (req, res) => {
    Blogs.find({}).exec((err, data) => {
        res.json(data);
    })
};

// read data single
exports.readSingle = (req, res) => {
    const { slug } = req.params
    Blogs.findOne({ slug }).exec((err, data) => {
        res.json(data);
    })
};

// delete data single
exports.remove = (req, res) => {
    const { slug } = req.params
    Blogs.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            console.log(err);
        }
        res.json({
            message: 'ลบบทความเรียบร้อย'
        });
    })
};

// update data 
exports.update = (req, res) => {
    const { slug } = req.params
    const { title, content, author } = req.body;
    Blogs.findOneAndUpdate({ slug }, { title, content, author }, { new: true }).exec((err, data) => {
        if (err) {
            console.log(err);
        }
        res.json(data);
    })
};