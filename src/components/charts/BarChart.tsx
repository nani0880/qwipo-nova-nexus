import React from 'react';
import { ChartData } from '@/services/dashboardService';

interface BarChartProps {
  data: ChartData;
  height?: number;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, height = 300, className = '' }) => {
  const maxValue = Math.max(...data.datasets.flatMap(d => d.data));
  const padding = 20;
  const barWidth = 60;
  const barSpacing = 20;

  const getY = (value: number) => {
    return height - padding - (value / maxValue) * (height - 2 * padding);
  };

  const getX = (index: number) => {
    return padding + index * (barWidth + barSpacing) + barWidth / 2;
  };

  return (
    <div className={`relative ${className}`}>
      <svg width="100%" height={height} className="overflow-visible">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <g key={index}>
            <line
              x1={padding}
              y1={padding + ratio * (height - 2 * padding)}
              x2={400 - padding}
              y2={padding + ratio * (height - 2 * padding)}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
            <text
              x={padding - 10}
              y={padding + ratio * (height - 2 * padding) + 4}
              textAnchor="end"
              className="text-xs fill-muted-foreground"
            >
              {Math.round(ratio * maxValue).toLocaleString()}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.datasets.map((dataset, datasetIndex) => (
          <g key={datasetIndex}>
            {dataset.data.map((value, index) => {
              const x = getX(index) - barWidth / 2;
              const y = getY(value);
              const barHeight = height - padding - y;

              return (
                <g key={index}>
                  {/* Bar */}
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={dataset.color}
                    rx="4"
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                  
                  {/* Value label */}
                  <text
                    x={x + barWidth / 2}
                    y={y - 8}
                    textAnchor="middle"
                    className="text-xs font-medium fill-foreground"
                  >
                    {value.toLocaleString()}
                  </text>
                </g>
              );
            })}
          </g>
        ))}

        {/* X-axis labels */}
        {data.labels.map((label, index) => (
          <text
            key={index}
            x={getX(index)}
            y={height - 5}
            textAnchor="middle"
            className="text-xs fill-muted-foreground"
          >
            {label}
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        {data.datasets.map((dataset, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: dataset.color }}
            />
            <span className="text-sm text-muted-foreground">{dataset.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
