const data = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is Redux?',
                answer: 'A library for storing the states'
            },
            {
                question: 'What is HTML?',
                answer: 'Hyper Text Markup Language'
            },
            {
                question: 'What is JSX?',
                answer: 'A JS extension for writing HTML like syntax in JS'
            },
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

function wait(n) {
    return new Promise((resolve) => {
        setTimeout(resolve, n);
    });
}

export function getDecks() {
    return new Promise(async function executor(resolve, reject) {
        await wait(1000);
        for (let item in data) {
            data[item].id = item
        }
        resolve(data);
    });
}

export function getDeck(id) {
    return new Promise(async function executor(resolve, reject) {
        await wait(1000);
        resolve(
            data[id] ? data[id] : {}
        );
    })
}

export function addCard(deckId, card) {
    return new Promise(async function executor(resolve, reject) {
        await wait(500);
        data[deckId].questions.push(card);
        resolve(card);
    });
}