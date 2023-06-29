class Wall extends Structure{

    constructor(x, y, level){
        super(x, y, Config.tileType.WALL, 0, 0, level);
        
        this.drawing = new Image();

        if(level == 2){
            this.hp = Config.WALLLVL_2_HP;
            console.log("oui");
            this.drawing.src = "./images/stone_wall.png";
        }
        else if(level == 3){
            this.hp = Config.WALLLVL_3_HP;
            this.drawing.src = "./images/iron_wall.png";
        }
        else{
            this.hp = Config.WALLLVL_1_HP;
            this.drawing.src = "./images/wood_wall.png";
        }
    }

    update(){
        super.alive();
    }

    render(){
        Game.context.drawImage(this.drawing, this.x * World.tileSize - World.scrollX, this.y * World.tileSize - World.scrollY, World.tileSize, World.tileSize); 
    }
}