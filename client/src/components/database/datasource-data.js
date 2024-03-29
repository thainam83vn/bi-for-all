import React from "react";
// import {
//   Table,
//   TableBody,
//   TableHeader,
//   TableHeaderColumn,
//   TableRow,
//   TableRowColumn
// } from "material-ui/Table";
import HotTable from 'react-handsontable';
import { BaseComponent } from "./../base-component";
import { Datasource } from "./../../models/datasource-model";
export class DatasourceData extends BaseComponent {
  datasource: Datasource;
  constructor(props) {
    super(props);
    this.state = {
      table: null
    };
  }

  componentDidMount(){
    this.refresh(this.props.datasource);
  }

  refresh(ds) {
    this.datasource = ds;
    this.datasource.onChange.subcribe(()=>{
      this.refreshData();
    });
    this.refreshData();
  }

  refreshData() {
    this.setState({
      table: this.datasource.data
    });
  }

  setDatasource(d: Datasource) {
    this.setState({
      datasource: d
    });
  }
  render() {
    if (this.state.table) {
      let data = [
        this.state.table.header,
        ...this.state.table.rows.map(r=>Object.values(r))
      ]
      console.log("datasource-data", this.state.table,data);      
      return (
        <HotTable root="hot" data={data}  colHeaders={false} settings={{fixedRowsTop:1}} rowHeaders={true} width="600" height="300" stretchH="all" />
        // <Table>
        //   <TableHeader>
        //     <TableRow>
        //       {this.state.table.header.map(h => (
        //         <TableHeaderColumn key={h}>{h}</TableHeaderColumn>
        //       ))}
        //     </TableRow>
        //   </TableHeader>
        //   <TableBody>
        //     {this.state.table.rows.map(r => (
        //       <TableRow key={r.index}>
        //         {this.state.table.header.map(h => (
        //           <TableRowColumn key={h + r.index}>{typeof r[h]==="object"?JSON.stringify(r[h]):r[h]}</TableRowColumn>
        //         ))}
        //       </TableRow>
        //     ))}
        //   </TableBody>
        // </Table>
      );
    }
    return null;
  }
}
