window.GameUtils = {
  spritePath(personagem, acao) {
    return 'assets/sprite/' + personagem.nome + '/' + acao + '.gif';
  },

  getRandom(min, max) {
    const value = Math.random() * (max - min) + min;
    return Math.round(value);
  },
};
