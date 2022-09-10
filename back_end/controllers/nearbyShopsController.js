exports.getShops = (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        shops: [{name: "Shop1"}, {name: "Shop2"}]
    });
};