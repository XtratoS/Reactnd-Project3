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
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
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
    },
    js4253: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    js452542: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    js567: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    js154: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    js55: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    js168: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    js153: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    js357: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    js789: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    js543: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    js21: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
}

function wait(n) {
    return new Promise((resolve) => {
        setTimeout(resolve, n);
    });
}

export function getDecks() {
    return new Promise(async function executor(resolve, reject) {
        await wait(200);
        resolve(data);
    });
}

export function getDeck(id) {
    return new Promise(async function executor(resolve, reject) {
        console.log(id, data[id])
        await wait(100);
        resolve(
            data[id] ? data[id] : {}
        );
    })
}