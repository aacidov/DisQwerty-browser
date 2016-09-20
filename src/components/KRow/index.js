import React, {Component} from 'react'

export default class KRow extends Component {

    render() {
        let {
            rows,
            activeRow,
            activeCell,
            resetC,
            resetR
        } = this.props;

        if(activeRow === rows.length)
        {
            resetR();
            activeRow = 0;
        }

        if(activeCell !== -1 && activeCell === rows[activeRow].length)
        {
            resetC();
            activeCell = 0;
        }

        return (
            <tbody>
            {rows.map((set, i) =>
                <tr className={activeRow === i && activeCell === -1 ? 'selected' : null} key={i}>
                    { typeof set === 'string' ?
                        set.split('').map((l, j) =>
                        <td className={activeCell === j && activeRow === i ? 'selected' : null} key={j}>{l}</td>)
                        :
                        set.map((l, j) =>
                            <td colSpan='5' className={activeCell === j && activeRow === i ? 'selected' : null} key={j}>{l}</td>)
                    }


                </tr>
            )}
            </tbody>
        )
    }
}