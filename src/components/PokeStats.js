import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import {
  CHART_COLORS,
  CHART_COLORS_ALPHA,
  COLORS_BY_TYPE
} from "../constants/chart";
import { DEFAULT_STATS } from "../constants/stats";
Chart.register(...registerables);

const options = {
  indexAxis: "y",
  responsive: true,
  scales: {
    x: {
      suggestedMax: 120,
      grid: { display: false }
    }
  }
};

function PokeStats({ type, stats = DEFAULT_STATS }) {
  const canvaRef = useRef(null);
  const chartRef = useRef(null);

  // Create the chart object
  useEffect(() => {
    const canva = canvaRef.current;
    const ctx = canva.getContext("2d");
    const chart = new Chart(ctx, { type: "bar", options });
    chartRef.current = chart;
    return () => chart.destroy();
  }, []);

  // Update the chart data
  useEffect(() => {
    const barChart = chartRef.current;
    const color = COLORS_BY_TYPE[type] || "grey";
    barChart.data = {
      labels: stats.map(({ name }) => name),
      datasets: [
        {
          label: "Stats Base",
          backgroundColor: CHART_COLORS_ALPHA[color],
          borderColor: CHART_COLORS[color],
          borderWidth: 1,
          data: stats.map(({ base }) => base)
        }
      ]
    };

    barChart.update();
  }, [type, stats]);

  // Render the canvas
  return <canvas ref={canvaRef} />;
}

export default PokeStats;
