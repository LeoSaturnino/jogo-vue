# Game Matar Monstro

<h3>Descrição</h3>
Jogo de batalha em turnos com objetivo de Matar o Monstro Adversário

<h3>Tecnologias</h3>
- HTML5
- CSS3
- VueJS
- JavaScript

<h3>Organização do código</h3>

As responsabilidades do jogo estão separadas para facilitar manutenção:

- `app.js` inicializa a aplicação Vue e reúne a configuração principal.
- `js/game-data.js` contém os dados dos personagens e inimigos.
- `js/game-utils.js` contém funções reutilizáveis, como caminhos de sprites e números aleatórios.
- `js/game-combat.js` contém as ações e regras de combate.
- `js/game-watchers.js` contém os observadores de vida, mana, raiva e resultado da partida.
- `style.css` funciona como ponto de entrada dos estilos da interface.
- `styles/base.css` define variáveis, tipografia, cores e estrutura geral.
- `styles/status.css` reúne os painéis de vida, mana, raiva e retratos.
- `styles/controls.css` reúne os botões e controles da partida.
- `styles/selection.css` estiliza a seleção de heróis e monstros.
- `styles/combat.css` estiliza a arena, as animações e as mensagens de ação.
- `styles/logs.css` estiliza o histórico de ações da batalha.
- `styles/responsive.css` concentra os ajustes para telas menores.
- `assets/person/` contém os retratos PNG dos personagens e inimigos.
- `assets/sprite/` contém as animações GIF organizadas por personagem.

Os arquivos são carregados diretamente pelo `index.html`, portanto o projeto continua funcionando sem instalação de dependências locais.

<h3>Atualizações recentes</h3>

- Inclusão dos heróis Ninja e Bruxa.
- Inclusão dos inimigos Minotauro, Medusa, Esqueleto e Cavaleiro.
- Substituição dos retratos antigos por imagens PNG padronizadas.
- Integração de sprites animados para os estados inicial, ataque, ataque especial, dano, morte, vida, mana e raiva.
- Organização da arena para exibir as animações dos dois combatentes e as mensagens de cada ação.
- Reorganização dos painéis de status, com retratos menores ao lado das barras de vida, mana e raiva.
- Ajustes de enquadramento dos retratos, incluindo a correção visual da Bruxa.
- Modularização do CSS por responsabilidade, deixando `style.css` como ponto de entrada e facilitando a manutenção da interface.

<h3>Objetivo</h3>
Aprender a linguagem de Programação VueJS e como as tecnologias reativas funcionam.

<h3>Funcionamento</h3>
O jogador começa escolhendo um dos cinco heróis e um dos cinco monstros adversários. Cada personagem tem atributos diferentes de vida, força, mana ou raiva, e uma ação é executada por turno com o objetivo de zerar a vida do adversário.

![jmm - incio](https://user-images.githubusercontent.com/22065816/109401543-24ee8500-792e-11eb-8265-f457b0c3a728.png)

Após inciar o Jogo o jogador tem 4 opções de Movimento:

- Ataque = o movimento basico onde o herói realiza um golpe com base na sua força e retirando vida do Monstro
- Ataque Especial = o herói realiza um golpe mais forte, consumindo 1 da sua mana disponível
- Cura = O herói deixa de atacar este turno para recuperar um pouco de vida, consumindo 1 da sua mana disponível
- Suicidar = Opção no qual o Jogador desiste do Jogo e encera a partida com detora
  ![jmm - interface](https://user-images.githubusercontent.com/22065816/109401498-e8228e00-792d-11eb-8a35-4e29ef8c875e.png)

Para cada Ação do Jogador o Monstro Adversário realizará um Ataque com base na força do monstro.

Mecânicas do Jogo:

- Ganho de Mana/Raiva = sempre que o herói toma um dano crítico ele ganha um de mana, o crítico é calculado em função da força dos personagens.
- Ataque de Raiva = Quando o Monstro atige 3 de Raiva ele executa um ataque extra.
- Ataque = É calculado em função da força do Personagem com uma variação de +2 ou -2.
- Cura = É soretado um valor entre 10 e 15 + o valor de especial do herói.
- Ataque Especial = É calculado em função da força do Personagem + o valor de especial podendo varia +2 ou -2.

O jogo também conta com um sistema de Logs, que fica na parte de baixo da tela com o detalhe das ações executadas.

<h3>Bônus</h3>
Durante o projeto também foi estudado o uso de sprites de animações 2D/8 bits. Atualmente, os personagens disponíveis possuem animações específicas para as ações e estados da batalha.

![jmm - sprite](https://user-images.githubusercontent.com/22065816/109401515-fec8e500-792d-11eb-8ac0-1ef16184229a.PNG)

As animações ficam separadas por personagem em `assets/sprite/`, facilitando a manutenção e a inclusão de novos combatentes.

<h3>Execução</h3>
Bastar Realizar o download do Projeto e abrir o arquivo index.html.
O Projeto utilizao VueJS online entâo não é necessário realizar a instalação das dependências.

![jmm - animation](https://user-images.githubusercontent.com/22065816/109401548-2a4bcf80-792e-11eb-8f37-f6f1a31b94e7.png)
