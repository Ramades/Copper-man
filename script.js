let nombre;
let puntaje;
let personaje = 0;

// Funciones que se encargan de guardar en el local storage 

function guardarJugador(nom, punt) {
    let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];

    // Buscar si el jugador ya existe
    let jugadorExistente = jugadores.find(j => j.nom === nom);

    if (jugadorExistente) {
        // Si el puntaje es mayor, actualizamos
        if (punt > jugadorExistente.punt) {
            jugadorExistente.punt = punt;
        }
    } else {
        // Si no existe, lo agregamos
        jugadores.push({ nom, punt, date: new Date().toLocaleDateString() });
    }

    // Guardar en localStorage
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
}

function obtenerJugadores() {
    return JSON.parse(localStorage.getItem("jugadores")) || [];
}

// Funciones que controlan el menu inicial del juego
class Menu extends Phaser.Scene {
    constructor() {
        super("menu-scene")
    }
    preload() {

        this.load.image('menuBackground', 'img/MenuPrincipal/FondoHero2.jpg'); // Fondo del menú
        this.load.image('Logo', 'img/MenuPrincipal/LogoJuego.png');

        this.load.image('playButton', 'assets/Botones/PlayBtn.png'); // Botón jugar
        this.load.image('controlsButton', 'assets/Botones/ControlsBtn.png'); // Botón jugar
        this.load.image('TableButton', 'assets/Botones/ResumeBtn.png'); // Botón jugar
        this.load.image('creditsButton', 'assets/Botones/SettinBtn.png'); // Botón jugar

        this.load.image('playButtonHover', 'assets/Botones/Playcol_Button.png'); // Botón jugar
        this.load.image('controlsButtonHover', 'assets/Botones/Controlscol_Button.png'); // Botón jugar
        this.load.image('TableButtonHover', 'assets/Botones/ResumeColBtn.png'); // Botón jugar
        this.load.image('creditsButtonHover', 'assets/Botones/Settingscol_Button.png'); // Botón jugar

        this.load.audio('backgroundMusic', 'Sounds/MusicaPrincipal.mp3'); // Carga el archivo de audio
        this.load.audio('hoverSound', 'Sounds/ClickSonido.mp3');
    }
    create() {

        let background = this.add.image(400, 300, 'menuBackground');
        background.setScale(
            this.sys.game.config.width / background.width,
            this.sys.game.config.height / background.height
        );


        // let music = this.sound.add('backgroundMusic');
        // music.play({ loop: true });

        let logo = this.add.image(400, -100, 'Logo');
        logo.setScale(0.7, 0.5);

        // Tween para mover el logo desde arriba hasta su posición final
        this.tweens.add({
            targets: logo,
            y: 150,
            ease: 'easeOut',
            duration: 1500,
            delay: 200
        });


        // Botón Play
        let playButton = this.add.image(250, 900, 'playButton')
            .setDisplaySize(250, 60)
            .setInteractive();

        playButton.on('pointerover', () => {
            playButton.setTexture('playButtonHover'); // Cambia la imagen del botón
            this.input.setDefaultCursor('pointer');     // Cambia el cursor
            this.sound.play('hoverSound');                // Reproduce el sonido
        });

        playButton.on('pointerout', () => {
            playButton.setTexture('playButton');          // Restaura la imagen original
            this.input.setDefaultCursor('default');       // Restaura el cursor
        });

        // Botón Controls
        let controlsButton = this.add.image(600, 900, 'controlsButton')
            .setDisplaySize(250, 60)
            .setInteractive();

        controlsButton.on('pointerover', () => {
            controlsButton.setTexture('controlsButtonHover'); // Cambia la imagen del botón
            this.input.setDefaultCursor('pointer');             // Cambia el cursor
            this.sound.play('hoverSound');                      // Reproduce el sonido
        });

        controlsButton.on('pointerout', () => {
            controlsButton.setTexture('controlsButton');        // Restaura la imagen original
            this.input.setDefaultCursor('default');             // Restaura el cursor
        });

        // Botón Credits
        let creditsButton = this.add.image(600, 900, 'creditsButton')
            .setDisplaySize(250, 60)
            .setInteractive();

        creditsButton.on('pointerover', () => {
            creditsButton.setTexture('creditsButtonHover'); // Cambia la imagen del botón
            this.input.setDefaultCursor('pointer');           // Cambia el cursor
            this.sound.play('hoverSound');                    // Reproduce el sonido
        });

        creditsButton.on('pointerout', () => {
            creditsButton.setTexture('creditsButton');        // Restaura la imagen original
            this.input.setDefaultCursor('default');           // Restaura el cursor
        });

        // Botón Table
        let TableButton = this.add.image(250, 900, 'TableButton')
            .setDisplaySize(250, 60)
            .setInteractive();

        TableButton.on('pointerover', () => {
            TableButton.setTexture('TableButtonHover'); // Cambia la imagen del botón
            this.input.setDefaultCursor('pointer');           // Cambia el cursor
            this.sound.play('hoverSound');                    // Reproduce el sonido
        });

        TableButton.on('pointerout', () => {
            TableButton.setTexture('TableButton');        // Restaura la imagen original
            this.input.setDefaultCursor('default');           // Restaura el cursor
        });

        // Tween para que el botón de jugar se mueva a su posición final
        this.tweens.add({
            targets: playButton,
            y: 350,
            ease: 'easeOut',
            duration: 1500,
            delay: 500
        });
        this.tweens.add({
            targets: TableButton,
            y: 450,
            ease: 'easeOut',
            duration: 1500,
            delay: 700
        });

        this.tweens.add({
            targets: controlsButton,
            y: 350,
            ease: 'easeOut',
            duration: 1500,
            delay: 600
        });
        this.tweens.add({
            targets: creditsButton,
            y: 450,
            ease: 'easeOut',
            duration: 1500,
            delay: 700
        });


        // Asignar interactividad a los botones
        playButton.on('pointerdown', () => this.scene.start('PlayerSetupScene'));
        controlsButton.on('pointerdown', () => this.scene.start('ControlsScene'));
        creditsButton.on('pointerdown', () => this.scene.start('CreditsScene'));
        TableButton.on('pointerdown', () => {
            mostrarMejoresPuntuaciones();
        });
        



    }

