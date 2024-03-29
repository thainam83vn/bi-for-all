import React from "react";
import { BaseComponent } from "./../base-component";
import { Shape } from "./shape";
import { ChartDynamic } from "./../charts/chart-dynamic";
import { BaseChart } from "./../charts/chart";
import { EntityService } from "../../services/entity-service";
const styles = {
  main: {
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "auto"
  }
};

export class ChartShape extends Shape {
  chartData = null;
  chartView: BaseChart;
  constructor(props) {
    super(props);
    this.chartData = this.props.data.inner;
    // this.chartData.width = this.props.data.style.width;
    // this.chartData.height = this.props.data.style.height;
    this.state.loading = false;
  }

  data() {
    let r = super.data();
    r.chart = this.chartData;
    return r;
  }

  ovrDeclareStyle() {
    super.ovrDeclareStyle();
  }

  ovrRectChanged() {
    super.ovrRectChanged();
    this.setState({ loading: true });
    this.refreshChart();
  }

  setChartData(chartData) {
    this.setState({ loading: true });
    setTimeout(() => {
      this.props.data.inner.attributes = chartData;
      console.log("updateChartData:", this.props.data.chart);

      this.setState({ loading: false });
    }, 200);
  }

  refreshChart() {
    if (this.state.loading) {
      if (this.isMouseDown) {
        setTimeout(() => {
          this.refreshChart();
        }, 100);
      } else {
        this.reloadChart();
      }
    }
  }

  reloadChart() {
    // this.chartData.width = this.props.data.style.width;
    // this.chartData.height = this.props.data.style.height;

    setTimeout(() => {
      this.setState({ loading: false });
    }, 200);
  }

  ovrInner() {
    return (
      <div style={styles.main}>
        {this.state.loading && <span>moving...</span>}
        {!this.state.loading && (
          <ChartDynamic
            id={this.props.id}
            onInit={(e)=>{this.ovrInitChild("chartView", e)}}
            type={this.chartData.type}
            chart={this.chartData}
            width={this.props.data.style.width}
            height={this.props.data.style.height}
            onChange={(e) => { if (this.props.onChange) this.props.onChange(e) }}
          />
        )}
      </div>
    );
  }
}
