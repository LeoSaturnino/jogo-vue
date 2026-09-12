new Vue({
  el: "#app",
  data: {
    jogando: false,
    logs: [],
    personagens: [
      {
        id: 0,
        img: "assets/person/mago.jpg",
        animation: "assets/sprite/Mago/inicial.gif",
        animationOK: true,
        nome: "Mago",
        vida: 100,
        mana: 5,
        forca: 5,
        especial: 9,
      },
      {
        id: 1,
        nome: "Guerreiro",
        img: "assets/person/guerreiro.jpg",
        animation: "assets/sprite/Guerreiro/inicial.gif",
        animationOK: false,
        vida: 120,
        mana: 4,
        forca: 8,
        especial: 5,
      },
      {
        id: 2,
        nome: "Arqueiro",
        img: "assets/person/arqueiro.jpg",
        animation: "assets/sprite/Arqueiro/inicial.gif",
        animationOK: false,
        vida: 100,
        mana: 5,
        forca: 7,
        especial: 7,
      },
    ],
    inimigos: [
      {
        id: 0,
        nome: "Fera",
        img: "assets/person/fera.jpg",
        animation: "assets/sprite/Fera/inicial.gif",
        animationOK: false,
        vida: 100,
        raiva: 2,
        forca: 10,
      },
      {
        id: 1,
        nome: "Demônio",
        img: "assets/person/demonio.jpg",
        animation: "assets/sprite/Demônio/inicial.gif",
        animationOK: true,
        vida: 100,
        raiva: 0,
        forca: 12,
      },
      {
        id: 2,
        nome: "Troll",
        img: "assets/person/troll.jpg",
        animation: "assets/sprite/Troll/inicial.gif",
        animationOK: false,
        vida: 120,
        raiva: 0,
        forca: 10,
      },
    ],
    jogador: null,
    monstro: null,
    jogadorEscolhido: null,
    monstroEscolhido: null,
  },
  computed: {
    resultado() {
      if (this.jogador && this.monstro) {
        return this.jogador.vida <= 0 || this.monstro.vida <= 0;
      }
      return false;
    },
  },
  methods: {
    iniciarGame() {
      if (this.monstroEscolhido == null || this.jogadorEscolhido == null) {
        swal("Escolha os personagens", "", "error");
        return;
      }
      this.jogador = Object.assign({}, this.personagens[this.jogadorEscolhido]);
      this.monstro = Object.assign({}, this.inimigos[this.monstroEscolhido]);
      this.jogando = true;
      this.logs = [];
    },
    escolherPersonagem(num) {
      this.jogadorEscolhido = num;
    },
    escolherInimigo(num) {
      this.monstroEscolhido = num;
    },
    spritePath(personagem, acao) {
      return "assets/sprite/" + personagem.nome + "/" + acao + ".gif";
    },
    attack(especial) {
      if (especial) {
        this.jogador.animation = this.spritePath(this.jogador, "ataque_especial");
      } else {
        this.jogador.animation = this.spritePath(this.jogador, "ataque");
      }
      this.monstro.animation = this.spritePath(this.monstro, "hit");
      setTimeout(() => {
        let css = "player";
        if (especial === true) {
          this.jogador.mana--;
          css = "player-especial";
        }
        this.dano(
          this.monstro,
          this.jogador.forca - 2,
          this.jogador.forca + 2,
          especial,
          "Jogador",
          "Monstro",
          css
        );
        if (this.monstro.vida > 0) {
          this.monstro.animation = this.spritePath(this.monstro, "ataque");
          this.jogador.animation = this.spritePath(this.jogador, "hit");
          setTimeout(() => {
            this.jogador.animation = this.spritePath(this.jogador, "inicial");
            this.monstro.animation = this.spritePath(this.monstro, "inicial");
          }, 2000);
          this.dano(
            this.jogador,
            this.monstro.forca - 2,
            this.monstro.forca + 2,
            false,
            "Monstro",
            "Jogador",
            "monster"
          );
        }
      }, 2000);
    },
    dano(personagem, min, max, especial, source, target, cls) {
      const plus = especial ? this.jogador.especial : 0;
      const dano = this.getRandom(min + plus, max + plus);
      personagem.vida = Math.max(personagem.vida - dano, 0);
      this.registerLog(`${source} atingiu ${target} com ${dano}.`, cls);
    },
    curaEdano() {
      this.jogador.animation = this.spritePath(this.jogador, "vida");
      setTimeout(() => {
        let plus = 0;
        if (this.jogador.id == 0) {
          plus = 5;
        }
        this.cura(10, 15, plus);
        this.monstro.animation = this.spritePath(this.monstro, "ataque");
        this.jogador.animation = this.spritePath(this.jogador, "hit");
        setTimeout(() => {
          this.jogador.animation = this.spritePath(this.jogador, "inicial");
          this.monstro.animation = this.spritePath(this.monstro, "inicial");
        }, 2000);
        this.dano(
          this.jogador,
          this.monstro.forca - 2,
          this.monstro.forca + 2,
          false,
          "Monstro",
          "Jogador",
          "monster"
        );
      }, 2000);
    },
    cura(min, max, plus) {
      this.jogador.mana--;
      const cura = this.getRandom(min + plus, max + plus);
      this.jogador.vida = Math.min(this.jogador.vida + cura, 100);
      this.registerLog(`Jogador ganhou ${cura} de vida.`, "player-cura");
    },
    suicidar() {
      this.jogador.animation = this.spritePath(this.jogador, "dead");
      this.jogador.vida = 0;
      setTimeout(() => {
        this.jogando = false;
      }, 5000);
    },
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min;
      return Math.round(value);
    },
    registerLog(text, cls) {
      this.logs.unshift({ text, cls });
    },
  },
  watch: {
    resultado(value) {
      if (value) {
        if (this.monstro.vida <= 0) {
          swal("Parabéns!", "Você Ganhou!", "success");
        } else {
          swal("Que Pena!", "Você Perdeu!", "error");
        }
        this.jogadorEscolhido = null;
        this.monstroEscolhido = null;
        setTimeout(() => {
          this.jogando = false;
        }, 5000);
      }
    },
    "monstro.vida": function (novo, antigo) {
      if (this.monstro && antigo != null && antigo - novo > 10 && this.monstro.vida > 0) {
        this.monstro.raiva++;
        this.registerLog(`Monstro ganhou 1 de Raiva.`, "monster-raiva");
      }
    },
    "jogador.vida": function (novo, antigo) {
      if (
        this.jogador &&
        this.monstro &&
        antigo != null &&
        antigo - novo > this.monstro.forca &&
        this.jogador.vida > 0
      ) {
        this.jogador.mana++;
        this.registerLog(`Jogador ganhou 1 de Mana.`, "player-mana");
      }
    },
    "monstro.raiva": function (value) {
      if (value == 3 && this.monstro && this.jogador) {
        this.monstro.animation = this.spritePath(this.monstro, "ataque_especial");
        this.jogador.animation = this.spritePath(this.jogador, "hit");
        setTimeout(() => {
          this.jogador.animation = this.spritePath(this.jogador, "inicial");
          this.monstro.animation = this.spritePath(this.monstro, "inicial");
        }, 2000);
        this.jogador.vida -= this.monstro.forca;
        this.monstro.raiva = 0;
        this.registerLog(
          `Monstro causou ` + this.monstro.forca + ` de dano no jogador.`,
          "monster-especial"
        );
      }
    },
    "jogador.mana": function () {
      if (this.jogador && this.jogador.mana > this.personagens[this.jogador.id].mana) {
        this.jogador.mana = this.personagens[this.jogador.id].mana;
      }
    },
  },
});
