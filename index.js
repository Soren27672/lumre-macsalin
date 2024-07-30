
const consonants = ["b","p","g","c","d","t","v","f","h","w","y","x","l","r","m","n","z","s","zj","sz"];
const vowels = ["a","ā","e","ē","i","ī","u","ū","o"];

const openConBlocks = [
    ["w"],
    ["r"],
    ["t"],
    ["y"],
    ["p"],
    ["s"],
    ["d"],
    ["f"],
    ["g"],
    ["h"],
    ["zj"],
    ["sz"],
    ["l"],
    ["x"],
    ["c"],
    ["v"],
    ["b"],
    ["n"],
    ["m"],

    ["t","w"],
    ["t","r"],
    ["t","y"],
    ["t","s"],

    ["p","w"],
    ["p","w"],
    ["p","y"],
    ["p","l"],

    ["s","w"],
    ["s","r"],
    ["s","t"],
    ["s","p"],
    ["s","l"],
    ["s","c"],
    ["s","n"],
    ["s","m"],

    ["d","w"],
    ["d","r"],
    ["d","y"],
    
    ["f","w"],
    ["f","r"],
    ["f","y"],
    ["f","l"],
    ["f","v"],

    ["g","w"],
    ["g","r"],
    ["g","y"],
    ["g","l"],
    
    ["h","w"],
    ["h","y"],

    ["zj","w"],
    ["zj","y"],
    ["zj","l"],
    ["zj","v"],

    ["sz","w"],
    ["sz","y"],
    ["sz","p"],
    ["sz","f"],
    ["sz","l"],
    ["sz","c"],
    ["sz","n"],
    ["sz","m"],

    ["l","w"],
    ["l","y"],

    ["x","w"],
    ["x","r"],
    ["x","y"],

    ["c","w"],
    ["c","r"],
    ["c","y"],
    ["c","l"],

    ["v","w"],
    ["v","r"],
    ["v","y"],
    ["v","l"],

    ["b","w"],
    ["b","r"],
    ["b","y"],
    ["b","l"],

    ["n","w"],
    ["n","y"],

    ["m","w"],
    ["m","r"],
    ["m","y"],
    ["m","l"],
];

const vowelBlocks = [
    ["a"],
    ["ā"],
    ["e"],
    ["ē"],
    ["i"],
    ["ī"],
    ["u"],
    ["ū"],
    ["o"],

    ["a","i"],
    ["a","u"],
    ["a","o"],

    ["e","i"],

    ["i","a"],
    ["i","e"],
    ["i","ē"],
    ["i","u"],

    ["o","i"]

];

const closeConBlocks = [
    ["r"],
    ["t"],
    ["p"],
    ["s"],
    ["d"],
    ["f"],
    ["g"],
    ["h"],
    ["zj"],
    ["sz"],
    ["l"],
    ["x"],
    ["c"],
    ["v"],
    ["b"],
    ["n"],
    ["m"],
    ["z"],

    ["r","p"],
    ["r","s"],
    ["r","z"],
    ["r","d"],
    ["r","f"],
    ["r","g"],
    ["r","zj"],
    ["r","sz"],
    ["r","x"],
    ["r","c"],
    ["r","v"],
    ["r","b"],
    ["r","n"],
    ["r","m"],

    ["t","s"],
    ["r","z"],

    ["p","s"],
    ["r","z"],
    ["p","d"],
    ["p","t"],

    ["s","t"],
    ["s","p"],
    ["s","d"],
    ["s","g"],
    ["s","c"],

    ["z","t"],
    ["z","p"],
    ["z","d"],
    ["z","c"],

    ["d","s"],
    ["d","z"],

    ["f","t"],
    ["f","s"],
    ["f","z"],
    ["f","d"],

    ["g","s"],
    ["g","z"],
    ["g","d"],

    ["zj","t"],
    ["zj","d"],

    ["sz","t"],
    ["sz","p"],
    ["sz","d"],
    ["sz","g"],
    ["sz","c"],

    ["l","t"],
    ["l","p"],
    ["l","s"],
    ["l","z"],
    ["l","d"],
    ["l","f"],
    ["l","g"],
    ["l","zj"],
    ["l","sz"],
    ["l","x"],
    ["l","c"],
    ["l","b"],
    ["l","n"],
    ["l","m"],

    ["x","t"],
    ["x","d"],
    ["x","c"],

    ["c","t"],
    ["c","s"],
    ["c","z"],
    ["c","d"],
    ["c","sz"],

    ["v","t"],
    ["v","s"],
    ["v","z"],
    ["v","d"],
    ["v","f"],
    ["v","zj"],
    ["v","sz"],
    ["v","x"],
    ["v","c"],

    ["b","t"],
    ["b","p"],
    ["b","s"],
    ["b","z"],
    ["b","d"],
    ["b","f"],
    ["b","sz"],
    ["b","l"],
    ["b","x"],
    ["b","c"],
    ["b","v"],
    ["b","n"],
    ["b","m"],

    ["n","t"],
    ["n","s"],
    ["n","z"],
    ["n","d"],
    ["n","f"],
    ["n","g"],
    ["n","zj"],
    ["n","sz"],
    ["n","x"],
    ["n","c"],
    ["n","v"],

    ["m","t"],
    ["m","p"],
    ["m","s"],
    ["m","z"],
    ["m","d"],
    ["m","f"],
    ["m","g"],
    ["m","zj"],
    ["m","sz"],
    ["m","x"],
    ["m","c"],
    ["m","v"],
    ["m","b"],
]

