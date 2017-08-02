class Character {
    constructor(type) {
        //起始位置
        this._pointX = 0                             //坐标X
        this._pointY = 0                             //坐标Y

        //基本属性
        this._type = type || 0                        //角色类型
        this._typeName = ''                          //角色类型名
        this._HP = 100                                  //血量
        this._ATK = 10                                  //攻击力
        //this._speed = 10                             //移动速度
        //this._jumpHeight = 10                     //跳跃高度

        //当前状态
        this._jump = false                             //跳跃
        this._walk = false                             //行走
        this._fall = false                              //下落
        this._attack = false                          //攻击
        this._face = 'right'                           //朝向
        this._dead = false                              //是否已经死亡

    }

    jump() {
        this._jump = false
    }

    getType() {
        return this._type
    }

    getTypeName() {
        return this._typeName
    }

    getHP() {
        return this._HP
    }

    setHP(value) {
        this._HP = value
    }

    getATK() {
        return this._ATK
    }

    //被其他玩家攻击到
    beAttackedBy(attacker) {
        let HP = this.getHP()
        HP = HP - attacker.getATK()

        //角色死亡
        if (HP <= 0) {
            this._dead = true
        }
        this.setHP(HP)
    }

    getMsg() {
        return {
            "HP": this.getHP(),
            "ATK": this.getATK()
        }
    }

}

module.exports = Character