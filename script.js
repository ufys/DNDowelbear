const profBonus = 2; // Можно сделать вводом в HTML

function getMod(score) {
    return Math.floor((score - 10) / 2);
}

function updateSheet() {
    // Получаем модификаторы характеристик
    const mods = {
        str: getMod(document.getElementById('str-score').value),
        dex: getMod(document.getElementById('dex-score').value),
        int: getMod(document.getElementById('int-score').value),
        wis: getMod(document.getElementById('wis-score').value),
        cha: getMod(document.getElementById('cha-score').value)
    };

    // Обновляем отображение модификаторов
    for (let s in mods) {
        document.getElementById(`${s}-mod`).innerText = (mods[s] >= 0 ? '+' : '') + mods[s];
    }

    // Карта привязки навыков к характеристикам
    const skillMap = {
        'athletics': 'str',
        'acrobatics': 'dex', 'sleight-of-hand': 'dex', 'stealth': 'dex',
        'investigation': 'int', 'history': 'int', 'arcana': 'int', 'nature': 'int', 'religion': 'int',
        'perception': 'wis', 'survival': 'wis', 'medicine': 'wis', 'insight': 'wis', 'animal-handling': 'wis',
        'performance': 'cha', 'intimidation': 'cha', 'deception': 'cha', 'persuasion': 'cha'
    };

    // Пересчитываем каждый навык
    for (let skill in skillMap) {
        const skillEl = document.getElementById(`${skill}-val`);
        const isProf = skillEl.parentElement.querySelector('.prof').checked;
        const total = mods[skillMap[skill]] + (isProf ? profBonus : 0);
        skillEl.innerText = (total >= 0 ? '+' : '') + total;
    }
}

// Инициализация при старте
OBR.onReady(() => {
    updateSheet();
});
