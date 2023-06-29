class FastEnemie extends Enemie {

    constructor(x, y){
        super(x, y, Config.entityType.FASTER, Config.FASTERENEMIES_HP, Config.FASTERENEMIES_DM);

        this.drawing = new Image();
        this.drawing.src = "./images/faster_enemie.png";
    }

    update(){
        var speed = 0;
        if(this.frost){ 
            speed = Config.FASTERENEMIES_SP / 2;
            this.iceTime += 0.1;

            if(this.iceTime >= Config.ICE_DELAY){
                this.frost = false;
                this.iceTime = 0;
            }
        }
        else{ 
            speed = Config.FASTERENEMIES_SP; 
        }

        if(this.burn){ 
            this.hp -= Config.BURN_DM; 
            this.fireTime += 0.1;

            if(this.fireTime >= Config.FIRE_DELAY){
                this.burn = false;
                this.fireTime = 0;
            }
        }

        if(!this.confused){
            super.moveTo(World.base.x * World.tileSize, World.base.y * World.tileSize, speed, true);
        }else{
            this.confusionTime += 0.1;

            if(this.confusionTime >= Config.CONFUSION_DELAY){
                this.confused = false;
                this.confusionTime = 0;
            }
        }

        if(this.attackTime >= Config.ENEMIE_RELOAD){
            if(super.attack()){ this.attackTime = 0; }
        }else{
            this.attackTime += 0.1;
        }
    }

    render(){
        Game.context.drawImage(this.drawing, this.x - World.scrollX, this.y - World.scrollY, World.tileSize, World.tileSize); 
    }
}