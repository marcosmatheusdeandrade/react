const Todo = require('./todo')

Todo.methods(['get', 'post', 'put', 'delete']) //definida quais metodos estão disponiveis na APi
Todo.updateOptions({new: true, runValidators: true})
// new: para ao executar put retorne o cliente atualizado, o mongo retorna por padrão o antigo 'rsrs'
// runValidators: vai executar as validações na no definidas no schema no update tbm, ex: required

module.exports = Todo