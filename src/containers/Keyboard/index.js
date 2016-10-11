import React, {Component} from 'react'
import KRow from '../../components/KRow'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as KActions from '../../actions/KeyboardActions'
import Cursor from '../../components/Cursor'
import Settings from '../../components/Settings'

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
        this.firstRow = 0;
        this.output = null;
    }

    setLetters(){
        let {lang:{letters}} = require('../../../language/' + this.lang);
        let {setLetters} = this.props.KActions;
        setLetters(letters.map((l) => '↑' + l));
    }

    resetCell(){
        this.activeCell = -1;
    }

    resetRow(){
        this.activeRow = this.firstRow;
    }

    changeSpeed(e){
        let {changeSpeed} = this.props.KActions;
        changeSpeed(parseInt(e.target.value), () => {
            this.startRowCircle(e.target.value);
        });
    }

    startRowCircle(speed = this.props.speed){
        let {setNextRow} = this.props.KActions;
        if(this.cellTimer)
        {
            this.activeCell = -1;
        }
        this.resetTimers();

        this.rowTimer = setInterval(() => {
            setNextRow(++this.activeRow, this.activeCell);
        }, speed);
    }

    startCellCircle(){
        this.resetTimers();
        let {setNextRow} = this.props.KActions;
        this.cellTimer = setInterval(() => {
            ++this.activeCell;
            if(this.props.letters && this.props.letters[this.props.row]
                && this.props.letters[this.props.row][this.props.cell] === ' ')
            {
                this.activeCell = 0;
            }
            setNextRow(this.activeRow, this.activeCell);
        }, this.props.speed);
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
                predict,
                addPredict
            } = this.props.KActions;
            let lett = this.props.letters[this.props.row][this.props.cell];
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
                    if(lett.length === 1)
                    {
                        addLetter(lett);
                    }
                    else
                    {
                        addPredict(lett, this.props.predict.pos);
                    }
                    this.activeRow--;
                    this.scrollOutput();
            }

            this.startRowCircle();
            predict(this.lang);
        }
    }

    scrollOutput(){
        if(this.output)
        {
            this.output.scrollTop = this.output.scrollHeight;
        }
    }

    render() {
        let letters = this.props.letters;
        return (
            <div>
                <div className='row'>
                    <div ref={(e)=>{this.output = e}} className='font output col-lg-offset-1 col-lg-12'>
                        <span id='output'>{this.props.phrase}</span><Cursor/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-10'>
                        <table onClick={::this.switchOrSelect}>
                            <KRow
                                predict={this.props.predict.text.length > 0}
                                resetC={::this.resetCell}
                                resetR={::this.resetRow}
                                rows={letters}
                                activeRow={this.props.row}
                                activeCell={this.props.cell}
                            />
                        </table>
                    </div>
                    <Settings changeSpeed={::this.changeSpeed} value={this.props.speed}/>
                </div>

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
        letters: state.Keyboard.letters,
        speed: state.Keyboard.speed
    }
}

function mapDispatchToProps(dispatch) {
    return {
        KActions: bindActionCreators(KActions, dispatch)
    }
}