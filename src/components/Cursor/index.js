import React, {Component} from 'react'

export default class Cursor extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: true};
        this.cursorTimer = null;
    }

    componentDidMount(){
        var visible = true;
        this.cursorTimer = setInterval(() => {
            visible = !visible;
            this.setState({visible: visible});
        }, 500);
    }

    componentWillUnmount() {
        clearInterval(this.cursorTimer);
    }

    render() {
        return (<span className={this.state.visible ? 'cursor black' : 'cursor white'}>|</span>)
    }
}