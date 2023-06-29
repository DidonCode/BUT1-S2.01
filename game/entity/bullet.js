class Bullet extends Entity {

    constructor(x, y, cible, property){
        super(x, y);
        this.cible = cible;
        this.property = property;

        this.drawing = new Image();

        if(this.property.type == Config.towerType.ICETOWER){
            this.drawing.src = "./images/ice_bullet.png";
        }

        if(this.property.type == Config.towerType.FIRETOWER){
            this.drawing.src = "./images/fire_bullet.png";
        }

        if(this.property.type == Config.towerType.CONFUSIONTOWER){
            this.drawing.src = "./images/confusion_bullet.png";
        }
    }

    update(){
        if(super.moveTo(this.cible.x, this.cible.y, Config.BULLET_SP, false)){
            this.cible.inflictDamage(this.property.dm);

            if(this.property.type == Config.towerType.ICETOWER && Math.floor(Math.random() * Config.BULLET_SPECIAL_CHANCE) == 0){
                this.cible.frost = true;
            }

            if(this.property.type == Config.towerType.FIRETOWER && Math.floor(Math.random() * Config.BULLET_SPECIAL_CHANCE) == 0){
                this.cible.burn = true;
            }

            if(this.property.type == Config.towerType.CONFUSIONTOWER && Math.floor(Math.random() * Config.BULLET_SPECIAL_CHANCE) == 0){
                this.cible.confused = true;
            }

            this.property.bullets.splice(this, 1);
        }
    }

    render(){
        Game.context.drawImage(this.drawing, this.x - World.scrollX, this.y - World.scrollY, World.tileSize / 1.5, World.tileSize / 1.5); 
    }
}