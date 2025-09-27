import React from 'react';
import { ChartData } from '@/services/dashboardService';

interface LineChartProps {
  data: ChartData;
  height?: number;
  className?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, height = 300, className = '' }) => {
  const maxValue = Math.max(...data.datasets.flatMap(d => d.data));
  const minValue = Math.min(...data.datasets.flatMap(d => d.data));
  const range = maxValue - minValue;
  const padding = 20;

  const getY = (value: number) => {
    return height - padding - ((value - minValue) / range) * (height - 2 * padding);
  };

  const getX = (index: number) => {
    return (index / (data.labels.length - 1)) * (400 - 2 * padding) + padding;
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
              {Math.round(minValue + (1 - ratio) * range).toLocaleString()}
            </text>
          </g>
        ))}

        {/* Data lines */}
        {data.datasets.map((dataset, datasetIndex) => {
          const points = dataset.data.map((value, index) => ({
            x: getX(index),
            y: getY(value)
          }));

          const pathData = points.reduce((path, point, index) => {
            const command = index === 0 ? 'M' : 'L';
            return `${path} ${command} ${point.x} ${point.y}`;
          }, '');

          return (
            <g key={datasetIndex}>
              {/* Area under the curve */}
              <path
                d={`${pathData} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
                fill={`url(#gradient-${datasetIndex})`}
                opacity="0.1"
              />
              
              {/* Line */}
              <path
                d={pathData}
                fill="none"
                stroke={dataset.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-sm"
              />
              
              {/* Data points */}
              {points.map((point, pointIndex) => (
                <circle
                  key={pointIndex}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={dataset.color}
                  stroke="white"
                  strokeWidth="2"
                  className="hover:r-6 transition-all duration-200"
                />
              ))}
            </g>
          );
        })}

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

        {/* Gradients */}
        <defs>
          {data.datasets.map((dataset, index) => (
            <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={dataset.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={dataset.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        {data.datasets.map((dataset, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: dataset.color }}
            />
            <span className="text-sm text-muted-foreground">{dataset.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
