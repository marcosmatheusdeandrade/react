import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'
import Todo from '../todo/todo'
import Menu from '../template/menu'
import '../template/custom.css'
import Routes from './routes'

import React from 'react'

export default props => (
    <div className="container">
        <Menu />
        <Routes />
    </div>
)