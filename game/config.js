class Config {

    static FORWARD = "z";
    static BACKWARD = "s";
    static LEFT = "q";
    static RIGHT = "d";
    static PICKUP = "e";

    //-------------------------\\

    static direction = {
        UP: "Up",
        DOWN: "Down",
        LEFT: "Left",
        RIGHT: "Right"
    };

    static tileType = {
        IRON: "Iron",
        STONE: "Stone",
        WOOD: "Wood",
        TOWER: "Tower",
        WALL: "Wall",
        BASE: "Base"
    };

    static entityType = {
        PLAYER: "Player",
        WARRIOR: "Warrior",
        FASTER: "Faster",
		TANK: "Tank"
    };

    static towerType = {
        FIRETOWER: "FireTower",
        ICETOWER: "IceTower",
        CONFUSIONTOWER: "ConfusionTower"
    }

    //-------------------------\\

    static ENEMIE_RELOAD = 1;

    static WARRIOR_HP = 10;
	static WARRIOR_DM = 2;
	static WARRIOR_SP = 1;

    static FASTERENEMIES_HP = 5;
	static FASTERENEMIES_DM = 1;
	static FASTERENEMIES_SP = 3;

    static TANKENEMEIES_HP = 30;
	static TANKENEMEIES_DM = 2;
	static TANKENEMEIES_SP = 0.5;

    //-------------------------\\

    static BULLET_SP = 15;
    static BULLET_SPECIAL_CHANCE = 5;

    static FIRE_DELAY = 10;
    static ICE_DELAY = 10;
    static CONFUSION_DELAY = 10;

    static TOWER_HP = 100;
    static TOWER_GAIN = 20;

    static TOWER_RANGE = 5;
    static TOWER_RELOAD = 10;

    static BURN_DM = 1;

    //-------------------------\\

    static TOWER_BUILD_COST = [1, 1, 1]; //Wood Stone Iron

    static FIRETOWERLVL_1_DM = 2;
	static FIRETOWERLVL_2_DM = 3;
	static FIRETOWERLVL_3_DM = 4;
    
	static ICEDTOWERLVL_1_DM = 2;
	static ICEDTOWERLVL_2_DM = 3;
	static ICEDTOWERLVL_3_DM = 4;

	static CONFUSIONTOWERLVL_1_DM = 2;
	static CONFUSIONTOWERLVL_2_DM = 3;
	static CONFUSIONTOWERLVL_3_DM = 4;

    //-------------------------\\

    static WALL_BUILD_COST = [1, 1, 1]; //Wood Stone Iron

    static WALLLVL_1_HP = 100;
    static WALLLVL_2_HP = 200;
    static WALLLVL_3_HP = 500;

    //-------------------------\\

    static WAVE_DELAY = 100;
    static BASE_HP = 1000;

    //-------------------------\\

    static CHEATCODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
}