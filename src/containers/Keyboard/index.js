import React, {Component} from 'react'
import KRow from '../../components/KRow'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as KActions from '../../actions/KeyboardActions'

@connect(mapStateToProps, mapDispatchToProps)
export default class Keyboard extends Component {
    /**
     * @constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.rowTimer = null;
        this.cellTimer = null;
        this.activeRow = 0;
        this.activeCell = -1;

        let lang = props.params.lang || 'ru';
        let {lang:{letters}} = require('../../../language/' + lang);

        this.lang = lang;
        this.letters = letters;
    }

    resetCell(){
        this.activeCell = -1;
    }

    resetRow(){
        this.activeRow = 0;
    }

    startRowCircle(){
        let {setNextRow} = this.props.KActions;
        if(this.cellTimer)
        {
            clearInterval(this.cellTimer);
            this.cellTimer = 0;
            this.activeCell = -1;
        }

        this.rowTimer = setInterval(() => {
            setNextRow(++this.activeRow, this.activeCell);
        }, 1000);
    }

    startCellCircle(){
        clearInterval(this.rowTimer);
        this.rowTimer = 0;

        let {setNextRow} = this.props.KActions;
        this.cellTimer = setInterval(() => {
            setNextRow(this.activeRow, ++this.activeCell);
        }, 1000);
    }

    componentDidMount(){
        this.startRowCircle();
    }

    switchOrSelect(){
        console.log(this.rowTimer, this.cellTimer);
        if(this.rowTimer)
        {
            this.startCellCircle();
        }
        else if(this.cellTimer)
        {
            //находим выбранную букву и продолжаем
            let {addLetter} = this.props.KActions;
            let lat = this.letters[this.activeRow][this.activeCell];
            addLetter(lat);
            this.activeRow--;
            this.startRowCircle();
        }
    }

    render() {
        return (
            <div>
                <div className='font output'>
                    <span id='output'>{this.props.phrase}</span><span id='cursor'></span>
                </div>
                <table onClick={::this.switchOrSelect}>
                    <KRow
                        resetC={::this.resetCell}
                        resetR={::this.resetRow}
                        rows={this.letters}
                        activeRow={this.props.row}
                        activeCell={this.props.cell}
                    />
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        row: state.Keyboard.row,
        cell: state.Keyboard.cell,
        phrase: state.Keyboard.phrase
    }
}

function mapDispatchToProps(dispatch) {
    return {
        KActions: bindActionCreators(KActions, dispatch)
    }
}