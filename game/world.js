class World{

    static worldSize;
    static tileSize;
    static tiles;

    static player;
    static base;
    static waves;

    static grid;

    static scrollX;
    static scrollY;

    constructor(){
        this.worldSize = 20;
        this.tileSize = 55;
        this.tiles = new Array(this.worldSize);

        this.player = new Player(0, 0);
        this.base = new Base(10, 10);

        World.worldSize = this.worldSize;
        World.tileSize = this.tileSize;
        World.tiles = this.tiles;

        World.player = this.player;
        World.base = this.base;
        World.waves = this.waves;

        World.scrollX = 0;
        World.scrollY = 0;

        World.grid = false;

        this.waves = new Waves(this);
    }

    generate(){
        for(let x = 0; x < this.worldSize; x++){
            this.tiles[x] = new Array(this.worldSize);
            for(let y = 0; y < this.worldSize; y++){
                if(this.getRandomInt(40) == 0){
                    this.tiles[x][y] = new Iron(x, y);
                }
                else if(this.getRandomInt(20) == 0){
                    this.tiles[x][y] = new Wood(x, y);
                }
                else if(this.getRandomInt(20) == 0){
                    this.tiles[x][y] = new Stone(x, y);
                }
                else{
                    this.tiles[x][y] = null;
                }
            }
        }

        this.tiles[this.base.x][this.base.y] = this.base;
    }

    spawnRessource(number){
        var count = 0;

        for(let x = 0; x < this.worldSize; x++){
            for(let y = 0; y < this.worldSize; y++){
                if(this.getRandomInt(40) == 0){
                    this.tiles[x][y] = new Iron(x, y);
                    count++;
                }
                else if(this.getRandomInt(20) == 0){
                    this.tiles[x][y] = new Wood(x, y);
                    count++;
                }
                if(this.getRandomInt(20) == 0){
                    this.tiles[x][y] = new Stone(x, y);
                    count++;
                }

                if(number <= count){ break; }
            }
        }
    }

    update(){
        Game.canvas.width = this.worldSize * this.tileSize;
        Game.canvas.height = this.worldSize * this.tileSize;

        this.tiles = World.tiles;

        for(let x = 0; x < this.worldSize; x++){
            for(let y = 0; y < this.worldSize; y++){
                if(this.tiles[x][y] != null){
                    this.tiles[x][y].update();
                }
            }
        }
        if(Game.build){ this.player.update(); }
        this.waves.update();

        World.scrollX = 0;
        World.scrollY = 0;
    }

    render(){
        for(let x = 0; x < this.worldSize; x++){
            for(let y = 0; y < this.worldSize; y++){
                if(this.tiles[x][y] != null){
                    this.tiles[x][y].render();
                }
            }
        }

        if(World.grid){ this.renderGrid(); }
        if(Game.build){ this.player.render(); }
        this.waves.render();
    }

    renderGrid(){
        for(let x = 0; x < World.worldSize; x++){
            for(let y = 0; y < World.worldSize; y++){
                Game.context.beginPath();
                Game.context.rect(x * this.tileSize, y * World.tileSize, World.tileSize, World.tileSize);
                Game.context.stroke();
                Game.context.closePath();
            }
        }
    }

    static addTile(x, y, tile){
        if(x < 0 || y < 0 || x >= World.worldSize || y >= World.worldSize) return;
        World.tiles[x][y] = tile;
    }

    static getTile(x, y){
        if(x < 0 || y < 0 || x >= World.worldSize || y >= World.worldSize) return null;
        return World.tiles[x][y];
    }

    static removeTile(x, y){
        if(x < 0 || y < 0 || x >= World.worldSize || y >= World.worldSize) return;
        World.tiles[x][y] = null;
    }

    getRandomInt(max){
        return Math.floor(Math.random() * max);
    }
}