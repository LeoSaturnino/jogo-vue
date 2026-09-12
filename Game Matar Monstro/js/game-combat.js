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
    this.mensagemAcao = '';
    this.acaoEmAndamento = false;
    this.ataqueEspecialMonstro = false;
    this.valorAcao = '';
    this.tipoValorAcao = '';
  },

  escolherPersonagem(num) {
    this.jogadorEscolhido = num;
  },

  escolherInimigo(num) {
    this.monstroEscolhido = num;
  },

  attack(especial) {
    if (this.acaoEmAndamento) {
      return;
    }
    this.acaoEmAndamento = true;
    this.mensagemAcao = especial ? 'Você está usando o ataque especial!' : 'Você está atacando!';
    this.valorAcao = '';
    this.tipoValorAcao = '';
    this.jogador.animation = this.spritePath(this.jogador, especial ? 'ataque_especial' : 'ataque');
    this.monstro.animation = this.spritePath(this.monstro, 'hit');

    setTimeout(() => {
      let css = 'player';
      if (especial === true) {
        this.jogador.mana--;
        css = 'player-especial';
      }
      this.dano(this.monstro, this.jogador.forca - 2, this.jogador.forca + 2, especial, 'Jogador', 'Monstro', css);

      if (this.monstro.vida <= 0) {
        this.mensagemAcao = 'O monstro foi derrotado!';
        setTimeout(() => {
          this.acaoEmAndamento = false;
          this.mensagemAcao = '';
        }, 1200);
        return;
      }

      const continuarTurno = () => {
        const ataqueEspecialMonstro = this.ataqueEspecialMonstro;
        this.ataqueEspecialMonstro = false;
        const iniciarAtaqueMonstro = () => {
          if (this.jogador.vida <= 0) {
            this.acaoEmAndamento = false;
            return;
          }
          this.valorAcao = '';
          this.mensagemAcao = ataqueEspecialMonstro ? 'O monstro está atacando novamente!' : 'O monstro está atacando!';
          this.monstro.animation = this.spritePath(this.monstro, 'ataque');
          this.jogador.animation = this.spritePath(this.jogador, 'hit');
          setTimeout(() => {
            this.dano(this.jogador, this.monstro.forca - 3, this.monstro.forca + 2, false, 'Monstro', 'Jogador', 'monster');
            setTimeout(() => {
              this.jogador.animation = this.spritePath(this.jogador, 'inicial');
              this.monstro.animation = this.spritePath(this.monstro, 'inicial');
              this.acaoEmAndamento = false;
              this.mensagemAcao = '';
              this.valorAcao = '';
            }, 800);
          }, 1200);
        };

        if (ataqueEspecialMonstro) {
          setTimeout(iniciarAtaqueMonstro, 2000);
        } else {
          setTimeout(iniciarAtaqueMonstro, 900);
        }
      };

      setTimeout(continuarTurno, 0);
    }, 2000);
  },

  dano(personagem, min, max, especial, source, target, cls) {
    const plus = especial ? this.jogador.especial : 0;
    const dano = this.getRandom(min + plus, max + plus);
    personagem.vida = Math.max(personagem.vida - dano, 0);
    this.valorAcao = `Dano: ${dano}`;
    this.tipoValorAcao = source === 'Jogador' ? 'dano-causado' : 'dano-recebido';
    this.mensagemAcao = source === 'Jogador' ? 'Ataque realizado!' : 'Ataque do monstro realizado!';
    this.registerLog(`${source} atingiu ${target} com ${dano}.`, cls);
  },

  curaEdano() {
    if (this.acaoEmAndamento) {
      return;
    }
    this.acaoEmAndamento = true;
    this.mensagemAcao = 'Você está se curando!';
    this.valorAcao = '';
    this.tipoValorAcao = '';
    this.jogador.animation = this.spritePath(this.jogador, 'vida');
    setTimeout(() => {
      this.cura(this.monstro.forca, 15, this.jogador.especial);
      setTimeout(() => {
        this.valorAcao = '';
        this.mensagemAcao = 'O monstro está atacando!';
        this.monstro.animation = this.spritePath(this.monstro, 'ataque');
        this.jogador.animation = this.spritePath(this.jogador, 'hit');
        setTimeout(() => {
          this.dano(this.jogador, this.monstro.forca - 3, this.monstro.forca + 2, false, 'Monstro', 'Jogador', 'monster');
          setTimeout(() => {
            this.jogador.animation = this.spritePath(this.jogador, 'inicial');
            this.monstro.animation = this.spritePath(this.monstro, 'inicial');
            this.acaoEmAndamento = false;
            this.mensagemAcao = '';
            this.valorAcao = '';
          }, 800);
        }, 1200);
      }, 900);
    }, 2000);
  },

  cura(min, max, plus) {
    this.jogador.mana--;
    const cura = this.getRandom(min + plus, max + plus);
    const vidaMaxima = this.personagens[this.jogador.id].vida;
    this.jogador.vida = Math.min(this.jogador.vida + cura, vidaMaxima);
    this.valorAcao = `Cura: +${cura}`;
    this.tipoValorAcao = 'cura-realizada';
    this.mensagemAcao = 'Cura realizada!';
    this.registerLog(`Jogador ganhou ${cura} de vida.`, 'player-cura');
  },

  suicidar() {
    if (this.acaoEmAndamento) {
      return;
    }
    this.mensagemAcao = 'Você desistiu da batalha.';
    this.valorAcao = '';
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
