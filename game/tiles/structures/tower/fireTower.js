class FireTower extends Tower {

    constructor(x, y, level){
        super(x, y, Config.towerType.FIRETOWER, 0, 0, level);

        this.drawing = new Image();

        if(level == 2){
            this.dm = Config.FIRETOWERLVL_2_DM;
            this.drawing.src = "./images/fire_tower_2.png";
        }
        else if(level == 3){
            this.dm = Config.FIRETOWERLVL_3_DM;
            this.drawing.src = "./images/fire_tower_3.png";
        }
        else{
            this.dm = Config.FIRETOWERLVL_1_DM;
            this.drawing.src = "./images/fire_tower_1.png";
        }

        this.hp = Config.TOWER_HP + Config.TOWER_GAIN * level;
    }

    update(){
        if(this.fireTime >= Config.TOWER_RELOAD){
            if(super.fire()){ this.fireTime = 0; }
        }else{
            this.fireTime += 0.1;
        }

        super.updateBullets();

        super.alive();
    }

    render(){
        Game.context.drawImage(this.drawing, this.x * World.tileSize - World.scrollX, this.y * World.tileSize - World.scrollY, World.tileSize, World.tileSize); 

        super.renderBullets();
    }
}