
const consonants = ["b","p","g","c","d","t","v","f","h","w","y","x","l","r","m","n","z","s","zj","sz"];
const vowels = ["a","ā","e","ē","i","ī","u","ū","o"];

document.addEventListener("DOMContentLoaded", init);

function init() {
    const glyphSpace = document.getElementById("glyph-space");
    const input = document.getElementById("text");
    const button = document.getElementById("button");
    const feedback = document.getElementById("feedback");
    var prompt = null;

    glyphSpace.addEventListener("click", () => {
        glyphSpace.textContent = "";
        prompt = generatePrompt();
        for (const syllable of prompt.syllables) {
            glyphSpace.appendChild(buildComplete(syllable));
        }
        }
    );

        button.addEventListener('click',() => {
            if (prompt.romanization === input.value.replace(/ /g,'')) {
                feedback.textContent = '';
                feedback.appendChild(buildComplete({open: ['y'], vowel: ['e'], close: ['s']}))
                feedback.style.backgroundColor = '#90d390';
            } else {
                feedback.textContent = '';
                feedback.appendChild(buildComplete({open: ['n'], vowel: ['o'], close: ['p']}))
                feedback.style.backgroundColor = '#fca1a1';
            }
        })

};

function generatePrompt() {

    var loops = null;
    var random = randomInteger(1,10);
    switch (true) {
        case random > 11:
            loops = random - 4;
            break;
        case random > 9:
            loops = 4;
            break;
        case random > 6:
            loops = 3;
            break;
        case random > 3:
            loops = 2;
            break;
        default:
            loops = 1;
    }

    var syllables = [];

    for (var i = 0; i < loops; i++) {
        syllables.push(generateSyl());
    }

    var romanization = romanize(syllables);

    return {
        syllables: [...syllables],
        romanization: romanization
    }

}

function generateSyl() {

    var loops = null;
    var random = randomInteger(1,10);
    switch (true) {
        /* case random > 8:
            loops = 3;
            break; */
        case random > 5:
            loops = 2;
            break;
        default:
            loops= 1;
    }

    var open = [];
    for (var i = 0; i < loops; i++) {
        open.push(consonants[randomInteger(0,(consonants.length - 1))])
    }

    if (randomInteger(1,10) > 7) loops = 2;
    else {
        loops = 1;
    }

    var vowel = [vowels[randomInteger(0,(vowels.length - 1))]];

    /* for (var i = 0; i < loops; i++) {
        vowel.push(
            vowels[randomInteger(0,(vowels.length - 1))]
        );
    } */

    random = randomInteger(1,10);
    switch (true) {
        /* case random > 8:
            loops = 3;
            break; */
        case random > 5:
            loops = 2;
            break;
        default:
            loops= 1;
    }

    var close = [];
    for (var i = 0; i < loops; i++) {
        close.push(
            consonants[randomInteger(0,(consonants.length - 1))]
        );
    }

    return {
        open: [...open],
        vowel: [...vowel],
        close: [...close]
    }
}

function buildComplete({ open, vowel, close }) {
    const glyphDiv = e("div",["syllable"]);
    glyphDiv.appendChild(e("div",["bound"]));

    const lateralPanels = glyphDiv.appendChild(e("div",["complete-lateral-panels"]));
    const leftPanel = lateralPanels.appendChild(e("div",["complete-left-panel"]));
    open.forEach(phoneme => {
        const img = e("img",["phoneme"]);
        img.src = `resources/symbols\ tall/${phoneme}.png`;
        leftPanel.appendChild(img);
    })

    const rightPanel = lateralPanels.appendChild(e("div",["complete-right-panel"]));

    const topPanel = rightPanel.appendChild(e("div",["complete-right-top-panel"]));
    vowel.forEach(phoneme => {
        const img = e("img",["phoneme"]);
        img.src = `resources/symbols\ short/${phoneme}.png`;
        topPanel.appendChild(img);
    })

    rightPanel.appendChild(e("div",["bound"]));
    const bottomPanel = rightPanel.appendChild(e("div",["complete-right-bottom-panel"]));
    close.forEach(phoneme => {
        const img = e("img",["phoneme"]);
        img.src = `resources/symbols\ short/${phoneme}.png`;
        bottomPanel.appendChild(img);
    })

    return glyphDiv;
}

function e(type,classes,id) {
    const element = document.createElement(type);
    classes.forEach((htmlClass) => element.classList.add(htmlClass));
    if (id) element.id = id;
    return element;
}

function romanize(syllables) {
    var romanization = [];
    for (const syllable of syllables) {
        var sylRoman = [];

        sylRoman.push(syllable.open.join(''));
        sylRoman.push(syllable.vowel.join(''));
        sylRoman.push(syllable.close.join(''));
        romanization.push(sylRoman.join(''));
    }

    return romanization.join('');
}

function randomInteger(minimum, maximum) {
	if (maximum === undefined) {
		maximum = minimum;
		minimum = 0;
	}

	if (typeof minimum !== 'number' || typeof maximum !== 'number') {
		throw new TypeError('Expected all arguments to be numbers');
	}

	return Math.floor(
		(Math.random() * (maximum - minimum + 1)) + minimum
	);
}