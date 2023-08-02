module.exports = [
    {
        input: "server/index.js",
        output: {
            file: "build/server.js",
            format: "cjs"
        }
    },
    {
        input: "src/index.js",
        output: {
            file: "build/client.js",
            format: "esm"
        }
    }
]