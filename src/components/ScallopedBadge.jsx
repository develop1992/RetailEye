const ScallopedBadge = ({ label, count }) => (
    <svg
        viewBox="0 0 200 200"
        width="250"
        height="250"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="
        M100,10
        C115,10 130,20 135,35
        C150,30 165,45 160,60
        C175,70 175,90 160,100
        C165,115 150,130 135,125
        C130,140 115,150 100,150
        C85,150 70,140 65,125
        C50,130 35,115 40,100
        C25,90 25,70 40,60
        C35,45 50,30 65,35
        C70,20 85,10 100,10 Z
      "
            fill="#4762FE"
            stroke="#9F58A7"      // ← Border color (white)
            strokeWidth="4"       // ← Border thickness
        />
        <text
            x="100"
            y="85"
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill="white"
        >
            {label}
        </text>
        <text
            x="100"
            y="115"
            textAnchor="middle"
            fontSize="28"
            fontWeight="bold"
            fill="white"
        >
            {count}
        </text>
    </svg>
);

export default ScallopedBadge;