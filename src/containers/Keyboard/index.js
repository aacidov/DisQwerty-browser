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

        this.lang = props.params.lang || 'ru';
        this.interval = 1000;
        this.cellCount = letters[0].length;
    }

    setLetters(){
        let {lang:{letters}} = require('../../../language/' + this.lang);
        letters = letters.map((l) => '↑' + l);
        let {setLetters} = this.props.KActions;
        setLetters(letters);
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
            this.resetTimers();
            this.activeCell = -1;
        }

        this.rowTimer = setInterval(() => {
            setNextRow(++this.activeRow, this.activeCell);
        }, this.interval);
    }

    startCellCircle(){
        this.resetTimers();
        let {setNextRow} = this.props.KActions;
        this.cellTimer = setInterval(() => {
            ++this.activeCell;
            if(this.letters[this.activeRow][this.activeCell] === ' ')
            {
                this.activeCell = 0;
            }
            setNextRow(this.activeRow, this.activeCell);
        }, this.interval);
    }

    resetTimers(){
        clearInterval(this.cellTimer);
        clearInterval(this.rowTimer);
        this.cellTimer = 0;
        this.rowTimer = 0;
    }

    componentDidMount(){
        this.startRowCircle();
    }

    switchOrSelect(){
        if(this.rowTimer)
        {
            this.startCellCircle();
        }
        else if(this.cellTimer)
        {
            //находим выбранную букву и продолжаем
            let {
                addLetter,
                removeLastLetter,
                removeAll,
                removeLastWord
            } = this.props.KActions;
            let lett = this.letters[this.activeRow][this.activeCell];
            switch (lett)
            {
                case '↑':
                    this.activeRow = 0;
                    break;
                case '⇽':
                    removeLastLetter();
                    break;
                case '✖':
                    removeAll();
                    break;
                case '⤆':
                    removeLastWord();
                    break;
                case '↔':
                    addLetter(' ');
                    this.activeRow--;
                    break;
                default:
                    addLetter(lett);
                    this.activeRow--;
            }

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
        phrase: state.Keyboard.phrase,
        predict: state.Keyboard.predict
    }
}

function mapDispatchToProps(dispatch) {
    return {
        KActions: bindActionCreators(KActions, dispatch)
    }
}