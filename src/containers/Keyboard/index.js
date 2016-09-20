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
        this.firstRow = 0;
    }

    setLetters(){
        let {lang:{letters}} = require('../../../language/' + this.lang);
        this.letters = letters.map((l) => '↑' + l);
        let {setLetters} = this.props.KActions;
        setLetters(this.letters);
        this.cellCount = this.letters[0].length;


    }

    resetCell(){
        this.activeCell = -1;
    }

    resetRow(){
        this.activeRow = this.firstRow;
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

    spaceEvent(e){
        if(e.which == 32)
        {
            this.switchOrSelect();
        }
    }

    componentDidMount(){
        this.setLetters();
        this.startRowCircle();
        window.addEventListener('keydown', ::this.spaceEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', ::this.spaceEvent);
        this.resetTimers();
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
                removeLastWord,
                predict
            } = this.props.KActions;
            let lett = this.letters[this.activeRow][this.activeCell];
            switch (lett)
            {
                case '↑':
                    this.activeRow = this.firstRow;
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
            predict(this.lang);
        }
    }

    render() {
        let letters = this.props.letters;
        //@todo как-то не очень хорошо, возможно, стоит переделать массив букв в объект
        if(this.props.predict.length)
        {
            if(typeof  letters[0] === 'string')
            {
                letters.unshift(this.props.predict);
            }
            else
            {
                letters[0] = this.props.predict;
            }
        }

        return (
            <div>
                <div className='font output'>
                    <span id='output'>{this.props.phrase}</span><span id='cursor'></span>
                </div>
                <table onClick={::this.switchOrSelect}>
                    <KRow
                        predict={this.props.predict.length > 0}
                        resetC={::this.resetCell}
                        resetR={::this.resetRow}
                        rows={letters}
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
        predict: state.Keyboard.predict,
        letters: state.Keyboard.letters
    }
}

function mapDispatchToProps(dispatch) {
    return {
        KActions: bindActionCreators(KActions, dispatch)
    }
}