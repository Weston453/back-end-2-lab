const { Stats } = require("fs");
const house = require("./db.json");
let globalId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(house);
    },
    deleteHouse: (req, res) => {
        const {id} = req.params
        let index = house.findIndex(h => h.id === +id)
        house.splice(index, 1)
        res.status(200).send(house)
    },
    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body
        let newHouse = {
            id: globalId,
            address,
            price,
            imageURL
        }
        house.push(newHouse)
        globalId ++
        res.status(200).send(house)
    },
    updateHouse: (req, res) => {
        const {id} = req.params
        const{type} = req.body 
        let index = house.findIndex(h => h.id === +id);
        
        if (house[index].price === 0 && type === 'minus') {
            res.status(400).send('Cannot have negative house price.')
        }else if (type === 'plus') {
            house[index].price+=10000
            res.status(200).send(house)
        }else if (type === 'minus') {
            house[index].price-=10000
            res.status(200).send(house)
        }else {
            res.sendStatus(400)
        }
    }
};