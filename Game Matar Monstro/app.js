new Vue({
  el: '#app',
  data: {
    jogando: false,
    logs: [],
    personagens: GameData.personagens,
    inimigos: GameData.inimigos,
    jogador: null,
    monstro: null,
    jogadorEscolhido: null,
    monstroEscolhido: null,
    mensagemAcao: '',
    acaoEmAndamento: false,
    ataqueEspecialMonstro: false,
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
    ...GameMethods,
  },
  watch: {
    ...GameWatchers,
  },
});
