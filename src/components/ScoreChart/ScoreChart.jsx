import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './ScoreChart.less';

export default function ScoreChart({ sessions = [] }) {
  // Sort and process incoming data streams into standardized baseline values
  const chartData = [...sessions]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((session, index) => ({
      name: `S${index + 1}`,
      score: session.feedback?.overallScore || 0,
      fullDate: new Date(session.date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      }),
    }));

  return (
    <div className="score-chart">
      {/* Informational Header Section with structural padding alignment */}
      <header className="score-chart__header">
        <div className="score-chart__text-group">
          <h3 className="score-chart__title">Score Progress</h3>
          <p className="score-chart__subtitle">
            Tracking your technical development stability and posture grading variations across consecutive uploads.
          </p>
        </div>

        {/* Dynamic Context Legend - Explains exactly what X and Y represent */}
        <div className="score-chart__legend" aria-hidden="true">
          <div className="score-chart__legend-item">
            <span className="score-chart__legend-badge score-chart__legend-badge--y" />
            <span className="score-chart__legend-text"><strong>Y-Axis:</strong> Performance Rating (0-10)</span>
          </div>
          <div className="score-chart__legend-item">
            <span className="score-chart__legend-badge score-chart__legend-badge--x" />
            <span className="score-chart__legend-text"><strong>X-Axis:</strong> Session Timeline</span>
          </div>
        </div>
      </header>
      
      <div className="score-chart__container">
        {chartData.length === 0 ? (
          <div className="score-chart__empty">
            <p>No evaluation history found. Complete your first stance analysis to populate performance tracking analytics.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            {/* Added systematic layout margins to avoid clipping label borders */}
            <AreaChart data={chartData} margin={{ top: 15, right: 15, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="scoreGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary, #3b82f6)" stopOpacity={0.20}/>
                  <stop offset="95%" stopColor="var(--color-primary, #3b82f6)" stopOpacity={0.00}/>
                </linearGradient>
              </defs>

              <CartesianGrid 
                strokeDasharray="4 4" 
                vertical={false}
                stroke="var(--chart-grid)" 
              />

              <XAxis 
                dataKey="name" 
                tickLine={false}
                axisLine={false}
                stroke="var(--chart-text)"
                dy={10}
                style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--font-body)' }}
              />

              <YAxis 
                domain={[0, 10]} 
                tickCount={6}
                tickLine={false}
                axisLine={false}
                stroke="var(--chart-text)"
                dx={-5}
                style={{ fontSize: '11px', fontWeight: 500, fontFamily: 'var(--font-body)' }}
              />

              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: 'var(--chart-grid)', strokeWidth: 1.5 }}
              />

              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="var(--color-primary, #3b82f6)" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#scoreGlow)"
                activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--color-primary, #3b82f6)' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="score-chart__tooltip">
        <span className="score-chart__tooltip-date">{payload[0].payload.fullDate}</span>
        <div className="score-chart__tooltip-score-row">
          <span className="score-chart__tooltip-label">Evaluation Score:</span>
          <span className="score-chart__tooltip-value">{payload[0].value}/10</span>
        </div>
      </div>
    );
  }
  return null;
}