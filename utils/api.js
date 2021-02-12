const data = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            }
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