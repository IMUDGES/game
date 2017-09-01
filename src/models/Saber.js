let character=require('./character')
class Saber extends character{
    constructor(){
        super(1)
        this._typeName=Saber.name
    }
 }


 module.exports = Saber