    update() {

    }
}

class ControlsScene extends Phaser.Scene {
    constructor() {
        super("ControlsScene");
    }

    preload() {
        // Carga la imagen de fondo y el botón para volver al menú, junto con su versión hover
        this.load.image('controlsImage', 'img/MenuControles/Controles.png'); // Imagen de fondo
        this.load.image('backButton', 'assets/Botones/BackBtn.png');
        this.load.image('backButtonHover', 'assets/Botones/BackColBtn.png');
    }

    create() {
        // Muestra la imagen de fondo
        this.add.image(400, 300, 'controlsImage').setScale(1);

        // Crea el botón para volver al menú con efecto hover
        let backButton = this.add.image(400, 500, 'backButton')
            .setScale(0.2)
            .setInteractive()
            .on('pointerover', function () {
                this.setTexture('backButtonHover');
            })
            .on('pointerout', function () {
                this.setTexture('backButton');
            })
            .on('pointerdown', () => {
                this.scene.start("menu-scene");
            });
    }
}


class CreditsScene extends Phaser.Scene {
    constructor() {
        super("CreditsScene");
    }

    preload() {
        // Imágenes generales
        this.load.image('background', 'img/Nivel1/Fondo1.jpg');
        this.load.image('backButton', 'assets/Botones/BackBtn.png');
        this.load.image('backButtonHover', 'assets/Botones/BackColBtn.png');


        this.load.image('image1', 'img/MenuCreditos/Abraham.jpg');
        this.load.image('image2', 'img/MenuCreditos/David.jpg');
        this.load.image('image3', 'img/MenuCreditos/Luis.jpg');
        this.load.image('image4', 'assets/WarElements/element4.png');
    }

    create() {

        let bg = this.add.image(400, 300, 'background')
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height)
            .setDepth(0);

        // Definir las imágenes y los textos 
        let creditImages = ['image1', 'image2', 'image3', 'image4'];
        let creditTexts = [
            "Comandante: Abraham Barrientos Esquivel ",
            "General: David Menchaca Lora 'El Implacable'",
            "Sargento: Luis Humberto Ramírez Gutiérrez 'El Rudo'",
            "Soldado: Angel Ramses Martinez Herrera  'El Valiente' "
        ];


        const startY = 100;       // Posición vertical inicial
        const spacingY = 120;     // Separación vertical entre cada par
        const imageX = 50;        // Posición horizontal de la imagen
        const textX = 150;        // Posición horizontal del texto (al lado de la imagen)


        for (let i = 0; i < creditImages.length; i++) {
            // Agregamos la imagen (usamos setOrigin(0, 0.5) para alinear verticalmente al centro)
            this.add.image(imageX, startY + i * spacingY, creditImages[i])
                .setScale(0.1)
                .setOrigin(0, 0.5)
                .setDepth(1);

            // Agregar texto a la derecha de la imagen
            this.add.text(textX, startY + i * spacingY, creditTexts[i], {
                font: "20px 'Courier New'",
                fill: "#fff",
                stroke: "#fff",
                strokeThickness: 2
            })
                .setOrigin(0, 0.5)
                .setDepth(1);
        }

        let backButton = this.add.image(this.cameras.main.centerX, this.cameras.main.height - 50, 'backButton')
            .setScale(0.15)
            .setInteractive()
            .setScale(.3)
            .on('pointerover', function () {
                this.setTexture('backButtonHover');
            })
            .on('pointerout', function () {
                this.setTexture('backButton');
            })
            .on('pointerdown', () => {
                this.scene.start("menu-scene");
            })
            .setDepth(2);

    }
}


// Funcion para escoger personaje y nombre del jugador
class PlayerSetupScene extends Phaser.Scene {
    constructor() {
        super("PlayerSetupScene")
    }

    preload() {
        this.load.image('player1', 'img/MenuNombre/SoldadoDerecha1.png');
        this.load.image('player2', 'img/MenuNombre/SoldadoIzquierda1.png');

        this.load.image('playButton', 'assets/Botones/PlayBtn.png'); // Botón jugar
        this.load.image('playButtonHover', 'assets/Botones/Playcol_Button.png'); // Botón jugar

    }

