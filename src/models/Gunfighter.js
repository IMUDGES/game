let character=require('./character')
class Gunfighter extends character {
    constructor(){
        super(2)
        this._typeName=Gunfighter.name
    }



}

module.exports=Gunfighter