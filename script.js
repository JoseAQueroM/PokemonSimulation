"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const hpCharizard = document.getElementById('hpCharizard');
    const hpVenusaur = document.getElementById('hpVenusaur');
    const textBattle = document.getElementById('textBattle');
    const hpLow = document.getElementById('hpLow');
    const hpBar = document.getElementById('hpBar');
    const hpBar2 = document.getElementById('hpBar2');
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
                { type: 'Fuego', poder: 50 },
                { type: 'Fuego', poder: 70 },
                { type: 'Dragon', poder: 60 },
                { type: 'Dragon', poder: 40 },
            ];
        }
        realizarAtaque(pokemonRival, ataque) {
            pokemonRival.recibirAtaque(ataque);
            hpBar.style.width = `${(pokemonRival.hp / 370) * 100}%`;
            const texto = `La vida de ${pokemonRival.name} ha bajado a ${pokemonRival.hp}`;
            efectoTextHpLow(hpLow, texto);
        }
        recibirAtaque(ataque) {
            this.hp -= ataque.poder;
        }
    }
    class Venusaur {
        constructor() {
            this.name = 'Venusaur';
            this.hp = 370;
            this.type = ['Planta', 'Veneno'];
            this.ataques = [
                { type: 'Planta', poder: 50 },
                { type: 'Planta', poder: 70 },
                { type: 'Veneno', poder: 60 },
                { type: 'Veneno', poder: 40 },
            ];
        }
        realizarAtaque(pokemonRival, ataque) {
            pokemonRival.recibirAtaque(ataque);
            hpBar2.style.width = `${(pokemonRival.hp / 420) * 100}%`;
            const texto = `La vida de ${pokemonRival.name} ha bajado a ${pokemonRival.hp}`;
            efectoTextHpLow(hpLow, texto);
        }
        recibirAtaque(ataque) {
            this.hp -= ataque.poder;
        }
    }
    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
    const computadoraAtaque = () => {
        const numAtaque = randomNumber(0, 4);
        const ataques = ['Hoja afilada', 'Latigo Cepa', 'Gigadrenado', 'Bomba acida'];
        const textoCompu = `Venusaur ha utilizado ${ataques[numAtaque]}`;
        efectoTextAttack(textBattle, textoCompu);
        venusaur.realizarAtaque(charizard, venusaur.ataques[random]);
        hpCharizard.textContent = String(charizard.hp);
    };
    const random = randomNumber(1, 4);
    const charizard = new Charizard();
    const venusaur = new Venusaur();
    hpCharizard.textContent = String(charizard.hp);
    hpVenusaur.textContent = String(venusaur.hp);
    const botones = document.querySelectorAll('.btn-Battle');
    const verificarVida = () => {
        if (venusaur.hp < 1) {
            alert('El ganador es Charizard');
        }
        if (charizard.hp < 1) {
            alert('El ganador es Venusaur');
        }
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
                    verificarVida();
                    setTimeout(() => {
                        computadoraAtaque();
                        verificarVida();
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
                        computadoraAtaque();
                        verificarVida();
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
                        computadoraAtaque();
                        verificarVida();
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
                        computadoraAtaque();
                        verificarVida();
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