    create() {

        // INPUT PARA AGREGAR NOMBRE 
        // Crear el input
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = ". . .";
        input.style.position = "absolute";
        input.style.top = "20%";
        input.style.left = "38%";
        input.style.transform = "translate(-50%, -50%)";
        input.style.padding = "0px 60px";
        input.style.fontSize = "3.5rem";
        input.style.fontFamily = "Guerra";
        input.style.fontWeight = "Bold";

        input.style.backgroundColor = "transparent";
        input.style.border = "none";
        input.style.outline = "none";

        input.style.backgroundImage = "url('assets/SpritesUI/PlacaNombre2.png')";
        input.style.backgroundSize = "cover";
        input.style.backgroundRepeat = "no-repeat";
        input.style.backgroundPosition = "center";


        input.style.width = "300px";
        input.style.height = "250px";

        // Agregar input dentro del div que contiene el canvas
        document.getElementById("canvas").appendChild(input);

        // Crear botón de confirmación
        let button = document.createElement("button");
        button.innerText = "Confirmar";
        button.style.position = "absolute";
        button.style.top = "calc(35% + 60px)";
        button.style.left = "40%";
        button.style.transform = "translateX(-50%)";
        button.style.padding = "10px";


        //FUNCION PARA SELECCIONAR CUALQUIERA DE LOS 2 PERSONAJES

        let selectedCharacter = null;

        // Personaje 1
        let player1 = this.add.image(630, 360, 'player1')
            .setInteractive()
            .on('pointerover', () => {
                // Aumenta la escala y añade un tint sutil para dar efecto de brillo
                this.tweens.add({
                    targets: player1,
                    scale: 1.5,
                    ease: 'Power1',
                    duration: 200
                });
                player1.setTint(0xaaaaaa);
            })
            .on('pointerout', () => {
                // Vuelve a la escala original y limpia el tint
                this.tweens.add({
                    targets: player1,
                    scale: 1,
                    ease: 'Power1',
                    duration: 200
                });
                player1.clearTint();
            })
            .on('pointerdown', () => {
                selectedCharacter = 'player1';
                player1.setTint(0x00ff00); // Resalta el seleccionado
                player2.clearTint();
            });

        // Personaje 2
        let player2 = this.add.image(120, 420, 'player2')
            .setInteractive()
            .on('pointerover', () => {
                // Aumenta la escala y añade un efecto de brillo
                this.tweens.add({
                    targets: player2,
                    scale: 1.1,
                    ease: 'Power1',
                    duration: 200
                });
                player2.setTint(0xaaaaaa);
            })
            .on('pointerout', () => {
                // Vuelve a la escala original y limpia el tint
                this.tweens.add({
                    targets: player2,
                    scale: 1,
                    ease: 'Power1',
                    duration: 200
                });
                player2.clearTint();
            })
            .on('pointerdown', () => {
                selectedCharacter = 'player2';
                player2.setTint(0x00ff00);
                player1.clearTint();
            });


        document.getElementById("canvas").appendChild(button);

        button.onclick = () => {
            let alias = input.value.trim();
            const regex = /^[A-Za-z0-9_]{4,8}$/;

            if (!regex.test(alias)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Alias inválido',
                    text: 'El alias debe ser una sola palabra, contener solo letras, dígitos y guión bajo, y tener entre 4 y 8 caracteres.'
                });
                return;
            }

            /*       if (localStorage.getItem(alias)) {
                      Swal.fire({
                          icon: 'warning',
                          title: 'Alias existente',
                          text: 'Este alias ya ha sido registrado. Por favor, elige otro.'
                      });
                      return;
                  }
       */
            guardarJugador(alias, 0);
            mostrarMejoresPuntuaciones();
            console.log("Jugador:", alias);

            localStorage.setItem(alias, JSON.stringify({ score: 0 }));
            localStorage.setItem("playerName", alias);
            localStorage.setItem("selectedCharacter", selectedCharacter);

            input.remove();
            button.remove();

            this.scene.start('scene-game');
        };
    }
}

//Funciones del gameplay
class GameScene extends Phaser.Scene {

    constructor() {
        super("scene-game");
        this.player = null;
        this.stars = null;
        this.bombs = null;
        this.platforms = null;
        this.cursors = null;
        this.score = 0;
        this.GameOver = false;
        this.scoreText = null;
        this.spaceBar = null;
        this.bullets = null;
        this.lives = 3;
    }

    preload() {
        // Elementos UI
        this.load.image('gameOver', 'img/MenuUI/gameOver.png');
        this.load.image('bomb1', 'assets/Personajes/Enemigo.png', { frameWidth: 32, frameHeight: 32 });

        this.load.image('sky', 'img/Nivel1/Fondo.jpg');
        this.load.image('ground', 'assets/ElementosNivel/platform.png');
        this.load.image('star', 'assets/Consumibles/star.png');
        this.load.image('specialItem', 'assets/Consumibles/starPlus.png');
        this.load.image('bomb', 'assets/Personajes/bomb.png');
        this.load.image('Sangre', 'img/GameOver/sangre.png');

        this.load.spritesheet('dude', 'assets/Personajes/German_Soldier1.png', { frameWidth: 32, frameHeight: 30 });
        this.load.spritesheet('dude1', 'assets/Personajes/dude.png', { frameWidth: 32, frameHeight: 30 });

        this.load.image('Home', 'assets/Botones/HomeBtn.png');
        this.load.image('Reiniciar', 'assets/Botones/ReturnBtn.png');

        this.load.audio('deathSound', 'Sounds/Damage.mp3');
        this.load.audio('GameOverSound', 'Sounds/MisionFailed.mp3');
    }

