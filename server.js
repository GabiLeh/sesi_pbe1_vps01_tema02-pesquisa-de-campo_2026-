const express = require("express")
const cors = require("cors")
const sistemas = require("./dados.json")

function autoIncrement() {
    return Number(sistemas[sistemas.length - 1].id) + 1
}

const rotaInicial = (req, res) => {
    res.json(sistemas)
}

const createSistema = (req, res) => {
    const sistema = req.body
    sistema.id = autoIncrement()
    sistemas.push(sistema)
    res.status(201).json(sistema)
}

const readSistema = (req, res) => {
    res.json(sistemas)
}

const buscaSistema = (req, res) => {
    const sistema = sistemas.find(p => p.id == Number(req.params.id))
    if (sistema) res.json(sistema)
    else res.status(404).json("Id não encontrado")
}

const updateSistema = (req, res) => {
    const id = req.params.id
    const dados = req.body
    dados.id = Number(id)
    let status = 0

    sistemas.forEach((sistema, indice) => {
        if (sistema.id == id) {
            sistemas[indice] = dados
            status = 1
        }
    })

    if (status == 1) {
        res.status(202).json(dados)
    } else {
        res.status(404).send("Sistema não encontrado")
    }
}

const deleteSistema = (req, res) => {
    const id = req.params.id
    let status = 0

    sistemas.forEach((sistema, indice) => {
        if (sistema.id == id) {
            sistemas.splice(indice, 1)
            status = 1
        }
    })

    if (status == 1) {
        res.json("Sistema excluído com sucesso")
    } else {
        res.status(404).send("Sistema não encontrado")
    }
}

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000

app.get('/', rotaInicial)
app.post('/sistemas', createSistema)
app.get('/sistemas', readSistema)
app.get('/sistemas/:id', buscaSistema)
app.put('/sistemas/:id', updateSistema)
app.delete('/sistemas/:id', deleteSistema)

app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})