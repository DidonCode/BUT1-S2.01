class Tower extends Structure{

    constructor(x, y, type, hp, dm, level){
        super(x, y, type, hp, dm, level);
        this.fireTime = 0;
        this.bullets = [];
    }

    update(){}

    render(){}

    updateBullets(){
        for(let i = 0; i < this.bullets.length; i++){
            this.bullets[i].update();
        }
    }

    renderBullets(){
        for(let i = 0; i < this.bullets.length; i++){
            this.bullets[i].render();
        }
    }

    fire(){
        const enemies = Waves.getEntities(this.x * World.tileSize, this.y * World.tileSize, Config.TOWER_RANGE * World.tileSize);

        if(enemies.length > 0){
            let shortEnemies = enemies[0];
            let minDistance = this.getDistance(enemies[0]);

            for(let i = 1; i < enemies.length; i++){
                let distance = this.getDistance(enemies[i]);
                if(distance < minDistance){
                    minDistance = distance;
                    shortEnemies = enemies[i];
                }
            }
            this.bullets.push(new Bullet(this.x * World.tileSize, this.y * World.tileSize, shortEnemies, this))
            return true;
        }
        return false;
    }

    getDistance(entity){
        return Math.sqrt(Math.pow(entity.x - World.base.x * World.tileSize, 2) + Math.pow(entity.y - World.base.y * World.tileSize, 2))
    }
}