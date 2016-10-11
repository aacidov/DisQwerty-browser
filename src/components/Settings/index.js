import React, {Component} from 'react'

export default class Settings extends Component {
    render() {
        let {value, changeSpeed} = this.props;
        return (<div className='row'>
            <div className='col-lg-offset-1 col-lg-5 border'>
                <form className='normal-font form-inline' onSubmit={(e) => e.preventDefault()}>
                    <label className='col-lg-3' htmlFor='speed'>Скорость</label>
                    <div className='col-lg-7'>
                        <div className='form-group'>
                            <input type='number' onChange={changeSpeed} id='speed' className='form-control' value={value}/>
                            &nbsp;&nbsp;{(value/1000).toFixed(1)} c.
                        </div>
                    </div>
                </form>
            </div>
        </div>)
    }
}