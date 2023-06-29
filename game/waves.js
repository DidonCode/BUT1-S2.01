class Waves{

    static enemie; 

    constructor(world){
        this.world = world;

        this.wave = 0;
        this.time = 0;

        this.enemie = [];
        Waves.enemie = this.enemie;

        Game.setWavesValue(this.wave);
    }

    update(){
        if(this.enemie != null && this.enemie.length == 0){
            if(this.time > Config.WAVE_DELAY){
                this.time = 0;
                this.generate();
                this.world.spawnRessource(this.wave);
                Game.build = false;
                Game.setWavesValue(this.wave);
            }
            else{
                this.time += 0.1;
                Game.build = true;
                Game.setWavesTime(Math.floor(Config.WAVE_DELAY - this.time) + 1);
            }
        }

        //------------------\\

        if(this.enemie != null){
            for(let i = 0; i < this.enemie.length; i++){
                if(this.enemie[i] != null){
                    if(this.enemie[i].hp <= 0){
                        this.enemie.splice(i, 1);
                    }else{
                        this.enemie[i].update();
                    }
                }
            }
        }

        //------------------\\

        if(Game.waves != null && this.wave >= Game.waves + 1){
            Game.win = true;
        }
    }

    render(){
        if(this.enemie != null){
            for(let i = 0; i < this.enemie.length; i++){
                if(this.enemie[i] != null){
                    this.enemie[i].render();
                }
            }
        }
    }

    generate(){
        this.wave += 1;
        this.enemie = [];

        for(let i = 0; i < this.wave * 2; i++){
            let random = Math.floor(Math.random() * 3);
            let position = this.randomPositionWorld();
            position[0] *= this.world.tileSize;
            position[1] *= this.world.tileSize;

            if(random == 0){
                this.enemie.push(new FastEnemie(position[0], position[1]));
            }
            if(random == 1){
                this.enemie.push(new TankEnemie(position[0], position[1]));
            }
            if(random == 2){
                this.enemie.push(new WarriorEnemie(position[0], position[1]));
            }
        }

        Waves.enemie = this.enemie;
    }

    randomPositionWorld(){
        let distance = this.world.worldSize;
        let distanceX = (Math.floor(Math.random() * distance) + 1);
        let distanceY = (Math.floor(Math.random() * distance) + 1);

        let regions = Math.floor(Math.random() * 4);

        if(regions == 0) { return [distanceX, 0]; }
        if(regions == 1) { return [0, distanceY]; }

        if(regions == 2) { return [distanceX, this.world.worldSize - 3]; }
        if(regions == 3) { return [this.world.worldSize - 3, distanceY]; }
    }

    static getEntities(x, y, range){
        let entities = [];

        for(let i = 0; i < Waves.enemie.length; i++){
            let entityX = Waves.enemie[i].x;
            let entityY = Waves.enemie[i].y;
            
            if(entityX >= x - range && entityY >= y - range && entityX <= x + range && entityY <= y + range){
                entities.push(Waves.enemie[i]);
            }
        }

        return entities;
    }

}