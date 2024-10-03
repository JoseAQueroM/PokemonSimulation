"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const hpCharizard = document.getElementById('hpCharizard');
    const hpVenusaur = document.getElementById('hpVenusaur');
    const textBattle = document.getElementById('textBattle');
    const hpLow = document.getElementById('hpLow');
    const hpBar = document.getElementById('hpBar');
    const hpBar2 = document.getElementById('hpBar2');
    const btnMusic = document.getElementById('musicBattle');
    const sound = new Audio('./sounds/PokeBatalla.mp3');
    let isPlaying = false;
    sound.addEventListener('ended', () => {
        sound.play();
    });
    btnMusic === null || btnMusic === void 0 ? void 0 : btnMusic.addEventListener('click', () => {
        if (!isPlaying) {
            sound.volume = 0.07;
            btnMusic.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-volume" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M15 8a5 5 0 0 1 0 8" />
                                        <path d="M17.7 5a9 9 0 0 1 0 14" />
                                        <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                                    </svg>`;
            sound.play();
            isPlaying = true;
        }
        else {
            btnMusic.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-volume-3" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                                        <path d="M16 10l4 4m0 -4l-4 4" />
                                  </svg>`;
            sound.pause();
            isPlaying = false;
        }
    });
    fetch('https://pokeapi.co/api/v2/pokemon/venusaur')
        .then(res => res.json())
        .then(data => {
        const spriteUrlVenusaur = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        const imgSprite = document.getElementById('venusaurSprite');
        imgSprite.src = spriteUrlVenusaur;
    });
    fetch('https://pokeapi.co/api/v2/pokemon/charizard')
        .then(res => res.json())
        .then(data => {
        const spriteUrlCharizard = data.sprites.versions['generation-v']['black-white'].animated.back_default;
        const imgSprite = document.getElementById('charizardSprite');
        imgSprite.src = spriteUrlCharizard;
    });
    const efectoTextAttack = (elemento, texto, i = 0) => {
        elemento.textContent += texto[i];
        if (i === texto.length - 1) {
            return setTimeout(() => {
                elemento.textContent = '';
            }, 2000);
        }
        setTimeout(() => {
            efectoTextAttack(textBattle, texto, i + 1);
        }, 50);
    };
    const efectoTextHpLow = (elemento, texto, i = 0) => {
        elemento.textContent += texto[i];
        if (i === texto.length - 1) {
            return setTimeout(() => {
                elemento.textContent = '';
            }, 1990);
        }
        setTimeout(() => {
            efectoTextHpLow(hpLow, texto, i + 1);
        }, 50);
    };
    class Charizard {
        constructor() {
            this.name = 'Charizard';
            this.hp = 420;
            this.type = ['Fuego', 'Dragon'];
            this.ataques = [
                { type: 'Fuego', poder: 70 },
                { type: 'Fuego', poder: 70 },
                { type: 'Dragon', poder: 90 },
                { type: 'Dragon', poder: 85 },
            ];
        }
        realizarAtaque(pokemonRival, ataque) {
            pokemonRival.recibirAtaque(ataque);
            const barradeVida = (pokemonRival.hp / 370) * 100;
            hpBar.style.width = `${barradeVida}%`;
            if (hpBar.style.width >= '30%' && hpBar.style.width <= '60%') {
                hpBar.style.backgroundColor = `orange`;
            }
            if (hpBar.style.width >= '0%' && hpBar.style.width < '30%') {
                hpBar.style.backgroundColor = `red`;
            }
            const texto = `La vida de ${pokemonRival.name} ha bajado a ${pokemonRival.hp}`;
            efectoTextHpLow(hpLow, texto);
        }
        recibirAtaque(ataque) {
            this.hp -= ataque.poder;
        }
        regenerarVida() {
            this.hp = 420;
            hpBar.style.width = `100%`;
            hpBar.style.backgroundColor = `#32E25B`;
        }
    }
    class Venusaur {
        constructor() {
            this.name = 'Venusaur';
            this.hp = 370;
            this.type = ['Planta', 'Veneno'];
            this.ataques = [
                { type: 'Planta', poder: 70 },
                { type: 'Planta', poder: 80 },
                { type: 'Veneno', poder: 75 },
                { type: 'Veneno', poder: 90 },
            ];
        }
        realizarAtaque(pokemonRival, ataque) {
            pokemonRival.recibirAtaque(ataque);
            const barradeVida = (pokemonRival.hp / 420) * 100;
            hpBar2.style.width = `${barradeVida}%`;
            if (hpBar2.style.width >= '30%' && hpBar.style.width <= '60%') {
                hpBar2.style.backgroundColor = `orange`;
            }
            if (hpBar2.style.width >= '0%' && hpBar2.style.width < '30%') {
                hpBar2.style.backgroundColor = `red`;
            }
            const texto = `La vida de ${pokemonRival.name} ha bajado a ${pokemonRival.hp}`;
            efectoTextHpLow(hpLow, texto);
        }
        recibirAtaque(ataque) {
            this.hp -= ataque.poder;
        }
        regenerarVida() {
            this.hp = 370;
            hpBar2.style.width = `100%`;
            hpBar2.style.backgroundColor = `#32E25B`;
        }
    }
    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
    const computadoraAtaque = () => {
        verificarVida();
        if (charizard.hp > 0 && venusaur.hp > 0) {
            const numAtaque = randomNumber(0, 4);
            const ataques = ['Hoja afilada', 'Latigo Cepa', 'Gigadrenado', 'Bomba acida'];
            const textoCompu = `Venusaur ha utilizado ${ataques[numAtaque]}`;
            efectoTextAttack(textBattle, textoCompu);
            venusaur.realizarAtaque(charizard, venusaur.ataques[random]);
            hpCharizard.textContent = String(charizard.hp);
        }
        else {
            return;
        }
    };
    const random = randomNumber(1, 4);
    const charizard = new Charizard();
    const venusaur = new Venusaur();
    hpCharizard.textContent = String(charizard.hp);
    hpVenusaur.textContent = String(venusaur.hp);
    const botones = document.querySelectorAll('.btn-Battle');
    const verificarVida = () => {
        if (venusaur.hp < 1) {
            Swal.fire("Ha ganado Charizard!");
            hpBar.style.width = `0%`;
            venusaur.regenerarVida();
            charizard.regenerarVida();
            hpCharizard.textContent = String(charizard.hp);
            hpVenusaur.textContent = String(venusaur.hp);
            return;
        }
        if (charizard.hp < 1) {
            Swal.fire("Ha ganado Venusaur!");
            hpBar2.style.width = `0%`;
            venusaur.regenerarVida();
            charizard.regenerarVida();
            hpCharizard.textContent = String(charizard.hp);
            hpVenusaur.textContent = String(venusaur.hp);
            return;
        }
        return;
    };
    botones.forEach(button => {
        button.addEventListener('click', (event) => {
            const target = event.target;
            let button = target.textContent;
            switch (button) {
                case 'Garra Dragon':
                    const texto = 'Charizard ha utilizado Garra Dragon';
                    efectoTextAttack(textBattle, texto);
                    charizard.realizarAtaque(venusaur, charizard.ataques[0]);
                    hpVenusaur.textContent = String(venusaur.hp);
                    Array.from(botones).forEach(btn => btn.disabled = true);
                    setTimeout(() => {
                        if (charizard.hp > 0 && venusaur.hp > 0) {
                            computadoraAtaque();
                        }
                        else {
                            verificarVida();
                        }
                    }, 4000);
                    setTimeout(() => {
                        Array.from(botones).forEach(btn => btn.disabled = false);
                    }, 8000);
                    break;
                case 'Furia Dragon':
                    const texto2 = 'Charizard ha utilizado Furia Dragon';
                    efectoTextAttack(textBattle, texto2);
                    charizard.realizarAtaque(venusaur, charizard.ataques[1]);
                    hpVenusaur.textContent = String(venusaur.hp);
                    Array.from(botones).forEach(btn => btn.disabled = true);
                    setTimeout(() => {
                        if (charizard.hp > 0 && venusaur.hp > 0) {
                            computadoraAtaque();
                        }
                        else {
                            verificarVida();
                        }
                    }, 4000);
                    setTimeout(() => {
                        Array.from(botones).forEach(btn => btn.disabled = false);
                    }, 8000);
                    break;
                case 'Ascuas':
                    const texto3 = 'Charizard ha utilizado Ascuas';
                    efectoTextAttack(textBattle, texto3);
                    charizard.realizarAtaque(venusaur, charizard.ataques[2]);
                    hpVenusaur.textContent = String(venusaur.hp);
                    Array.from(botones).forEach(btn => btn.disabled = true);
                    setTimeout(() => {
                        if (charizard.hp > 0 && venusaur.hp > 0) {
                            computadoraAtaque();
                        }
                        else {
                            verificarVida();
                        }
                    }, 4000);
                    setTimeout(() => {
                        Array.from(botones).forEach(btn => btn.disabled = false);
                    }, 8000);
                    break;
                case 'Lanzallamas':
                    const texto4 = 'Charizard ha utilizado Lanzallamas';
                    efectoTextAttack(textBattle, texto4);
                    charizard.realizarAtaque(venusaur, charizard.ataques[3]);
                    hpVenusaur.textContent = String(venusaur.hp);
                    Array.from(botones).forEach(btn => btn.disabled = true);
                    setTimeout(() => {
                        if (charizard.hp > 0 && venusaur.hp > 0) {
                            computadoraAtaque();
                        }
                        else {
                            verificarVida();
                        }
                    }, 4000);
                    setTimeout(() => {
                        Array.from(botones).forEach(btn => btn.disabled = false);
                    }, 8000);
                    break;
                default:
                    break;
            }
        });
    });
});
