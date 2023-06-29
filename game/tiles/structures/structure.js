class Structure extends Tile {

    constructor(x, y, type, hp, dm, level){
        super(x, y, type);
        this.hp = hp;
        this.dm = dm;
        this.level = level;
    }

    update(){}
    render(){}

    inflictDamage(damage){
        this.hp -= damage;
    }

    alive(){
        if(this.hp <= 0){
            World.removeTile(this.x, this.y);
            return false;
        }
        return true;
    }
}