import React from "react";
import { BaseChart } from "./chart";

export class TableChart extends BaseChart {
  declares() {
    return {
      datasourceName: { type: "ControlDatasourceSelector" }
    };
  }
  render() {
    let rows = this.state.table.rows;
    let headers = this.state.table.header;
    // console.log("table:", rows);
    if (this.state.table) {
      return (
        <div style={{ width: this.props.width, height: this.props.header }}>
          <table>
            <tbody>
            <tr >
              {headers.map(h => <td key={`header_${h}`}>{h}</td>)}
            </tr>
            {rows.map(row => (
              <tr key={`row_${row[headers[0]]}`}>
                {headers.map(h => <td key={`cell_${headers[0]}_${h}`}>{row[h]}</td>)}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  }
}
