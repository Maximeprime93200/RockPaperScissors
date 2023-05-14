function determineWinner(move1, move2, req, res, next) {
    if (move1 === move2) {
      return 'Égalité !' + ' : ' + `${move1}` + ' et ' + `${move1}` + ' font match nul';
    } else if (
      (move1 === 'pierre' && move2 === 'ciseaux') ||
      (move1 === 'papier' && move2 === 'pierre') ||
      (move1 === 'ciseaux' && move2 === 'papier')
    ) {
      return 'Joueur 1 remporte la partie !';
    } else {
      return 'Joueur 2 remporte la partie !';
    }
  }

    module.exports = determineWinner;