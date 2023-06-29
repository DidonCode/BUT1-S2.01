class Enemie extends Entity{

    constructor(x, y, type, hp, dm){
        super(x, y, type, hp, dm);
        this.attackTime = 0;

        this.fireTime = 0;
        this.iceTime = 0;
        this.confusionTime = 0;

        this.burn = false;
        this.frost = false;
        this.confused = false;
    }

    update(){}
    render(){}

    attack(){
        let tileX = Math.round(this.x / World.tileSize);
        let tileY = Math.round(this.y / World.tileSize);

        let tileUp = World.getTile(tileX - 1, tileY);
        let tileDown = World.getTile(tileX + 1, tileY);
        let tileLeft = World.getTile(tileX, tileY - 1);
        let tileRight = World.getTile(tileX, tileY + 1);

        if(tileUp != null && ((tileUp.type == Config.towerType.ICETOWER || tileUp.type == Config.towerType.FIRETOWER || tileUp.type == Config.towerType.CONFUSIONTOWER) || tileUp.type == Config.tileType.BASE || tileUp.type == Config.tileType.WALL)){
            tileUp.inflictDamage(this.dm);
            return true;
        }
        else if(tileDown != null && ((tileDown.type == Config.towerType.ICETOWER || tileDown.type == Config.towerType.FIRETOWER || tileDown.type == Config.towerType.CONFUSIONTOWER) || tileDown.type == Config.tileType.BASE || tileDown.type == Config.tileType.WALL)){
            tileDown.inflictDamage(this.dm);
            return true;
        }
        else if(tileLeft != null && ((tileLeft.type == Config.towerType.ICETOWER || tileLeft.type == Config.towerType.FIRETOWER || tileLeft.type == Config.towerType.CONFUSIONTOWER) || tileLeft.type == Config.tileType.BASE || tileLeft.type == Config.tileType.WALL)){
            tileLeft.inflictDamage(this.dm);
            return true;
        }
        else if(tileRight != null && ((tileRight.type == Config.towerType.ICETOWER || tileRight.type == Config.towerType.FIRETOWER || tileRight.type == Config.towerType.CONFUSIONTOWER) || tileRight.type == Config.tileType.BASE || tileRight.type == Config.tileType.WALL)){
            tileRight.inflictDamage(this.dm);
            return true;
        }

        return false;
    }
}