    create() {
        //cambiar entre escenas provicional
        this.input.keyboard.on("keydown", (event) => {
            if (event.key >= "0" && event.key <= "9") {
                console.log("Presionaste el número: " + event.key);
                this.handleNumberPress(event.key);
            }
        });

        //Funcion para adaptar la imagen en el canvas
        let levelWidth = this.sys.game.config.width * 4;
        let canvasWidth = this.sys.game.config.width;
        let canvasHeight = this.sys.game.config.height;

        // Obtener la imagen original del recurso 'sky'
        let skyImage = this.textures.get('sky').getSourceImage();

        // Calcular los factores de escala para que la imagen se adapte al canvas
        let scaleX = canvasWidth / skyImage.width;
        let scaleY = canvasHeight / skyImage.height;

        // Crear el tileSprite y ajustar la escala del tile
        this.sky = this.add.tileSprite(0, 0, canvasWidth, canvasHeight, 'sky')
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(-3);

        // Ajusta la escala del tile para que la imagen se muestre a tamaño completo
        this.sky.tileScaleX = scaleX;
        this.sky.tileScaleY = scaleY;


        let selectedCharacter = localStorage.getItem("selectedCharacter") || 'player1';
        let characterMap = {
            player1: 'dude',
            player2: 'dude1'
        };
        let characterKey = characterMap[selectedCharacter] || 'dude';

        // Jugador
        this.player = this.physics.add.sprite(100, 450, characterKey);
        this.player.setBounce(0.01);
        this.player.setCollideWorldBounds(true);

        // Plataformas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 610, 'ground').setScale(2).refreshBody().setAlpha(0);
        this.platforms.create(800, 610, 'ground').setScale(2).refreshBody().setAlpha(0);
        this.platforms.create(1200, 610, 'ground').setScale(2).refreshBody().setAlpha(0);
        this.platforms.create(1600, 610, 'ground').setScale(2).refreshBody().setAlpha(0);
        this.platforms.create(2000, 610, 'ground').setScale(2).refreshBody().setAlpha(0);
        this.platforms.create(2400, 610, 'ground').setScale(2).refreshBody().setAlpha(0);
        this.platforms.create(2800, 610, 'ground').setScale(2).refreshBody().setAlpha(0);
        this.platforms.create(3200, 610, 'ground').setScale(2).refreshBody().setAlpha(0);
        this.platforms.create(3600, 610, 'ground').setScale(2).refreshBody().setAlpha(0);
        this.platforms.create(4000, 610, 'ground').setScale(2).refreshBody().setAlpha(0);
        this.platforms.create(800, 450, 'ground');

        this.specialItemGroup = this.physics.add.group();

        // Animaciones del jugador
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(characterKey, { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: characterKey, frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(characterKey, { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        // Controles
        this.cursors = this.input.keyboard.createCursorKeys();
        //barra espaciadora
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // Estrellas
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // Bombas
        this.bombs = this.physics.add.group();

        //balas
        this.bullets = this.physics.add.group();
        this.canShoot = true;

        this.shootTimer = this.time.addEvent({
            delay: 300, // Tiempo entre disparos (en milisegundos)
            callback: () => { this.canShoot = true; },
            callbackScope: this,
            loop: true
        });

        // Puntuación
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        // Contenedor en el HTML donde se mostrarán las imágenes de las vidas
        this.livesContainer = document.getElementById("lives-container");

        // Cargar las imágenes de las vidas
        this.updateLivesUI();

        // Colisiones
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.specialItemGroup, this.platforms);

        // Verificar si el jugador recoge una estrella
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);


        // Hacer que la camara siga al jugador
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, levelWidth, this.sys.game.config.height);

        // Asegurar que la cámara cubra todo el nivel
        this.cameras.main.setBounds(0, 0, levelWidth, this.sys.game.config.height);
        this.physics.add.overlap(this.bullets, this.bombs, this.hitEnemy, null, this);

        // Asegurar que el jugador pueda moverse dentro de los límites del mundo
        this.physics.world.setBounds(0, 0, levelWidth, this.sys.game.config.height);
        this.lastSpawnX = this.player.x; // Inicializar la última posición de spawn
    }

    update() {
        if (this.gameOver) return;
        let distanceThreshold = 500; // Cada cuántos píxeles se generan objetos
        let nextSpawnX = this.lastSpawnX + distanceThreshold;

        if (this.player.x > nextSpawnX) {
            this.lastSpawnX = this.player.x;

            // Cantidad de objetos a generar
            let numStars = 6;
            let numBombs = 2;

            // Generar varias estrellas
            for (let i = 0; i < numStars; i++) {
                let starX = this.player.x + Phaser.Math.Between(100, 900);
                let starY = Phaser.Math.Between(50, 300);
                let newStar = this.stars.create(starX, starY, 'star');
                newStar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
                console.log("Nueva estrella");
            }

            // Generar varios enemigos (bombas)
            for (let i = 0; i < numBombs; i++) {
                let bombX = this.player.x + Phaser.Math.Between(200, 400);
                let bomb = this.bombs.create(bombX, 16, 'bomb1');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                console.log("Nueva bomba");
            }
        }

        if (this.score >= 50 && !this.GameOver) {
            // this.showCongratulations();
            console.log("Felicidades");
            // return;
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            // Usamos la animación 'right' pero volteamos el sprite
            this.player.anims.play('right', true);
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            // Reproducimos la animación normal sin volteo
            this.player.anims.play('right', true);
            this.player.setFlipX(false);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
        if (this.spaceBar.isDown && this.canShoot == true) {
            this.Shoot();
            this.canShoot = false;
        }

        // Logica para crear el objeto especial
        if (!this.hasSpawnedSpecialItem && this.player.x >= 500) {
            this.spawnSpecialItem();
            this.hasSpawnedSpecialItem = true;
        }

        this.specialItemGroup.children.iterate(specialItem => {
            if (specialItem.active && specialItem.countdownText) {
                specialItem.countdownText.x = specialItem.x;
                specialItem.countdownText.y = specialItem.y - 50;
            }
        });
    }

    spawnSpecialItem = function () {
        // Crea el ítem un poco adelante del jugador para que sea visible
        let x = this.player.x + Phaser.Math.Between(200, 400);
        let y = Phaser.Math.Between(50, 300);

        // Crea el sprite y lo añade al grupo
        let specialItem = this.specialItemGroup.create(x, y, 'specialItem');

        // Ajusta físicas
        specialItem.setBounce(0.5);
        specialItem.setCollideWorldBounds(true);
        // Haz que colisione con las plataformas
        this.physics.add.collider(specialItem, this.platforms);

        // Detectar colisión/solapamiento con el jugador
        this.physics.add.overlap(this.player, specialItem, this.collectSpecialItem, null, this);

        // --- CONTADOR SOBRE EL ÍTEM ---
        let timeLeft = 5; // (5 segundos)
        let countdownText = this.add.text(
            specialItem.x,
            specialItem.y - 50,
            timeLeft,
            { fontSize: '20px', fill: '#fff' }
        ).setOrigin(0.5);

        // Guarda la referencia en el propio ítem para manipularlo luego
        specialItem.countdownText = countdownText;
        specialItem.timeLeft = timeLeft;

        // Cada segundo, disminuimos el contador
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                // Si el ítem ya no existe (recogido o destruido), no hacemos nada
                if (!specialItem.active) return;

                specialItem.timeLeft--;
                specialItem.countdownText.setText(specialItem.timeLeft);

                if (specialItem.timeLeft <= 0) {
                    // Se acabó el tiempo: destruir ítem y su texto
                    specialItem.destroy();
                    specialItem.countdownText.destroy();
                    console.log("El objeto especial desapareció por tiempo.");
                }
            },
            repeat: 4 // Repetimos 4 veces. (0 -> 5s totales)
        });
    };

    collectSpecialItem = function (player, specialItem) {
        // Desactivarlo inmediatamente (ya no colisiona)
        specialItem.disableBody(true, true);

        // Destruir el texto si existe
        if (specialItem.countdownText) {
            specialItem.countdownText.destroy();
        }

        // Sumar 100 puntos al marcador
        this.score += 100;
        this.scoreText.setText(`Score: ${this.score}`);

        // (Opcional) Guardar en localStorage
        let playerName = localStorage.getItem('playerName') || "Jugador";
        guardarJugador(playerName, this.score);

        console.log("¡Recogiste el objeto especial y ganaste 100 puntos!");
    };

    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;

        let playerName = localStorage.getItem('playerName') || "Jugador";
        guardarJugador(playerName, this.score);

        this.scoreText.setText('Score: ' + this.score);

        mostrarMejoresPuntuaciones();

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(child => {
                child.enableBody(true, child.x, 0, true, true);
            });

            for (let i = 0; i < 3; i++) {
                let x = (this.player.x < 400)
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400);
                let bomb = this.bombs.create(x, 16, 'bomb1');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                bomb.allowGravity = false;
            }
        }
    }

    hitBomb(player, bomb) {
        this.lives -= 1;
        this.updateLivesUI()

        if (!this.bombSound || !this.bombSound.isPlaying) {
            this.bombSound = this.sound.add('deathSound');
            this.bombSound.play();
        }

        if (this.lives <= 0 && !this.GameOver) {
            this.GameOver = true;
            this.isGameOver();

            console.log("Game Over");
        }
    }

    updateLivesUI() {
        // Limpiar el contenedor antes de volver a renderizar las vidas
        this.livesContainer.innerHTML = "";


        for (let i = 0; i < this.lives; i++) {
            let img = document.createElement("img");
            img.src = "assets/SpritesUI/Vidas.png"; // Ruta correcta de la imagen de vida
            img.classList.add("life-icon"); // Clase CSS para darle estilo
            this.livesContainer.appendChild(img);
        }
    }

    Shoot() {
        let bullet = this.bullets.create(this.player.x, this.player.y, 'bomb');
        bullet.setScale(0.5);
        bullet.body.allowGravity = false;

        // Determinar la dirección del disparo usando flipX
        let direction = this.player.flipX ? -1 : 1;
        bullet.setVelocityX(1000 * direction);
    }

    isGameOver() {
        this.physics.pause();
        this.player.setTint(0xff0000);

        // Detener el sonido de impacto si está reproduciéndose
        if (this.bombSound && this.bombSound.isPlaying) {
            this.bombSound.stop();
        }

        if (!this.deathSoundPlayed) {
            this.sound.play('GameOverSound');
            this.deathSoundPlayed = true;
        }

        const cam = this.cameras.main;
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        let bloodBackground = this.add.image(centerX, centerY, 'Sangre')
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(9);
        bloodBackground.setDisplaySize(cam.width, cam.height);

        let gameOverImage = this.add.image(centerX, centerY, 'gameOver')
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(10);

        // Definir escala para los botones (por ejemplo, 0.5 para hacerlos más pequeños)
        const buttonScale = 0.5;
        // Offset vertical para situarlos debajo de la imagen Game Over
        const offsetY = 150;
        // Offset horizontal para colocarlos uno a cada lado
        const offsetX = 80;

        // Botón para reiniciar el nivel
        let restartButton = this.add.image(centerX - offsetX, centerY + offsetY, 'Reiniciar')
            .setInteractive()
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(10)
            .setScale(buttonScale);

        restartButton.on('pointerdown', () => {
            this.scene.restart();
            this.lives = 3;
            this.deathSoundPlayed = false;
        });

        let menuButton = this.add.image(centerX + offsetX, centerY + offsetY, 'Home')
            .setInteractive()
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(10)
            .setScale(buttonScale);
        menuButton.on('pointerdown', () => {
            this.scene.start('menu-scene');
        });
    }

    hitEnemy = function (bullet, bomb) {
        console.log("Impacto");

        bullet.destroy(); // Eliminar la bala

        if (bomb.health === undefined) {
            bomb.health = 5; // Asignar vida
        }

        bomb.health -= 1;

        //Cambiar color al recibir daño 
        bomb.setTint(0xff0000);
        setTimeout(() => {
            bomb.clearTint(); // Volver al color normal después de 200ms
        }, 200);

        if (bomb.health <= 0) {
            bomb.destroy();
            this.score += 20;
            this.scoreText.setText(`Score: ${this.score}`);
        }
    };

    handleNumberPress(number) {
        switch (number) {
            case "1":
                this.scene.start("scene-game")
                break;
            case "2":
                this.scene.start("scene-game2")
                break;
            case "3":
                this.scene.start("scene-boss")
                break;
            default:
                console.log("Número sin acción asignada.");
                break;
        }
    }
}

