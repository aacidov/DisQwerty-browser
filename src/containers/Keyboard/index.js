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
        this.activeRow = 0;
        this.activeCell = 0;
    }

    resetCell(){
        this.activeCell = 0;
    }

    resetRow(){
        this.activeRow = 0;
    }

    startRowCircle(){
        let {setNextStep} = this.props.KActions;
        this.rowTimer = setInterval(() => {
            setNextStep(++this.activeRow, ++this.activeCell);
        }, 1000);
    }

    componentDidMount(){
        // this.startRowCircle();
    }

    render() {
        let lang = this.props.params.lang || 'ru';
        let {lang:{letters}} = require('../../../language/' + lang);

        return (
            <table>
                <KRow
                    resetC={::this.resetCell}
                    resetR={::this.resetRow}
                    rows={letters}
                    activeRow={this.activeRow}
                    activeCell={this.activeCell}
                />
            </table>
        )
    }
}

function mapStateToProps(state) {
    return {
        row: state.row,
        cell: state.cell
    }
}

function mapDispatchToProps(dispatch) {
    return {
        KActions: bindActionCreators(KActions, dispatch)
    }
}