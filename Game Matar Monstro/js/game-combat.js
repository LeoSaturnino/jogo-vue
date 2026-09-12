window.GameMethods = {
  iniciarGame() {
    if (this.monstroEscolhido == null || this.jogadorEscolhido == null) {
      swal('Escolha os personagens', '', 'error');
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

  attack(especial) {
    this.jogador.animation = this.spritePath(this.jogador, especial ? 'ataque_especial' : 'ataque');
    this.monstro.animation = this.spritePath(this.monstro, 'hit');

    setTimeout(() => {
      let css = 'player';
      if (especial === true) {
        this.jogador.mana--;
        css = 'player-especial';
      }
      this.dano(this.monstro, this.jogador.forca - 2, this.jogador.forca + 2, especial, 'Jogador', 'Monstro', css);

      if (this.monstro.vida > 0) {
        this.monstro.animation = this.spritePath(this.monstro, 'ataque');
        this.jogador.animation = this.spritePath(this.jogador, 'hit');
        setTimeout(() => {
          this.jogador.animation = this.spritePath(this.jogador, 'inicial');
          this.monstro.animation = this.spritePath(this.monstro, 'inicial');
        }, 2000);
        this.dano(this.jogador, this.monstro.forca - 2, this.monstro.forca + 2, false, 'Monstro', 'Jogador', 'monster');
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
    this.jogador.animation = this.spritePath(this.jogador, 'vida');
    setTimeout(() => {
      const plus = this.jogador.id == 0 ? 5 : 0;
      this.cura(10, 15, plus);
      this.monstro.animation = this.spritePath(this.monstro, 'ataque');
      this.jogador.animation = this.spritePath(this.jogador, 'hit');
      setTimeout(() => {
        this.jogador.animation = this.spritePath(this.jogador, 'inicial');
        this.monstro.animation = this.spritePath(this.monstro, 'inicial');
      }, 2000);
      this.dano(this.jogador, this.monstro.forca - 2, this.monstro.forca + 2, false, 'Monstro', 'Jogador', 'monster');
    }, 2000);
  },

  cura(min, max, plus) {
    this.jogador.mana--;
    const cura = this.getRandom(min + plus, max + plus);
    this.jogador.vida = Math.min(this.jogador.vida + cura, 100);
    this.registerLog(`Jogador ganhou ${cura} de vida.`, 'player-cura');
  },

  suicidar() {
    this.jogador.animation = this.spritePath(this.jogador, 'dead');
    this.jogador.vida = 0;
    setTimeout(() => {
      this.jogando = false;
    }, 5000);
  },

  spritePath: GameUtils.spritePath,
  getRandom: GameUtils.getRandom,

  registerLog(text, cls) {
    this.logs.unshift({ text, cls });
  },
};