class GameScene2 extends Phaser.Scene {
    constructor() {
        super("scene-game2");
        this.player = null;
        this.stars = null;
        this.bombs = null;
        this.platforms = null;
        this.cursors = null;
        this.score = 0;
        this.gameOver = false;
        this.scoreText = null;
        this.spaceBar = null;
        this.bullets = null;
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        //cambiar entre escenas provicional
        this.input.keyboard.on("keydown", (event) => {
            if (event.key >= "0" && event.key <= "9") {
                console.log("Presionaste el número: " + event.key);
                this.handleNumberPress(event.key);
            }
        });
        // Fondo
        this.add.image(400, 300, 'sky');

        // Plataformas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        // Jugador
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.01);
        this.player.setCollideWorldBounds(true);

        // Animaciones del jugador
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Controles
        this.cursors = this.input.keyboard.createCursorKeys();
        //barra espaciadora
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // Estrellas
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // Bombas
        this.bombs = this.physics.add.group();

        //balas
        this.bullets = this.physics.add.group();
        this.canShoot = true;
        this.shootTimer = this.time.addEvent({
            delay: 300, // Tiempo entre disparos (en milisegundos)
            callback: () => { this.canShoot = true; },
            callbackScope: this,
            loop: true
        });

        // Puntuación
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        // Colisiones
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        // Verificar si el jugador recoge una estrella
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    update() {
        if (this.gameOver) return;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
        if (this.spaceBar.isDown && this.canShoot == true) {
            this.Shoot();
            this.canShoot = false;
        }




        this.bullets.children.iterate(bullet => {
            if (bullet.x > 800 || bullet.x < 0) {
                bullet.destroy();
            }
        });

    }

    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(child => {
                child.enableBody(true, child.x, 0, true, true);
            });

