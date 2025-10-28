import React from 'react';

/**
 * Futbol Sahası Görselleştirme Komponenti
 *
 * Kullanım:
 * <FootballPitch
 *   formation="4-4-2"
 *   players={[
 *     { id: 1, name: 'Kaleci', position: { x: 50, y: 5 }, role: 'GK' },
 *     { id: 2, name: 'Sağ Bek', position: { x: 80, y: 25 }, role: 'RB' },
 *     ...
 *   ]}
 *   onPlayerClick={(player) => console.log(player)}
 * />
 */
const FootballPitch = ({
  formation = '4-4-2',
  players = [],
  onPlayerClick,
  showNames = true,
  highlightedPlayers = [],
  width = 600,
  height = 800
}) => {
  // Calculate responsive dimensions
  const pitchWidth = width;
  const pitchHeight = height;
  const pitchPadding = 40;

  const getPlayerColor = (player) => {
    if (highlightedPlayers.includes(player.id)) {
      return '#3b82f6'; // Blue for highlighted
    }
    return '#22c55e'; // Green for normal
  };

  const handlePlayerClick = (player) => {
    if (onPlayerClick) {
      onPlayerClick(player);
    }
  };

  // Default formation positions (percentage based)
  const formationPositions = {
    '4-4-2': [
      // GK
      { x: 50, y: 5 },
      // Defense
      { x: 20, y: 20 }, { x: 40, y: 20 }, { x: 60, y: 20 }, { x: 80, y: 20 },
      // Midfield
      { x: 20, y: 50 }, { x: 40, y: 50 }, { x: 60, y: 50 }, { x: 80, y: 50 },
      // Attack
      { x: 35, y: 80 }, { x: 65, y: 80 }
    ],
    '4-3-3': [
      // GK
      { x: 50, y: 5 },
      // Defense
      { x: 20, y: 20 }, { x: 40, y: 20 }, { x: 60, y: 20 }, { x: 80, y: 20 },
      // Midfield
      { x: 30, y: 50 }, { x: 50, y: 50 }, { x: 70, y: 50 },
      // Attack
      { x: 20, y: 80 }, { x: 50, y: 80 }, { x: 80, y: 80 }
    ],
    '4-2-3-1': [
      // GK
      { x: 50, y: 5 },
      // Defense
      { x: 20, y: 20 }, { x: 40, y: 20 }, { x: 60, y: 20 }, { x: 80, y: 20 },
      // Defensive Mid
      { x: 35, y: 40 }, { x: 65, y: 40 },
      // Attacking Mid
      { x: 20, y: 65 }, { x: 50, y: 65 }, { x: 80, y: 65 },
      // Striker
      { x: 50, y: 85 }
    ],
    '3-5-2': [
      // GK
      { x: 50, y: 5 },
      // Defense
      { x: 30, y: 20 }, { x: 50, y: 20 }, { x: 70, y: 20 },
      // Midfield
      { x: 15, y: 50 }, { x: 35, y: 50 }, { x: 50, y: 50 }, { x: 65, y: 50 }, { x: 85, y: 50 },
      // Attack
      { x: 35, y: 80 }, { x: 65, y: 80 }
    ]
  };

  const positions = players.length > 0
    ? players
    : (formationPositions[formation] || formationPositions['4-4-2']).map((pos, i) => ({
        id: i + 1,
        name: `Oyuncu ${i + 1}`,
        position: pos
      }));

  return (
    <div className="relative bg-green-600 rounded-lg shadow-lg overflow-hidden" style={{ width: pitchWidth, height: pitchHeight }}>
      {/* SVG Pitch Lines */}
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={{ pointerEvents: 'none' }}
      >
        {/* Outer boundary */}
        <rect
          x={pitchPadding}
          y={pitchPadding}
          width={pitchWidth - pitchPadding * 2}
          height={pitchHeight - pitchPadding * 2}
          fill="none"
          stroke="white"
          strokeWidth="2"
        />

        {/* Center line */}
        <line
          x1={pitchPadding}
          y1={pitchHeight / 2}
          x2={pitchWidth - pitchPadding}
          y2={pitchHeight / 2}
          stroke="white"
          strokeWidth="2"
        />

        {/* Center circle */}
        <circle
          cx={pitchWidth / 2}
          cy={pitchHeight / 2}
          r="60"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />

        {/* Center spot */}
        <circle
          cx={pitchWidth / 2}
          cy={pitchHeight / 2}
          r="3"
          fill="white"
        />

        {/* Penalty areas */}
        {/* Top */}
        <rect
          x={pitchWidth / 2 - 120}
          y={pitchPadding}
          width="240"
          height="120"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        {/* Bottom */}
        <rect
          x={pitchWidth / 2 - 120}
          y={pitchHeight - pitchPadding - 120}
          width="240"
          height="120"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />

        {/* Goal areas */}
        {/* Top */}
        <rect
          x={pitchWidth / 2 - 60}
          y={pitchPadding}
          width="120"
          height="60"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        {/* Bottom */}
        <rect
          x={pitchWidth / 2 - 60}
          y={pitchHeight - pitchPadding - 60}
          width="120"
          height="60"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
      </svg>

      {/* Players */}
      {positions.map((player) => {
        const x = (pitchWidth - pitchPadding * 2) * (player.position.x / 100) + pitchPadding;
        const y = (pitchHeight - pitchPadding * 2) * (player.position.y / 100) + pitchPadding;

        return (
          <div
            key={player.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
            style={{ left: x, top: y }}
            onClick={() => handlePlayerClick(player)}
          >
            {/* Player circle */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
              style={{ backgroundColor: getPlayerColor(player) }}
            >
              {player.role || player.id}
            </div>

            {/* Player name */}
            {showNames && (
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {player.name}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Formation label */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-3 py-1 rounded">
        Formasyon: {formation}
      </div>
    </div>
  );
};

export default FootballPitch;
