function validateChoice(req, res, next) {
    const moves = ['pierre', 'papier', 'ciseaux'];
    const { move1, move2 } = req.body;

    if (!moves.includes(move1) || !moves.includes(move2)) {
        res.status(400).json({ error: "Coup invalide. Veuillez choisir entre pierre, papier ou ciseaux." });
        return;
      }
        next();
}

module.exports = validateChoice;