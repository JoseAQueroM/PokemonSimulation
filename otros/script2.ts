document.addEventListener("DOMContentLoaded", () => {

    const hpSquirtle    : HTMLElement       = document.getElementById('hpSquirtle')!;
    const hpCharmander  : HTMLElement       = document.getElementById('hpCharmander')!;
    const textBattle    : HTMLElement       = document.getElementById('textBattle')!;
    const receiveAttack : HTMLElement       = document.getElementById('hpLow')!;
    const idAttack      : HTMLButtonElement = document.getElementById('fight') as HTMLButtonElement;

    const efectoTextAttack = (elemento : any, texto : string , i = 0) => {
        elemento.textContent += texto[i];

        if( i === texto.length - 1) {

            return setTimeout(() => {
                elemento.textContent = '';

            }, 5000);
            
        }

        setTimeout(() => {
            
            efectoTextAttack(textBattle, texto, i + 1);

        }, 100);
    }

    const efectoTextHpLow = (elemento : any, texto : string , i = 0) => {
        elemento.textContent += texto[i];

        if( i === texto.length - 1) {
            
            return setTimeout(() => {
                elemento.textContent = '';

            }, 4000);
            
        }

        setTimeout(() => {
            
            efectoTextHpLow(receiveAttack,texto, i + 1);

        }, 100);
    }

    const randomNumber = ( min : number, max : number ) => {

        return Math.floor( Math.random() * (max - min) + min); 

    }

    class Pokemon {

        constructor( public name : string,
                     public type : string,
                     public hp   : number
        ){}
    
        attack( move : number ){
            
            switch (move) {
                case 1: 
                    const texto = `Has usado Hidrochorro`;

                    efectoTextAttack(textBattle, texto)

                    break;

                case 2:
                    const texto2 = `Has usado Pistola agua`;

                    efectoTextAttack(textBattle, texto2)

                    break;

                case 3:

                    const texto3 = `Has usado Giro Fuego`;
                    efectoTextAttack(textBattle, texto3);
                   
                    break;

                case 4:
                    const texto4 = `Has usado Lanzallamas`;

                    efectoTextAttack(textBattle, texto4)
            
                default:
                    break;
            }

        }
            receiveAttack( Damage : number ){
    
                this.hp -= Damage;
                let receive = `El HP de ${this.name} bajo a:  ${this.hp}`;

                efectoTextHpLow(receiveAttack, receive);

            }
    
    }
    
    
    const Charmander = new Pokemon('Charmander','Fuego', 120);
    const Squirtle   = new Pokemon('Squirtle', 'Agua', 100);
    hpSquirtle.textContent   = `${Squirtle.hp}`;
    hpCharmander.textContent = `${Charmander.hp}`;

    idAttack?.addEventListener('click', () => {

        let valorDeAtaque = randomNumber(10,35);

        let ataqueSquirtle = randomNumber(1,3)
        Squirtle.attack(ataqueSquirtle);

        Charmander.receiveAttack(valorDeAtaque);
        hpCharmander.textContent = Charmander.hp.toString();
        idAttack.disabled = true;


        setTimeout(() => {
            
            let ataqueCharmander = randomNumber(3,5)
            Charmander.attack(ataqueCharmander);
            Squirtle.receiveAttack(valorDeAtaque);
            hpSquirtle.textContent = Squirtle.hp.toString();

            setTimeout(() => {

                idAttack.disabled = false;

            }, 7500);

        }, 8000);


        if( Charmander.hp < 1 ){
            alert('Ha finalizado el juego')
            idAttack.disabled = true;
            
        } 

    })

})