            let x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            let bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
    }

    hitBomb(player, bomb) {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.gameOver = true;
    }

    Shoot() {
        let bullet = this.bullets.create(this.player.x, this.player.y, 'bomb');
        bullet.setScale(0.5);
        bullet.body.allowGravity = false;

        // Determinar la dirección del disparo
        let direction = this.player.anims.currentAnim.key === 'left' ? -1 : 1;
        bullet.setVelocityX(400 * direction);
    }

    handleNumberPress(number) {
        switch (number) {
            case "1":
                this.scene.start("scene-game")
                break;
            case "2":
                this.scene.start("scene-game2")
                break;
            case "3":
                    this.scene.start("scene-boss")
                    break;
            default:
                console.log("Número sin acción asignada.");
                break;
        }
    }
}
class Boss extends Phaser.Scene {
    constructor() {
        super("scene-boss");
        this.bossVul=true;
        this.player = null;
        this.stars = null;
        this.bombs = null;
        this.platforms = null;
        this.cursors = null;
        this.score = 0;
        this.gameOver = false;
        this.scoreText = null;
        this.spaceBar = null;
        this.bullets = null;
        this.bossSpeed = 100; // Velocidad del jefe
        this.bossDirection = -1; 
        this.bossFase=1;
        this.etapa2finalizada = false;
        this.lastArrowPressed=null;
        this.delay = 2000;
        this.lives=3;
        this.isInvulnerable = false;
    }
    preload() {
        this.load.image('gameOver', 'img/MenuUI/gameOver.png');
        this.load.image('bomb1', 'assets/Personajes/Enemigo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('rayo', 'assets/Personajes/rayo.png');
        this.load.image('sky', 'img/Nivel1/Fondo.jpg');
        this.load.image('ground', 'assets/ElementosNivel/platform.png');
        this.load.image('star', 'assets/Consumibles/star.png');
        this.load.image('specialItem', 'assets/Consumibles/starPlus.png');
        this.load.image('bomb', 'assets/Personajes/bomb.png');
        this.load.image('Sangre', 'img/GameOver/sangre.png');
        this.load.image('ball', 'assets/Personajes/electroball1.png');
        this.load.spritesheet('dude', 'assets/Personajes/German_Soldier1.png', { frameWidth: 32, frameHeight: 30 });
        this.load.spritesheet('dude1', 'assets/Personajes/dude.png', { frameWidth: 32, frameHeight: 30 });

        this.load.image('Home', 'assets/Botones/HomeBtn.png');
        this.load.image('Reiniciar', 'assets/Botones/ReturnBtn.png');

        this.load.audio('deathSound', 'Sounds/Damage.mp3');
        this.load.image("boss", 'assets/Personajes/German_Soldier1.png', { frameWidth: 32, frameHeight: 30 });
        
    }
    create() {
        //cambiar entre escenas provicional
        this.input.keyboard.on("keydown", (event) => {
            if (event.key >= "0" && event.key <= "9") {
                console.log("Presionaste el número: " + event.key);
                this.handleNumberPress(event.key);
            }
        });
        // Fondo
        this.add.image(400, 300, 'sky');

        // Plataformas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        // Jugador
        let selectedCharacter = localStorage.getItem("selectedCharacter") || 'player1';
        let characterMap = {
            player1: 'dude',
            player2: 'dude1'
        };
        let characterKey = characterMap[selectedCharacter] || 'dude';

        // Jugador
        this.player = this.physics.add.sprite(100, 450, characterKey);
        this.player.setBounce(0.01);
        this.player.setCollideWorldBounds(true);

        // Animaciones del jugador
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        // Controles
        this.cursors = this.input.keyboard.createCursorKeys();
        //barra espaciadora
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // electrividad
        this.rayos = this.physics.add.group();
        
        
        
        // Bombas
        this.bombs = this.physics.add.group();

        //balas
        this.bullets = this.physics.add.group();
        this.canShoot = true;
        this.shootTimer = this.time.addEvent({
            delay: 300, // Tiempo entre disparos (en milisegundos)
            callback: () => { this.canShoot = true; },
            callbackScope: this,
            loop: true
        });

        // Puntuación
        
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        this.gameOver = false;
        this.lives = 3;
        this.deathSoundPlayed = false;
        this.livesContainer = document.getElementById("lives-container");
        this.updateLivesUI();
        // Colisiones
        this.physics.add.collider(this.player, this.platforms);
        
        this.physics.add.collider(this.bombs, this.platforms);

        // Verificar si el jugador recoge una estrella
        
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        
        // Agregar el jefe en la pantalla
        this.boss = this.physics.add.sprite(700, 500, "dude").setScale(4);
        this.boss.setImmovable(true); // Evita que el jefe sea empujado
        this.boss.setCollideWorldBounds(true);
        this.bossHealth = 100; // Vida máxima del jefe
        this.bossMaxHealth = 100;
    
        this.healthBar = this.add.graphics();
        this.updateHealthBar();    
    
        this.boss.body.allowGravity = false;
        this.physics.add.overlap(this.bullets, this.boss, this.takeDamage, null, this);
        this.physics.add.overlap(this.bombs, this.player, this.hitBomb, null, this);
        this.physics.add.overlap(this.boss, this.player, this.hitBoss, null, this);
        this.physics.add.overlap(this.rayos, this.player, this.hitBoss, null, this);
        this.physics.add.collider(this.player, this.boss);
        this.bossShootTimer = this.time.addEvent({
            delay: this.delay,
            callback: () => {
                if (this.bossFase === 1) {
                    this.BossShoot();
                } else {
                    // Verifica si el tiempo de espera ha pasado
                    if (!this.rayosCooldown) {
                        this.CrearRayos();
                        this.rayosCooldown = true; // Activar el cooldown
        
                        // Establecer un temporizador para permitir la siguiente llamada después de un retraso
                        this.time.delayedCall(3000, () => {
                            this.rayosCooldown = false; // Restablecer el cooldown después de 2 segundos
                        });
                    }
                }
            },
            callbackScope: this,
            loop: true
        });
        
    }
    update() {
        if (this.gameOver) return;
        if (this.boss && this.boss.body) {
            this.boss.setVelocityX(this.bossSpeed * this.bossDirection);
    
            // Cambiar dirección si toca los bordes del mundo
            if (this.boss.body.blocked.left) {
                this.bossDirection = 1; // Moverse a la derecha
            } else if (this.boss.body.blocked.right) {
                this.bossDirection = -1; // Moverse a la izquierda
            }
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            // Usamos la animación 'right' pero volteamos el sprite
            this.player.anims.play('right', true);
            this.player.setFlipX(true);
            this.lastArrowPressed='left';
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            // Reproducimos la animación normal sin volteo
            this.player.anims.play('right', true);
            this.player.setFlipX(false);
            this.lastArrowPressed='right';
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.bossDirection == -1) {
            
            this.boss.anims.play('right', true);
            this.boss.setFlipX(true);
            
        } else if (this.bossDirection == 1) {

            this.boss.anims.play('right', true);
            this.boss.setFlipX(false);
            
        } 
        if(this.bossSpeed==0) {
            this.boss.anims.play('turn');
            
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
        if (this.spaceBar.isDown && this.canShoot == true) {
            this.Shoot();
            this.canShoot = false;
        }
        this.bullets.children.iterate((bullet) => {
            if (bullet && bullet.x !== undefined) {
                if (bullet.x < 0 || bullet.x > this.sys.game.config.width) {
                    bullet.destroy();
                }
            }
        });
        
    }
    Shoot() {
        let bullet = this.bullets.create(this.player.x, this.player.y, 'bomb');
        bullet.setScale(0.5);
        bullet.body.allowGravity = false;

        // Determinar la dirección del disparo
        let direction = this.lastArrowPressed === 'left' ? -1 : 1;
        bullet.setVelocityX(400 * direction);
    }
    handleNumberPress(number) {
        switch (number) {
            case "1":
                this.scene.start("scene-game")
                break;
            case "2":
                this.scene.start("scene-game2")
                break;
            default:
                console.log("Número sin acción asignada.");
                break;
        }
    }
    updateHealthBar() {
        this.healthBar.clear(); // Limpiar la barra anterior

        // Dibujar el fondo de la barra de vida (gris)
        this.healthBar.fillStyle(0x555555);
        this.healthBar.fillRect(150, 50, 500, 20);

        // Dibujar la barra de vida en verde (según la vida actual)
        let healthPercentage = this.bossHealth / this.bossMaxHealth;
        this.healthBar.fillStyle(0x770000);
        this.healthBar.fillRect(150, 50, 500 * healthPercentage, 20);
    }
    takeDamage(jefe, bala) {
        bala.destroy(); // Eliminar la bala
    
        // Si el jefe es invulnerable, no recibe daño
        if (this.bossInvulnerable) {
            console.log("¡El jefe es invulnerable y no recibe daño!");
            return;
        }
    
        // Restar vida al jefe
        let damage = 3; // Ajusta el daño según sea necesario
        this.bossHealth = Math.max(0, this.bossHealth - damage);
    
        // Actualizar la barra de vida
        this.updateHealthBar();
    
        this.boss.setTint(0xff0000); // Cambia el color a rojo
        this.time.delayedCall(200, () => {
            this.boss.clearTint(); // Regresa a su color original después de 200ms
        });
    
        // Fase de furia si la vida baja al 50%
        if (this.bossHealth <= this.bossMaxHealth * 0.5 && !this.etapa2finalizada) {
            this.etapa2finalizada = true; // Evitar múltiples activaciones
            this.bossFase = 2;
            this.bossInvulnerable = true; // Hacer invulnerable al jefe
            console.log("¡El jefe está furioso! Se vuelve invulnerable y deja de disparar.");
    
            // Cambiar comportamiento
            this.bossSpeed = 0;
             // Detener disparos
    
            // Después de 10 segundos, vuelve a la normalidad y puede recibir daño nuevamente
            this.time.delayedCall(10000, () => {
                this.bossFase = 1;
                this.bossInvulnerable = false; // Volver a ser vulnerable
                this.bossSpeed = 100;
                this.delay = 1000;
                this.bossShootTimer.paused = false; // Reanudar disparos
            }, [], this);
        }
    
        // Destruir al jefe si su vida llega a 0
        if (this.bossHealth <= 0) {
            this.boss.destroy(); // Destruye completamente al jefe
            this.healthBar.clear();
        }
    }
    hitBomb(player, bomb) {
        bomb.destroy();
        if (this.isInvulnerable) return; // No recibe daño si es invulnerable
    
        this.lives -= 1;
        
        this.updateLivesUI();
    
        if (this.lives <= 0 && !this.GameOver) {
            this.GameOver = true;
            this.isGameOver();
        } else {
            this.activateInvulnerability(); // Activar invulnerabilidad después de recibir daño
        }
    }
    hitBoss(player, boss) {
        if (this.isInvulnerable) return;
    
        this.lives -= 1;
        this.updateLivesUI();
    
        if (this.lives <= 0 && !this.GameOver) {
            this.GameOver = true;
            this.isGameOver();
        } else {
            this.activateInvulnerability(); // Activar invulnerabilidad después de recibir daño
        }
    }
    updateLivesUI () {
        // Limpiar el contenedor antes de volver a renderizar las vidas
        this.livesContainer.innerHTML = "";

        // Agregar una imagen por cada vida restante
        for (let i = 0; i < this.lives; i++) {
            let img = document.createElement("img");
            img.src = "assets/SpritesUI/Vidas.png"; // Ruta correcta de la imagen de vida
            img.classList.add("life-icon"); // Clase CSS para darle estilo
            this.livesContainer.appendChild(img);
        }
    };
    BossShoot() {
        if (!this.boss || !this.boss.body) return;
    
        if (this.etapa2finalizada) {
            // En la fase 2, el jefe dispara ráfagas rápidas durante 5 segundos
            console.log("Fase 2: Ataque rápido");
    
            this.time.delayedCall(5000, () => {
                this.bossSpeed = 100;
                this.delay =8000; // Restaurar velocidad normal de disparo
            }, [], this);
    
            for (let i = 0; i < 3; i++) { // Disparar 3 balas en ráfaga
                this.time.delayedCall(i * 300, () => {
                    this.spawnBossProjectile();
                }, [], this);
            }
    
        } 
        else {
            // En la fase 1, el jefe dispara una sola bala dirigida al jugador
            this.spawnBossProjectile();
        }
    }
    spawnBossProjectile() {
        let bomb = this.bombs.create(this.boss.x, this.boss.y, 'ball');
        bomb.setScale(0.06);
        

        bomb.body.allowGravity = false;
    
        // Calcular dirección hacia el jugador
        let angle = Phaser.Math.Angle.Between(this.boss.x, this.boss.y, this.player.x, this.player.y);
        let speed = 180;
    
        // Aplicar velocidad en función del ángulo
        bomb.setVelocityX(Math.cos(angle) * speed);
        bomb.setVelocityY(Math.sin(angle) * speed);
    }
    isGameOver() {
        this.physics.pause();
        this.player.setTint(0xff0000);

        if (!this.deathSoundPlayed) {
            this.sound.play('deathSound');
            this.deathSoundPlayed = true;
        }

        const cam = this.cameras.main;
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        let bloodBackground = this.add.image(centerX, centerY, 'Sangre')
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(9);
        bloodBackground.setDisplaySize(cam.width, cam.height);

        let gameOverImage = this.add.image(centerX, centerY, 'gameOver')
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(10);

        // Definir escala para los botones (por ejemplo, 0.5 para hacerlos más pequeños)
        const buttonScale = 0.5;
        // Offset vertical para situarlos debajo de la imagen Game Over
        const offsetY = 150;
        // Offset horizontal para colocarlos uno a cada lado
        const offsetX = 80;

        // Botón para reiniciar el nivel
        let restartButton = this.add.image(centerX - offsetX, centerY + offsetY, 'Reiniciar')
            .setInteractive()
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(10)
            .setScale(buttonScale);

        restartButton.on('pointerdown', () => {
            this.etapa2finalizada=false;
            this.GameOver=false;
            this.delay=2000;
            this.bossFase=1;
            this.isInvulnerable = false;
            this.bossSpeed = 100;
            this.scene.restart();
            this.scene.start('scene-boss');
            
        });

        let menuButton = this.add.image(centerX + offsetX, centerY + offsetY, 'Home')
            .setInteractive()
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(10)
            .setScale(buttonScale);
        menuButton.on('pointerdown', () => {
            this.etapa2finalizada=false;
            this.GameOver=false;
            this.delay=2000;
            this.bossFase=1;
            this.isInvulnerable = false;
            this.bossSpeed = 100;
            this.scene.start('menu-scene');
        });
    }
    activateInvulnerability() {
        if (this.isInvulnerable) return; // Evita activar varias veces seguidas
        
        this.isInvulnerable = true;
        this.player.setTint(0x888888); // Color visual para indicar invulnerabilidad
    
        this.time.delayedCall(2000, () => { // 2 segundos de invulnerabilidad
            this.isInvulnerable = false;
            this.player.clearTint();
        }, [], this);
    }
    CrearRayos() {
        let x = 0;
        let rayos = []; // Almacenar los rayos creados
    
        // Crear los rayos y almacenarlos en un array
        for (let i = 0; i < 13; i++) {
            let ray = this.rayos.create(x, 0, 'rayo');
            ray.body.allowGravity = false; // Inicialmente sin gravedad
            ray.setScale(0.07);
            ray.body.setSize(5, 5);
            rayos.push(ray); // Guardar el rayo en el array
            x += 70;
        }
    
        let index = 0; // Índice para activar la gravedad de cada rayo
    
        this.time.addEvent({
            delay: 600, // Intervalo de tiempo entre cada activación (ajústalo según necesites)
            callback: () => {
                if (index < rayos.length) {
                    rayos[index].body.allowGravity = true; // Activar gravedad en el rayo actual
                    index++; // Pasar al siguiente rayo
                }
            },
            repeat: rayos.length - 1 // Repite hasta activar todos los rayos
        });
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'canvas',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Menu, GameScene, GameScene2, PlayerSetupScene, ControlsScene, CreditsScene, Boss],

};

window.onload = () => {
    const game = new Phaser.Game(config);
}; 800