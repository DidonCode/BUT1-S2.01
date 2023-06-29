class Player extends Entity {

    static iron;
    static stone;
    static wood;

    constructor(x, y){
        super(x, y, Config.entityType.PLAYER, 100, 0);
        this.speed = 3;

        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;
        this.pickup = false;

        this.drawing = new Image();
        this.drawing.src = Game.avatar;

        Player.iron = 1000;
        Player.stone = 1000;
        Player.wood = 1000;

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        document.addEventListener('keydown', this.keyDownHandler, false);
        document.addEventListener('keyup', this.keyUpHandler, false);
    }

    update(){
        if(this.forward && !this.collision(0, -this.speed, false)){
            this.y -= this.speed;
            this.direction = Config.direction.UP;
        }

        if(this.backward && !this.collision(0, this.speed, false)){
            this.y += this.speed;
            this.direction = Config.direction.DOWN;
        }

        if(this.left && !this.collision(-this.speed, 0, false)){
            this.x -= this.speed;
            this.direction = Config.direction.LEFT;
        }

        if(this.right && !this.collision(this.speed, 0, false)){
            this.x += this.speed;
            this.direction = Config.direction.RIGHT;
        }

        if(this.x < 0){ this.x = 0; }
        if(this.y < 0){ this.y = 0; }

        if(this.x + World.tileSize > World.tileSize * World.worldSize){ this.x = World.tileSize * (World.worldSize - 1); }
        if(this.y + World.tileSize > World.tileSize * World.worldSize){ this.y = World.tileSize * (World.worldSize - 1); }

        if(this.pickup){
            let coordX = Math.round((this.x + World.scrollX) / World.tileSize);
            let coordY = Math.round((this.y + World.scrollY) / World.tileSize);

            if(this.direction == Config.direction.UP){ coordY -= 1; }
            if(this.direction == Config.direction.DOWN){ coordY += 1; }
            if(this.direction == Config.direction.LEFT){ coordX -= 1; }
            if(this.direction == Config.direction.RIGHT){ coordX += 1; }

            let tileDirection = World.getTile(coordX, coordY);

            if(tileDirection != null){
                if(tileDirection.type == Config.tileType.IRON){
                    Player.iron += this.getRandomInt(2);
                    World.removeTile(coordX, coordY);
                }

                if(tileDirection.type == Config.tileType.STONE){
                    Player.stone += this.getRandomInt(2);
                    World.removeTile(coordX, coordY);
                }

                if(tileDirection.type == Config.tileType.WOOD){
                    Player.wood += this.getRandomInt(2);
                    World.removeTile(coordX, coordY);
                }
            }
        }

        Game.setIronValue(Player.iron);
        Game.setStoneValue(Player.stone);
        Game.setWoodValue(Player.wood);
    }

    render(){
        Game.context.drawImage(this.drawing, this.x, this.y, World.tileSize, World.tileSize);
    }

    keyUpHandler(event){
        if(event.key == Config.FORWARD){ this.forward = false; }
        if(event.key == Config.BACKWARD){ this.backward = false; }
        if(event.key == Config.LEFT){ this.left = false; }
        if(event.key == Config.RIGHT){ this.right = false; }
        if(event.key == Config.PICKUP){ this.pickup = false; }
    }

    keyDownHandler(event){
        if(event.key == Config.FORWARD){ this.forward = true; }
        if(event.key == Config.BACKWARD){ this.backward = true; }
        if(event.key == Config.LEFT){ this.left = true; }
        if(event.key == Config.RIGHT){ this.right = true; }
        if(event.key == Config.PICKUP){ this.pickup = true; }
    }

    destroy(){
        document.removeEventListener('keydown', this.keyDownHandler, false);
        document.removeEventListener('keyup', this.keyUpHandler, false);
    }

    getRandomInt(max){
        return Math.floor(Math.random() * max) + 1;
    }
}