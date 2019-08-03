import React, {Component} from 'react';
import api from '../../services/api';
import logo from '../../svg/logo.svg';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBoxOpen} from '@fortawesome/free-solid-svg-icons';

import './style.css';

export default class Main extends Component {

    state = {
        newBox: '',
        boxes: [],
    };

    async componentDidMount() {
        const boxes = await api.get('boxes/list');
        this.setState({boxes: boxes.data});
        console.log(this.state.boxes);
    }

    handleSubmit = async e => {
        e.preventDefault();

        const response = await api.post('boxes', {
            title: this.state.newBox,
        });

        this.props.history.push(`/box/${response.data._id}`);
    };

    handleInputChange = (e) => {
        this.setState({newBox: e.target.value});
    };

    render() {
        return (
            <div id="main-container">
                <div id="form-container">
                    <form onSubmit={this.handleSubmit}>
                        <img src={logo} alt=""/>
                        <input
                            placeholder="Nome da box"
                            value={this.state.newBox}
                            onChange={this.handleInputChange}
                        />
                        <button type="submit">Criar</button>
                    </form>
                </div>
                {this.state.boxes.length ? (
                    <div id="boxes-container">
                        <ul>
                            {this.state.boxes.map(box => (
                                <li key={box._id}>
                                    <a className="box-info" href={box.url} rel="noopener">
                                        <span><FontAwesomeIcon icon={faBoxOpen}/> {box.title}</span>
                                        <span className="box-file-count">Arquivos: {box.files.length}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : ''}
            </div>
        );
    }
}
