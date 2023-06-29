class Base extends Structure{
    
    constructor(x, y){
        super(x, y, Config.tileType.BASE, Config.BASE_HP, 0, 1);
        this.drawing = new Image();
        this.drawing.src = "./images/base.png";
    }

    update(){
        if(!super.alive()){
            Game.setBaseHealh(this.hp);
            Game.lose = true;
        }else{
            Game.setBaseHealh(this.hp);
        }
    }

    render(){
        Game.context.drawImage(this.drawing, this.x * World.tileSize - World.scrollX, this.y * World.tileSize - World.scrollY, World.tileSize, World.tileSize); 
    }
}