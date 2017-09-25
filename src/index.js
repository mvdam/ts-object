function readFile(path) {
    return new Promise((resolve, reject) => {
        const fs = require('fs')
        fs.readFile(path, 'utf8', function (err,data) {
            if (err) {
                return reject('Cannot read path!')
            }
            return resolve(data)
        })
    })
}

const contents = readFile('./ts/TodoList.ts')
    .then(content => {
        const { Todo, TodoList } = toTokens(content)
        const todo = {
            id: 'test',
            title: 'test2',
            completed: false
        }

        console.log(equals(todo, Todo))
    })
    .catch(err => {
        throw new Error(err)
    })


function searchString (string, pattern) {
    return string
        .match(new RegExp(pattern.source, pattern.flags))
        .map(match => new RegExp(pattern.source, pattern.flags).exec(match))
}

function typeForDescriptor(descriptor) {
    switch(descriptor) {
        case 'string':
        case 'boolean':
        case 'number':
            return descriptor
        default:
            if (descriptor.indexOf('[]') > 0) {
                return 'array'
            } else {
                return 'object'
            }
    }
}

function toTokens(content) {
    const rx = /(interface|class{1})\s+(\w+)\s?\{((\s*?.*?)*?)}/g
    const blocks = searchString(content, rx);
    const output = {}

    blocks.forEach(block => {
        const [content, type, name, props] = block
        const descriptor = {
            kind: type,
            props: {}
        }

        const tuples = props
            .split('\n')
            .filter(v => v)
            .map(v => v.replace(/\s/g, '').split(':'))
            .forEach(tuple => {
                const [ key, propType ] = tuple
                descriptor.props[key] = typeForDescriptor(propType)
            })

        output[name] = descriptor
    })

    return output
}


function equals(input, type) {
    let match = true

    if (typeof input === 'object') {
        Object.keys(input).forEach(key => {
            if (type.props[key]) {
                if (typeof input[key] !== type.props[key]) {
                    match = false
                }
            } else {
                match = false
            }
        })
    }

    return match
}