document.addEventListener("DOMContentLoaded", init);

function init() {
    const glyphSpace = document.getElementById("glyph-space");
    const input = document.getElementById("text");
    const button = document.getElementById("button");
    const feedback = document.getElementById("feedback");
    var prompt = null;

    glyphSpace.addEventListener("click", () => {
        glyphSpace.textContent = "";
        prompt = generatePrompt("block");
        for (const syllable of prompt.syllables) {
            glyphSpace.appendChild(buildSyllable(syllable));
        }
        input.value = ""
        }
    );

        button.addEventListener('click',() => {
            if (prompt.romanization === parseRomanization(input.value)) {
                feedback.textContent = '';
                feedback.appendChild(buildComplete({open: ['y'], vowel: ['e'], close: ['s']}))
                feedback.style.backgroundColor = '#90d390';
            } else {
                feedback.textContent = '';
                feedback.appendChild(buildNoClose({open: ['n'], vowel: ['o']}))
                feedback.style.backgroundColor = '#fca1a1';
            }
        })

};

function generatePrompt(method) {

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
        syllables.push(generateSyl(method));
    }

    var romanization = romanize(syllables);

    return {
        syllables: [...syllables],
        romanization: romanization
    }

}

function generateSyl(method) {

    if (method === "phonemic") {

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

    if (method === "block") {

        var vowel = [];
        var open = [];
        var close = [];

        random = randomInteger(0,26);

        if (random < 9) vowel = [...vowelBlocks[random]];
        else vowel = [...vowelBlocks[random - 9]];

        if (randomInteger(0,1)) {

            var random = randomInteger(0,92);
            if (random < 19) open = [...openConBlocks[random]];
            else open = [...openConBlocks[random - 19]];

            if (randomInteger(0,1)) {
                random = randomInteger(0,148);

                if (random < 18) close = [...closeConBlocks[random]];
                else close = [...closeConBlocks[random - 18]];
        }
        

        }


        return {
            open: [...open],
            vowel: [...vowel],
            close: [...close]
        }
    }
    
}

function buildComplete({ open, vowel, close }) {
    const glyphDiv = e("div",["complete-syllable"]);
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

function buildNoClose({ open, vowel }) {
    const glyphDiv = e("div",["no-close-syllable"]);
    glyphDiv.appendChild(e("div",["bound"]));
    const lateralPanels = glyphDiv.appendChild(e("div",["no-close-lateral-panels"]));

    const leftPanel = lateralPanels.appendChild(e("div",["no-close-left-panel"]));
    open.forEach((phoneme) => {
        const img = e("img",["phoneme"]);
        img.src = `resources/symbols\ tall/${phoneme}.png`;
        leftPanel.appendChild(img);
    })

    const rightPanel = lateralPanels.appendChild(e("div",["no-close-right-panel"]));
    const img = e("img",["phoneme"]);
    img.src = `resources/symbols\ tall/${vowel[0]}.png`;
    rightPanel.appendChild(img);

    return glyphDiv;
}

function buildNoCloseDoubleVowel({ open, vowel }) {
    const glyphDiv = e("div",["ncdv-syllable"]);
    glyphDiv.appendChild(e("div",["bound"]));

    const lateralPanels = glyphDiv.appendChild(e("div",["ncdv-lateral-panels"]));
    const leftPanel = lateralPanels.appendChild(e("div",["ncdv-left-panel"]));
    open.forEach(phoneme => {
        const img = e("img",["phoneme"]);
        img.src = `resources/symbols\ tall/${phoneme}.png`;
        leftPanel.appendChild(img);
    })

    const rightPanel = lateralPanels.appendChild(e("div",["ncdv-right-panel"]));

    const topPanel = rightPanel.appendChild(e("div",["ncdv-right-top-panel"]));
    const imgTop = e("img",["phoneme"]);
    imgTop.src = `resources/symbols\ short/${vowel[0]}.png`;
    topPanel.appendChild(imgTop);

    rightPanel.appendChild(e("div",["bound"]));
    const bottomPanel = rightPanel.appendChild(e("div",["ncdv-right-bottom-panel"]));
    const imgBottom = e("img",["phoneme"]);
    imgBottom.src = `resources/vowels\ bottom\ right/${vowel[1]}.png`;
    bottomPanel.appendChild(imgBottom);

    return glyphDiv;
}

function buildVowel(vowel) {
    const glyphDiv = e("div",["vowel-syllable"]);

    glyphDiv.appendChild(e("div",["bound"]));

    const panel = glyphDiv.appendChild(e(`div`,["vowel-panel"]));
    const img = panel.appendChild(e(`img`,[`phoneme`]));
    img.src = `resources/symbols\ tall/${vowel}.png`;

    return glyphDiv;
}

function buildDoubleVowel(vowels) {
    const glyphDiv = e(`div`,[`dv-syllable`]);

    glyphDiv.appendChild(e(`div`,[`bound`]));

    const topPanel = glyphDiv.appendChild(e(`div`,[`dv-top-panel`]));
    const topImg = topPanel.appendChild(e(`img`,[`phoneme`]));
    topImg.src = `resources/symbols\ short/${vowels[0]}.png`;

    glyphDiv.appendChild(e(`div`,[`bound`]));

    const bottomPanel = glyphDiv.appendChild(e(`div`,[`dv-bottom-panel`]));
    const bottomImg = bottomPanel.appendChild(e(`img`,[`phoneme`]));
    bottomImg.src = `resources/vowels\ bottom\ right/${vowels[1]}.png`;

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

function identifySylType({open, vowel, close}) {
    var sylType = "error";

    if (open.length &&
        vowel.length &&
        close.length) sylType = "complete";

    if (open.length &&
        (vowel.length === 1) &&
        !close.length) sylType = "no close";

        if (open.length &&
            (vowel.length === 2) &&
            !close.length) sylType = "no close double vowel";

    if (!open.length &&
        vowel.length &&
        close.length) sylType = "no open";

    if (!open.length &&
        (vowel.length === 1) &&
        !close.length) sylType = "vowel";

    if (!open.length &&
        (vowel.length === 2) &&
        !close.length) sylType = "double vowel";

    if (!vowel.length &&
        (open.length || close.length)) sylType = "consonant";

    return sylType;
}

function buildSyllable(syllable) {
    const sylType = identifySylType(syllable);
    console.log(sylType);

    if (sylType === "complete") return buildComplete(syllable);
    if (sylType === "no close") return buildNoClose(syllable);
    if (sylType === "no close double vowel") return buildNoCloseDoubleVowel(syllable);
    if (sylType === "vowel") return buildVowel(syllable.vowel[0]);
    if (sylType === "double vowel") return buildDoubleVowel(syllable.vowel);
}

function parseRomanization(text) {
    text = text.replace(/ /g,'');
    text = text.replace(/(q|k)/gi,'c');
    return text.toLowerCase();
}