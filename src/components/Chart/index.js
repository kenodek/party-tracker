import React, { useState, useEffect, memo } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import "./index.scss";
import { getText } from "../../utils/functions";
import { STATUSES } from "../../utils/constants";

const Charts = ({ partyParticipants }) => {
  return (
    <div className="container-summary">
      <div className="text-summary">Podsumowanie</div>
      <ChartByAdultness partyParticipants={partyParticipants} />
      <ChartByStatus partyParticipants={partyParticipants} />
    </div>
  );
};

export default Charts;

const ChartByAdultness = memo(({ partyParticipants }) => {
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
    <ResponsiveContainer width="100%" aspect={2}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          innerRadius={"50%"}
          outerRadius={"55%"}
          fill="dodgerblue"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
});

const ChartByStatus = memo(({ partyParticipants }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(prepareData(partyParticipants));
  }, [partyParticipants]);

  const prepareData = (partyParticipants) => {
    const present = { name: "Przyjdą", value: 0 };
    const absent = { name: "Nie przyjdą", value: 0 };
    const undecided = { name: "Nie wiedzą", value: 0 };
    const unanswered = { name: "Nie odpisali", value: 0 };

    [...partyParticipants].forEach((participant, index) => {
      switch (participant.status) {
        case STATUSES.PRZYJDZIE:
          present.value++;
          break;

        case STATUSES.NIE_PRZYJDZIE:
          absent.value++;
          break;

        case STATUSES.NIE_WIE:
          undecided.value++;
          break;

        case STATUSES.NIE_ODPISAŁ:
          unanswered.value++;
          break;

        default:
          break;
      }
    });

    return [present, absent, undecided, unanswered];
  };

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          innerRadius={"50%"}
          outerRadius={"55%"}
          fill="dodgerblue"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
});

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
