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
        // this.startRowCircle();
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
            this.activeRow = 0;
            this.startRowCircle();
        }
    }

    render() {
        let lang = this.props.params.lang || 'ru';
        let {lang:{letters}} = require('../../../language/' + lang);

        return (
            <table onClick={::this.switchOrSelect}>
                <KRow
                    resetC={::this.resetCell}
                    resetR={::this.resetRow}
                    rows={letters}
                    activeRow={this.props.row}
                    activeCell={this.props.cell}
                />
            </table>
        )
    }
}

function mapStateToProps(state) {
    return {
        row: state.Keyboard.row,
        cell: state.Keyboard.cell
    }
}

function mapDispatchToProps(dispatch) {
    return {
        KActions: bindActionCreators(KActions, dispatch)
    }
}