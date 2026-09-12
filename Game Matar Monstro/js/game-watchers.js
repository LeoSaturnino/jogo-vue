window.GameWatchers = {
  resultado(value) {
    if (value) {
      if (this.monstro.vida <= 0) {
        swal('Parabéns!', 'Você Ganhou!', 'success');
      } else {
        swal('Que Pena!', 'Você Perdeu!', 'error');
      }
      this.jogadorEscolhido = null;
      this.monstroEscolhido = null;
      setTimeout(() => {
        this.jogando = false;
      }, 5000);
    }
  },

  'monstro.vida'(novo, antigo) {
    if (this.monstro && antigo != null && antigo - novo > this.monstro.forca && this.monstro.vida > 0) {
      this.monstro.raiva++;
      this.registerLog('Monstro ganhou 1 de Raiva.', 'monster-raiva');
    }
  },

  'jogador.vida'(novo, antigo) {
    if (this.jogador && this.monstro && antigo != null && antigo - novo > this.monstro.forca && this.jogador.vida > 0) {
      this.jogador.mana++;
      this.registerLog('Jogador ganhou 1 de Poder.', 'player-mana');
    }
  },

  'monstro.raiva'(value) {
    if (value == 3 && this.monstro && this.jogador) {
      this.ataqueEspecialMonstro = true;
      this.mensagemAcao = 'O monstro realizou um ataque especial!';
      this.valorAcao = `Dano: ${this.monstro.forca}`;
      this.tipoValorAcao = 'dano-recebido';
      this.monstro.animation = this.spritePath(this.monstro, 'ataque_especial');
      this.jogador.animation = this.spritePath(this.jogador, 'hit');
      this.jogador.vida -= this.monstro.forca;
      this.monstro.raiva = 0;
      this.registerLog(`Monstro causou ${this.monstro.forca} de dano no jogador.`, 'monster-especial');
    }
  },

  'jogador.mana'(novo, antigo) {
    if (this.jogador && antigo != null && novo > antigo) {
      this.poderGanho = false;
      this.$nextTick(() => {
        this.poderGanho = true;
        setTimeout(() => {
          this.poderGanho = false;
        }, 800);
      });
    }
    if (this.jogador && this.jogador.mana > this.personagens[this.jogador.id].mana) {
      this.jogador.mana = this.personagens[this.jogador.id].mana;
    }
  },
};
