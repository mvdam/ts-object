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
            name,
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

function convert(path) {
    return readFile(path)
        .then(content => {
            return toTokens(content)
        })
        .catch(err => {
            throw new Error(err)
        })
}

function getTypeOf(input) {
    const type = typeof input

    switch(type) {
        case 'string':
        case 'number':
        case 'boolean':
            return type
        default:
            if (type === 'object') {
                return isArray(input) ? 'array' : type
            } else {
                return type
            }
    }
}

function isArray(input) {
    return Array.isArray(input)
}

function matchesType(input, type) {
    let match = true

    if (typeof input === 'object') {
        Object.keys(input).forEach(key => {
            if (type.props[key]) {
                if (getTypeOf(input[key]) !== type.props[key]) {
                    match = false
                    console.error(`Type mismatch: Expected property '${key}' to be of type '${type.props[key]}', but got '${getTypeOf(input[key])}'`)
                }
            } else {
                match = false
                console.error(`Type mismatch: Property '${key}' does not exist on type '${type.name}'`)
            }
        })
    }

    return match
}

exports.convert = convert
exports.matchesType = matchesType