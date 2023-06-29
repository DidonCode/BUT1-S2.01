class Game{

	static context;
	static canvas;

	static lose;
	static win;

	static build;
	static avatar;

	static waves;

	static waves_title;
	static waves_time_title;
	static base_title;
	static iron_title;
	static stone_title;
	static wood_title;

	constructor(context, canvas, perseverance, waves, waves_title, waves_time_title, iron_title, stone_title, wood_title, main_menu, base_title, popup) {
		Game.context = context;
		Game.canvas = canvas;

		this.context = context;
		this.canvas = canvas;

		if(perseverance){
			this.waves = null;
			Game.waves = null;
			this.perseverance = perseverance;
		}else{
			this.waves = waves;
			Game.waves = this.waves;
			this.perseverance = null;
		}

		this.main_menu = main_menu;

		this.waves_title = waves_title;
		this.waves_time_title = waves_time_title;
		this.base_title = base_title;
		this.iron_title = iron_title;
		this.stone_title = stone_title;
		this.wood_title = wood_title;

		Game.waves_title = this.waves_title;
		Game.waves_time_title = this.waves_time_title;
		Game.base_title = this.base_title;
		Game.iron_title = this.iron_title;
		Game.stone_title = this.stone_title;
		Game.wood_title = this.wood_title;

		Game.lose = false;
		Game.win = false;

		Game.build = true;

		this.popup = popup;

		this.handleKeyDown = this.handleKeyDown.bind(this);
        document.addEventListener('keydown', this.handleKeyDown, false);
		this.currentIndex = 0;

		this.world = new World();
		this.world.generate();
	}

	//---------------------------------------\\

	update(){
		this.world.update();
	}

	render(){
		this.main_menu.style.width = (this.canvas.height - 255) + "px";

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.world.render();
	}

	//---------------------------------------\\

	loop(){
		this.update();
		this.render();

		if(Game.lose){
			document.getElementById("result_popup_text").innerHTML = "Vous avez perdu !!!";
			panel(this.popup);
			document.removeEventListener('keydown', this.handleKeyDown, false);
			this.world.player.destroy();
		}
		else if(Game.win){
			document.getElementById("result_popup_text").innerHTML = "Vous avez gagnée !!!";
			panel(this.popup);
			document.removeEventListener('keydown', this.handleKeyDown, false);
			this.world.player.destroy();
		}
		else{
			requestAnimationFrame(() => this.loop());
		}
	}
	
	start(){
		this.loop();
	}

	setAvatar(avatarUrl){
		Game.avatar = avatarUrl;
	}

	//---------------------------------------\\
	
	static allowDrop(event) {
		event.preventDefault();
		World.grid = true;
	}

	static deniedDrop(event){
		event.preventDefault();
		World.grid = false;
	}

	static drag(event) {
		event.dataTransfer.setData("name", event.target.getAttribute('name'));
	}

	static drop(event) {
		event.preventDefault();
		var structureName = event.dataTransfer.getData("name");

		if(!Game.build){ 
			World.grid = false;
			return; 
		}

		var rect = Game.canvas.getBoundingClientRect();
		var tileWidth = rect.width / World.worldSize;
		var tileHeight = rect.height / World.worldSize;

		var x = Math.round((event.clientX - rect.left + tileWidth / 2) / tileWidth) - 1;
		var y = Math.round((event.clientY - rect.top + tileHeight / 2) / tileHeight) - 1;

		var tile = null;
		var worldTile = null;

		if(Player.wood >= Config.TOWER_BUILD_COST[0] && Player.stone >= Config.TOWER_BUILD_COST[1] && Player.iron >= Config.TOWER_BUILD_COST[2] && structureName != "wall"){
			
			worldTile = World.getTile(x, y);

			if(worldTile != null){
				if(worldTile.type == Config.towerType.ICETOWER && structureName == "iceTower" && worldTile.level <= 2){
					tile = new IceTower(x, y, worldTile.level + 1);
				}
				else if(worldTile.type == Config.towerType.FIRETOWER && structureName == "fireTower" && worldTile.level <= 2){
					tile = new FireTower(x, y, worldTile.level + 1);
				}
				else if(worldTile.type == Config.towerType.CONFUSIONTOWER && structureName == "confusionTower" && worldTile.level <= 2){
					tile = new ConfusionTower(x, y, worldTile.level + 1);
				}
			}else{
				if(structureName == "iceTower"){
					tile = new IceTower(x, y, 1);
				}
				else if(structureName == "fireTower"){
					tile = new FireTower(x, y, 1);
				}
				else if(structureName == "confusionTower"){
					tile = new ConfusionTower(x, y, 1);
				}
			}

			if(tile != null) { 
				World.addTile(x, y, tile); 
				Player.wood -= Config.TOWER_BUILD_COST[0];
				Player.stone -= Config.TOWER_BUILD_COST[1];
				Player.iron -= Config.TOWER_BUILD_COST[2];
			}
		}

		tile = null;
		worldTile = null;

		if(Player.wood >= Config.WALL_BUILD_COST[0] && Player.stone >= Config.WALL_BUILD_COST[1] && Player.iron >= Config.WALL_BUILD_COST[2] && structureName == "wall"){
			
			worldTile = World.getTile(x, y);

			if(worldTile != null){

				if(worldTile.type == Config.tileType.WALL && structureName == "wall" && worldTile.level <= 2){
					tile = new Wall(x, y, worldTile.level + 1);
				}
			}else{
				if(structureName == "wall"){
					tile = new Wall(x, y, 1);
				}
			}

			if(tile != null) { 
				World.addTile(x, y, tile); 
				Player.wood -= Config.WALL_BUILD_COST[0];
				Player.stone -= Config.WALL_BUILD_COST[1];
				Player.iron -= Config.WALL_BUILD_COST[2];
			}
		}

		World.grid = false;
	}

	//---------------------------------------\\

	static setWavesValue(value){
		if(Game.waves != null){
			Game.waves_title.innerHTML = "VAGUE: " + value + "/" + Game.waves;
		}else{
			Game.waves_title.innerHTML = "VAGUE: " + value;
		}
	}

	static setWavesTime(value){
		Game.waves_time_title.innerHTML = "TIME: " + value;
	}

	static setBaseHealh(value){
		Game.base_title.innerHTML = "BASE: " + value;
	}

	static setIronValue(value){
		Game.iron_title.innerHTML = value;
	}

	static setStoneValue(value){
		Game.stone_title.innerHTML = value;
	}

	static setWoodValue(value){
		Game.wood_title.innerHTML = value;
	}

	//---------------------------------------\\

	handleKeyDown(event) {
		var key = event.key;

		if (key === Config.CHEATCODE[this.currentIndex]) {
			this.currentIndex++;

			if (this.currentIndex === Config.CHEATCODE.length) {
				const input = prompt("Cheat ? ");
				console.log(input);
				if(input == "win"){
					Game.win = true;
				}

				if(input == "lose"){
					Game.lose = true;
				}

				this.currentIndex = 0;
			}
		} else {
			this.currentIndex = 0;
		}
	}
}