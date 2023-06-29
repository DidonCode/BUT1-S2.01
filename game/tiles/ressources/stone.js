class Stone extends Tile {

    constructor(x, y){
        super(x, y, Config.tileType.STONE);
        this.drawing = new Image();
        this.drawing.src = "./images/stone.png";
    }

    update(){

    }

    render(){
        Game.context.drawImage(this.drawing, this.x * World.tileSize - World.scrollX, this.y * World.tileSize - World.scrollY, World.tileSize, World.tileSize); 
    }

}