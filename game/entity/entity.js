class Entity{

    constructor(x, y, type, hp, dm){
        this.x = x;
        this.y = y;
        this.type = type;
        this.hp = hp;
        this.dm = dm;
        this.direction = Config.direction.UP;
    }

    update(){}
    render(){}

    moveTo(destX, destY, speed, collision){
        if(this.x >= destX - speed && this.x <= destX + speed && this.y >= destY - speed && this.y <= destY + speed){
            return true;
        }

        var dx = destX - this.x;
        var dy = destY - this.y;

        var angle = Math.atan2(dy, dx);

        var xa = Math.cos(angle) * speed;
        var ya = Math.sin(angle) * speed;

        if(collision){
            if(!this.collision(xa, 0, true)){
                this.x += xa;
            }

            if(!this.collision(0, ya, true)){
                this.y += ya;
            }
        }
        else{
            this.x += xa;
            this.y += ya;
        }
        
        return false;
    }

    inflictDamage(damage){
        this.hp -= damage;
    }

    collision(xa, ya, ressource){
        
        let newX = Math.round((this.x + xa + World.scrollX) / World.tileSize);
        let newY = Math.round((this.y + ya + World.scrollY) / World.tileSize);

        if(ressource){
            if(World.getTile(newX, newY) != null && (World.getTile(newX, newY).type == Config.tileType.IRON || World.getTile(newX, newY).type == Config.tileType.STONE || World.getTile(newX, newY).type == Config.tileType.WOOD)){
                return false;
            }else{
                if(World.getTile(newX, newY) == null){
                    return false
                }
            }
        }else{
            if(World.getTile(newX, newY) == null){
                return false
            }
        }
        

        return true;
    }

}