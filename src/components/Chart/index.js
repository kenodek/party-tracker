import React, { useState, useEffect, memo } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import "./index.scss";
import { getText } from "../../utils/functions";

const Charts = memo(({ partyParticipants }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(prepareData(partyParticipants));
  }, [partyParticipants]);

  const prepareData = (partyParticipants) => {
    const children = { name: "Dzieci", value: 0 };
    const adults = { name: "Dorośli", value: 0 };

    [...partyParticipants].forEach((participant, index) => {
      if (participant.isMature === "true") {
        adults.value = adults.value + 1;
      } else {
        children.value = children.value + 1;
      }
    });

    return [{ ...children }, { ...adults }];
  };

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="container-summary">
      <div className="text-summary">Podsumowanie</div>
      <ResponsiveContainer width={400} height={300}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={200}
            cy={150}
            innerRadius={60}
            outerRadius={80}
            fill="dodgerblue"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

export default Charts;

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="white">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="#ffeb3b"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill="white"
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={"white"}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={"white"} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="white"
      >
        {getText(value)}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="white"
      >
        {` ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};
