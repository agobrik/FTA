// MODERN TACTICAL SYSTEMS BATCH 1 (2024-2025 Season)
// Priority 1: 4 Most Important Modern Systems
// Arsenal, Liverpool, Bournemouth, Tottenham

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'football_tactics_ultra.db');
const db = new sqlite3.Database(dbPath);

const tacticalSystems = [
  {
    name: "3-2-4-1 Arteta Arsenal 2024/25",
    formation: "3-2-4-1",
    category: "modern",
    style: "possession",
    era: "2024-2025",
    philosophy: `Revolutionary positional play system that transforms from 4-3-3 through inverted fullback movement. The fullback (Zinchenko or Lewis-Skelly) drops into midfield to create a double pivot, while the wingers push high and wide. This creates numerical superiority in buildup (3-2 vs 2 forwards) and positional dominance in midfield zones. Arsenal creates triangles and diamonds all over the pitch, with constant rotations and third-man runs. The system is designed to break down low blocks through patient buildup and sudden vertical acceleration. Mikel Arteta's evolution of Guardiola's principles with unique inverted fullback innovation.`,

    key_principles: JSON.stringify([
      "Inverted fullback drops to form double pivot (3-2 shape in buildup)",
      "Numerical superiority in buildup phase (3+2 = 5 vs 2 forwards)",
      "Constant rotations between midfielders and forwards",
      "Half-space occupation by inside forwards",
      "Third-man runs from midfielders",
      "Patient buildup with sudden vertical passes",
      "Positional superiority over numerical superiority",
      "Overloads created through positioning not numbers",
      "Rest defense maintained (3 CBs + 1 DM always back)",
      "Quick transitions to 4-3-3 when losing ball"
    ]),

    strengths: JSON.stringify([
      "Complete control of buildup phase",
      "Numerical advantage against high press",
      "Creates space for creative players in half-spaces",
      "Difficult to press due to extra man in buildup",
      "Flexible shape confuses opponents",
      "High territorial dominance",
      "Excellent ball progression",
      "Strong rest defense (always 4 back when attacking)",
      "Set-piece masters under Arteta"
    ]),

    weaknesses: JSON.stringify([
      "Vulnerable to quick transitions on inverted FB side",
      "Requires extremely intelligent fullback",
      "Exposed to counter-attacks down wings",
      "Needs technically perfect players",
      "Struggles against ultra-low blocks",
      "Fullback position very demanding physically and mentally",
      "Can be isolated if midfield overrun",
      "Requires high tactical understanding from all players"
    ]),

    ideal_opposition: "Works best vs high-pressing teams, struggles vs ultra-deep low blocks",

    pressing_intensity: 9,
    defensive_line_height: 8,
    width: 6,
    tempo: 8,
    risk_level: 7,
    physicality_requirement: 7,
    technical_requirement: 9,
    tactical_complexity: 9,

    build_up_play: "short passing",
    passing_style: "possession with vertical bursts",
    passing_directness: 7,
    defensive_approach: "high press with 3-2-4-1 shape",
    attacking_approach: "positional play with rotations",
    compactness: "balanced",
    defensive_width: "narrow",
    attacking_width: "wide",
    defensive_shape: "back three with double pivot",

    required_player_profiles: JSON.stringify({
      GK: "Ball-playing goalkeeper with excellent distribution - Raya",
      CB_LEFT: "Left-footed ball-playing CB who can carry ball forward - Gabriel",
      CB_CENTER: "Physical leader, aerial dominance - Saliba",
      CB_RIGHT: "Ball-playing CB with pace - White (as RCB)",
      INVERTED_FB: "Intelligent playmaker who can play DM/CM, excellent positioning - Zinchenko, Lewis-Skelly",
      NORMAL_FB: "Attacking fullback with width, defensive solidity - Timber",
      DM: "Deep-lying playmaker with excellent passing range - Partey, Rice, Jorginho",
      CM: "Box-to-box midfielder with late runs - Odegaard (roaming playmaker)",
      LW: "Inside forward who cuts inside from left - Martinelli, Trossard",
      RW: "Inside forward who cuts inside from right - Saka",
      ST: "False 9 or complete forward who drops deep - Jesus, Havertz"
    }),

    key_positions: JSON.stringify([
      "Inverted fullback - system cornerstone",
      "Ball-playing center-backs - buildup crucial",
      "Roaming playmaker (Odegaard) - creative hub"
    ]),

    famous_teams: JSON.stringify([
      "Arsenal (2024-2025) - Premier League title challenge",
      "Arsenal (2023-2024) - 89 points, 2nd place, narrowly missed title"
    ]),

    famous_coaches: JSON.stringify([
      "Mikel Arteta (Arsenal 2023-present) - Guardiola disciple evolution, inverted FB pioneer"
    ]),

    famous_matches: JSON.stringify([
      "Arsenal 3-1 Liverpool (Feb 2024) - Dominant tactical display",
      "Arsenal 5-0 Chelsea (Apr 2024) - Perfect execution of system",
      "Arsenal 2-0 PSG (Oct 2024) - Champions League masterclass",
      "Arsenal 1-0 Man City (Oct 2024) - Tactical evolution vs teacher"
    ]),

    variants: JSON.stringify([
      "Can switch which fullback inverts based on opponent",
      "Sometimes both fullbacks invert vs weak opposition",
      "Can shift to 4-2-4 in final third",
      "Transforms to 4-3-3 out of possession",
      "Occasionally 3-4-3 with both FBs high"
    ]),

    in_possession_shape: "3-2-4-1 with inverted FB forming double pivot, wingers wide, false 9 dropping",
    out_of_possession_shape: "4-3-3 with inverted FB returning to fullback, compact defensive shape",
    transition_to_attack: "Quick vertical passes when space opens, patient buildup if not, third-man runs crucial",
    transition_to_defense: "Immediate counter-press (6-second rule), if fails quick drop to 4-3-3, maintain rest defense",

    corner_attack_strategy: "Arteta set-piece masterclass - short corners, near post overloads, blockers, creative routines",
    corner_defense_strategy: "Zonal with man-marking hybrids, Gabriel and Saliba dominant aerially",
    free_kick_strategy: "Odegaard specialist, creative routines, short options",

    tactical_instructions: `
BUILD-UP (3-2 SHAPE):
1. Inverted FB drops to form double pivot with DM
2. Back three stays wide
3. Create triangles everywhere
4. Patient possession until space opens

ATTACKING:
1. Wingers cut inside to half-spaces
2. Third-man runs from midfielders
3. Sudden vertical acceleration
4. Rotations and position swaps
5. Odegaard free roaming role

DEFENDING:
1. Immediate counter-press on ball loss
2. If unsuccessful, quick transition to 4-3-3
3. Maintain rest defense (3 CBs + 1 DM)
4. High defensive line

SET-PIECES:
1. Heavily practiced routines
2. Near post overloads
3. Blockers create space
4. Goalkeeper distribution quick`,

    player_instructions_by_position: JSON.stringify({
      GK: "Raya - play out from back, short distribution to CBs, sweeper keeper role",
      CB_LEFT: "Gabriel - stay wide in buildup, carry ball forward when space, aerial dominance",
      CB_CENTER: "Saliba - organize defense, high line, physical presence",
      CB_RIGHT: "White - stay wide in buildup, good on ball, cover for inverted FB",
      INVERTED_FB: "Zinchenko/Lewis-Skelly - drop into midfield in possession, form double pivot with DM, return to FB when ball lost, intelligent positioning",
      NORMAL_FB: "Timber - provide width, overlap winger when possible, defensive cover",
      DM: "Partey/Rice/Jorginho - sit between CBs in buildup, cover for inverted FB, defensive screen, quick distribution",
      CM: "Odegaard - free roaming, constant rotations, third-man runs, arrive late in box, creative hub",
      LW: "Martinelli/Trossard - cut inside to half-spaces, pin opposition FB, quick combinations with CM",
      RW: "Saka - cut inside to half-spaces, drive at defense, creative threat",
      ST: "Jesus/Havertz - drop deep to link play, false 9 movement, create space for midfielders, pressing trigger"
    }),

    difficulty_to_implement: 9,
    effectiveness_rating: 9,
    popularity_current: 9,
    success_rate: 88.5
  },

  {
    name: "4-3-3 Slot Liverpool 2024/25 Evolution",
    formation: "4-3-3",
    category: "modern",
    style: "balanced",
    era: "2024-2025",
    philosophy: `Evolution of Klopp's gegenpressing to more controlled positional pressing. Arne Slot brought tactical discipline and patience to Liverpool's chaos. Less frantic pressing, more selective triggers. Higher possession (60% vs 54% under Klopp), deeper buildup, more control. The system maintains Liverpool's attacking threat but with better defensive structure. DM drops between CBs in buildup (similar to Arteta but without inverted FB). More patient in possession, quicker in transition. The "calm after the storm" - keeping Liverpool's intensity but adding tactical maturity. First season transition from Klopp to Slot remarkably smooth.`,

    key_principles: JSON.stringify([
      "Positional pressing vs man-oriented pressing (key change from Klopp)",
      "DM drops between CBs in buildup (3-2-5 shape)",
      "Selective pressing triggers vs constant pressure",
      "Higher possession through patient buildup",
      "Maintain quick transitions but with better structure",
      "Rest defense always maintained",
      "Tactical discipline over chaos",
      "Control over intensity",
      "Quick vertical passes when space opens",
      "Better defensive organization than Klopp era"
    ]),

    strengths: JSON.stringify([
      "Balanced between control and intensity",
      "Better defensive structure than Klopp system",
      "Higher possession without losing attacking threat",
      "More sustainable over full season",
      "Less vulnerable to counter-attacks",
      "Selective pressing preserves energy",
      "Quick transitions still deadly",
      "Tactical flexibility",
      "Salah still world-class threat"
    ]),

    weaknesses: JSON.stringify([
      "Less intense than classic Klopp system (some fans miss chaos)",
      "Requires adjustment period for players used to Klopp",
      "Can be caught between pressing and dropping off",
      "Needs intelligent DM who can drop and cover",
      "Full-backs less attacking than Klopp era",
      "Slightly less exciting to watch (more controlled)"
    ]),

    ideal_opposition: "Works well vs most teams due to balance, particularly effective vs attacking teams",

    pressing_intensity: 8,
    defensive_line_height: 8,
    width: 7,
    tempo: 8,
    risk_level: 6,
    physicality_requirement: 8,
    technical_requirement: 8,
    tactical_complexity: 7,

    build_up_play: "short passing with DM drop",
    passing_style: "controlled with vertical bursts",
    passing_directness: 7,
    defensive_approach: "mid-block with selective triggers",
    attacking_approach: "patient then quick acceleration",
    compactness: "balanced",
    defensive_width: "balanced",
    attacking_width: "wide",
    defensive_shape: "back four with DM drop",

    required_player_profiles: JSON.stringify({
      GK: "Ball-playing keeper with excellent distribution - Alisson",
      LB: "Balanced full-back, attacking and defensive - Robertson (adapted role)",
      CB_LEFT: "Ball-playing CB with pace - Van Dijk",
      CB_RIGHT: "Physical CB, aerial dominance - Konate/Matip/Quansah",
      RB: "Balanced full-back, less attacking than TAA under Klopp - TAA adapted",
      DM: "Deep-lying playmaker who drops between CBs - Endo, Mac Allister",
      CM_LEFT: "Box-to-box with defensive discipline - Mac Allister, Jones",
      CM_RIGHT: "Creative midfielder with work-rate - Szoboszlai, Gravenberch",
      LW: "Pacy winger who cuts inside - Diaz, Gakpo",
      ST: "Complete forward with pressing ability - Jota, Nunez",
      RW: "Creative winger who can score - Salah (still key player)"
    }),

    key_positions: JSON.stringify([
      "DM who drops between CBs - buildup crucial",
      "Mohamed Salah - still world-class threat",
      "Van Dijk - defensive organization"
    ]),

    famous_teams: JSON.stringify([
      "Liverpool (2024-2025) - Slot's first season, smooth transition",
      "Feyenoord (2021-2023) - Slot's work before Liverpool, Eredivisie champions"
    ]),

    famous_coaches: JSON.stringify([
      "Arne Slot (Liverpool 2024-present) - Evolution of Klopp legacy, tactical discipline"
    ]),

    famous_matches: JSON.stringify([
      "Liverpool 3-0 Man United (Sept 2024) - Dominant display under Slot",
      "Liverpool 2-0 Real Madrid (Nov 2024) - Champions League tactical masterclass",
      "Liverpool 4-1 Chelsea (Oct 2024) - Controlled aggression",
      "Liverpool 2-0 Aston Villa (Nov 2024) - Patient possession victory"
    ]),

    variants: JSON.stringify([
      "Can increase pressing intensity vs weak opponents",
      "Can sit deeper vs strong opponents",
      "Flexible between 4-3-3 and 4-2-3-1",
      "Can revert to Klopp chaos when chasing game"
    ]),

    in_possession_shape: "4-3-3 becomes 3-2-5 with DM dropping between CBs, patient buildup",
    out_of_possession_shape: "4-3-3 compact mid-block with selective pressing triggers",
    transition_to_attack: "Quick vertical passes to forwards, Salah and Diaz deadly, but willing to slow down if needed",
    transition_to_defense: "Immediate counter-press (still 6-second rule but more selective), quick drop to 4-3-3 if fails",

    corner_attack_strategy: "Van Dijk aerial threat, creative short corners, TAA and Salah delivery specialists",
    corner_defense_strategy: "Zonal marking with Van Dijk organizing, physical presence",
    free_kick_strategy: "TAA and Salah specialists, quick free-kicks to catch opponents",

    tactical_instructions: `
BUILD-UP:
1. DM drops between CBs (3-2-5 shape)
2. Patient possession
3. Full-backs push high but controlled
4. Look for vertical passes when space opens

PRESSING:
1. Selective triggers (not constant)
2. Positional discipline in zones
3. Press when opponents heavy touch or back pass
4. Maintain defensive shape

ATTACKING:
1. Patient buildup then quick acceleration
2. Wingers cut inside
3. Full-backs overlap
4. Quick combinations in final third

DEFENDING:
1. Compact 4-3-3 shape
2. Better rest defense than Klopp era
3. Immediate counter-press if possible
4. Maintain defensive line`,

    player_instructions_by_position: JSON.stringify({
      GK: "Alisson - play out from back, sweeper keeper, excellent distribution",
      LB: "Robertson - push high in possession, provide width, more defensive discipline than Klopp era",
      CB_LEFT: "Van Dijk - organize defense, high line, ball-playing ability",
      CB_RIGHT: "Konate/Quansah - physical presence, cover for DM drop",
      RB: "TAA - push high but more reserved than Klopp era, crossing threat",
      DM: "Endo/Mac Allister - drop between CBs in buildup, screen defense, quick distribution",
      CM_LEFT: "Mac Allister/Jones - box-to-box movement, support attacks, defensive cover",
      CM_RIGHT: "Szoboszlai/Gravenberch - creative midfielder, work-rate, late runs",
      LW: "Diaz/Gakpo - stay wide initially, cut inside in final third, track back more than Klopp era",
      ST: "Jota/Nunez - press from front, link play, runs in behind",
      RW: "Salah - world-class threat, cut inside, creativity and goals"
    }),

    difficulty_to_implement: 7,
    effectiveness_rating: 8,
    popularity_current: 8,
    success_rate: 85.2
  },

  {
    name: "4-2-3-1 Iraola Bournemouth Counter-Press 2024/25",
    formation: "4-2-3-1",
    category: "modern",
    style: "counter-attack",
    era: "2024-2025",
    philosophy: `Revolutionary system that turned Bournemouth into the Premier League's most exciting transition team. Andoni Iraola (Bielsa disciple) brought ultra-aggressive pressing and lightning-quick transitions. The system focuses on winning ball high up pitch through aggressive pressing, then immediately attacking space with pace. Asymmetric fullback roles - one inverted, one wide. Record-breaking fast breaks in Premier League 2024/25. The system is high-risk, high-reward - vulnerable defensively but devastating in attack. Built around aggressive ball-winning and explosive pace on transitions. Most shot-ending fast breaks per game in Premier League history.`,

    key_principles: JSON.stringify([
      "Ultra-aggressive high pressing (most high regains in Premier League)",
      "Immediate vertical transitions after winning ball",
      "Asymmetric fullback roles (one inverts, one attacks)",
      "Quick ball progression - minimal touches",
      "Exploit space in behind opposition defense",
      "High-risk, high-reward approach",
      "Aggressive ball-winners in midfield",
      "Pacy forwards to exploit space",
      "Bielsa-style intensity and conditioning",
      "Fast breaks at record pace"
    ]),

    strengths: JSON.stringify([
      "Most effective transition team in Premier League 2024/25",
      "Devastating on counter-attacks",
      "Aggressive pressing wins ball in dangerous areas",
      "Exciting, attacking football",
      "Difficult to play against - constant pressure",
      "Exploits high defensive lines perfectly",
      "Creates high-quality chances",
      "Excellent at punishing mistakes",
      "Record-breaking fast breaks"
    ]),

    weaknesses: JSON.stringify([
      "Very vulnerable to counter-attacks themselves",
      "High energy demands - sustainability concerns",
      "Defensive structure can be chaotic",
      "Struggles against patient possession teams",
      "Physically demanding - injury risks",
      "Can be exposed by quality opposition",
      "Inconsistent - high variance results",
      "Requires perfect physical conditioning"
    ]),

    ideal_opposition: "Works best vs high-line teams and attacking teams, struggles vs patient low blocks",

    pressing_intensity: 9,
    defensive_line_height: 8,
    width: 9,
    tempo: 10,
    risk_level: 9,
    physicality_requirement: 10,
    technical_requirement: 7,
    tactical_complexity: 6,

    build_up_play: "direct and quick",
    passing_style: "vertical and direct",
    passing_directness: 10,
    defensive_approach: "ultra-aggressive high press",
    attacking_approach: "lightning transitions",
    compactness: "balanced",
    defensive_width: "wide on transitions",
    attacking_width: "very wide",
    defensive_shape: "back four with aggressive press",

    required_player_profiles: JSON.stringify({
      GK: "Sweeper keeper with quick distribution - Neto",
      LB: "Athletic fullback who can invert or attack - Kerkez (versatile)",
      CB_LEFT: "Fast CB to cover high line - Zabarnyi",
      CB_RIGHT: "Physical CB with pace - Senesi",
      RB: "Attacking wing-back type - Smith",
      DM_LEFT: "Aggressive ball-winner - Christie",
      DM_RIGHT: "Ball-winner with distribution - Cook",
      CAM: "Creative player with work-rate - Kluivert, Billing",
      LW: "Pacy winger to exploit space - Sinisterra, Ouattara",
      RW: "Direct winger with pace - Tavernier",
      ST: "Mobile striker with pace - Solanke (target and runner)"
    }),

    key_positions: JSON.stringify([
      "Ball-winning midfielders - system engine",
      "Pacy forwards - essential for transitions",
      "Solanke - mobile target man"
    ]),

    famous_teams: JSON.stringify([
      "AFC Bournemouth (2024-2025) - Most fast breaks in Premier League, most exciting team",
      "Athletic Bilbao (Iraola influence as player)"
    ]),

    famous_coaches: JSON.stringify([
      "Andoni Iraola (Bournemouth 2023-present) - Bielsa disciple, former Athletic Bilbao player"
    ]),

    famous_matches: JSON.stringify([
      "Bournemouth 3-0 Man United (Dec 2024) - Destroyed United on counter-attacks",
      "Bournemouth 4-1 Newcastle (Nov 2024) - Transition masterclass",
      "Bournemouth 2-2 Chelsea (Sept 2024) - Back-and-forth thriller",
      "Everton 0-1 Bournemouth (Aug 2024) - Solanke winner"
    ]),

    variants: JSON.stringify([
      "Can adjust which fullback inverts based on opponent",
      "Sometimes play 4-4-2 when defending",
      "Can sit deeper vs elite opposition but loses effectiveness",
      "Intensity can be adjusted but high-press is core identity"
    ]),

    in_possession_shape: "4-2-3-1 with asymmetric fullbacks, quick and direct, minimal buildup",
    out_of_possession_shape: "4-2-3-1 ultra-high press, win ball in opponent half",
    transition_to_attack: "FASTEST IN PREMIER LEAGUE - immediate vertical passes, forwards sprint, minimal touches, record pace",
    transition_to_defense: "Immediate counter-press, all nearby players, very high intensity, vulnerable if fails",

    corner_attack_strategy: "Quick set-pieces to catch opponents off-guard, Solanke target for crosses",
    corner_defense_strategy: "Organized zonal, physical presence, quick transitions after clearances",
    free_kick_strategy: "Quick restarts favored, looking for fast breaks",

    tactical_instructions: `
PRESSING:
1. Press aggressively everywhere
2. Win ball in opponent half
3. Take risks to win ball high
4. Constant pressure

TRANSITIONS:
1. IMMEDIATE vertical passes after winning ball
2. Forwards sprint into space
3. Minimal touches (1-2 max)
4. Shoot early, don't overplay
5. Fastest breaks in Premier League

BUILD-UP:
1. Quick and direct
2. Avoid patient possession
3. Always look forward
4. Minimal sideways passing

INTENSITY:
1. Bielsa-style fitness demands
2. High tempo always
3. Never slow down`,

    player_instructions_by_position: JSON.stringify({
      GK: "Neto - quick distribution, sweeper keeper very high risk, long balls acceptable",
      LB: "Kerkez - one FB inverts, one attacks (asymmetric), both very aggressive",
      CB_LEFT: "Zabarnyi - very high line, accept 1v1 situations, speed required",
      CB_RIGHT: "Senesi - physical presence, high line, quick recovery",
      RB: "Smith - attacking wing-back role, very high",
      DM_LEFT: "Christie - aggressive pressing, win ball and play forward immediately",
      DM_RIGHT: "Cook - ball-winner, no sideways passing, vertical passes",
      CAM: "Kluivert/Billing - press from front, quick combinations, arrive in box",
      LW: "Sinisterra/Ouattara - stay high and wide, sprint in behind on transitions",
      RW: "Tavernier - direct winger, exploit space, minimal defensive work",
      ST: "Solanke - mobile target, press CBs constantly, runs in behind, hold-up and run"
    ]),

    difficulty_to_implement: 8,
    effectiveness_rating: 7,
    popularity_current: 7,
    success_rate: 65.3
  },

  {
    name: "4-2-3-1 Postecoglou Tottenham High Line 2024/25",
    formation: "4-2-3-1",
    category: "modern",
    style: "attacking",
    era: "2024-2025",
    philosophy: `Revolutionary "Ange-ball" system with the highest defensive line in Premier League history. Ange Postecoglou brought his Australian direct attacking philosophy to Tottenham. The system plays with defensive line almost at halfway line, relying on offside trap and aggressive pressing. Quick passing, constant movement, attacking at all times regardless of game state. The philosophy is attack-first, entertainment-focused, high-risk. "I would not change my approach for any opposition" - famously stubborn commitment to principles. Works brilliantly against teams that attack, struggles against deep blocks. Thrilling to watch but defensively naive at times. Pure entertainment football.`,

    key_principles: JSON.stringify([
      "Highest defensive line in Premier League (often at halfway)",
      "Offside trap as primary defensive tool",
      "Attack at all times, regardless of score",
      "Quick, direct passing",
      "Constant movement and rotations",
      "Fullbacks push very high",
      "Quick transitions",
      "Entertainment over pragmatism",
      "Never park the bus, even when winning",
      "Philosophical commitment to attacking football"
    ]),

    strengths: JSON.stringify([
      "Exciting, attacking football",
      "Creates many high-quality chances",
      "Dominates possession in opponent half",
      "Offside trap catches opponents repeatedly",
      "Quick transitions deadly",
      "Entertaining for fans",
      "Clear tactical identity",
      "Works brilliantly vs attacking teams",
      "Son and Maddison creativity"
    ]),

    weaknesses: JSON.stringify([
      "EXTREMELY vulnerable to balls in behind",
      "High defensive line can be exploited easily",
      "Stubborn refusal to adapt can cost points",
      "Defensive fragility",
      "Requires extremely fast center-backs",
      "Can concede many goals even when winning",
      "Struggles against low blocks",
      "Naive at times - never shuts up shop"
    ]),

    ideal_opposition: "Works brilliantly vs attacking teams, struggles vs deep defensive blocks",

    pressing_intensity: 9,
    defensive_line_height: 10,
    width: 8,
    tempo: 9,
    risk_level: 10,
    physicality_requirement: 8,
    technical_requirement: 7,
    tactical_complexity: 6,

    build_up_play: "quick passing from back",
    passing_style: "direct and progressive",
    passing_directness: 9,
    defensive_approach: "highest line with offside trap",
    attacking_approach: "constant attack always",
    compactness: "balanced",
    defensive_width: "balanced",
    attacking_width: "wide",
    defensive_shape: "back four at halfway line",

    required_player_profiles: JSON.stringify({
      GK: "Sweeper keeper comfortable as extra defender - Vicario (very aggressive)",
      LB: "Attacking fullback who plays as winger - Udogie (pace essential)",
      CB_LEFT: "EXTREMELY FAST CB for offside trap - Van de Ven (37 km/h sprint speed!)",
      CB_RIGHT: "Fast CB, comfortable high line - Romero (aggressive)",
      RB: "Attacking fullback - Porro (essentially right winger)",
      DM_LEFT: "Ball-winner - Bissouma, Sarr",
      DM_RIGHT: "Deep playmaker - Bentancur, Hojbjerg",
      CAM: "Creative #10 - Maddison (key playmaker)",
      LW: "Pacy winger - Son (still delivers at 32)",
      RW: "Direct winger - Johnson, Kulusevski",
      ST: "Mobile striker - Richarlison, Solanke (new signing)"
    }),

    key_positions: JSON.stringify([
      "Micky van de Ven - fastest CB in PL, offside trap essential",
      "James Maddison - creative hub",
      "Son Heung-min - world-class winger"
    ]),

    famous_teams: JSON.stringify([
      "Tottenham Hotspur (2023-2025) - Ange revolution",
      "Celtic (2021-2023) - Domestic dominance under Ange, treble winners",
      "Yokohama F. Marinos (2018-2021) - J-League champions"
    ]),

    famous_coaches: JSON.stringify([
      "Ange Postecoglou (Tottenham 2023-present) - Australian tactical revolutionary, stubborn philosopher"
    ]),

    famous_matches: JSON.stringify([
      "Tottenham 4-1 Newcastle (Apr 2024) - High line perfection",
      "Chelsea 4-1 Tottenham (Nov 2024) - Exposed defensively after red card, refused to adapt",
      "Tottenham 2-0 Man City (Nov 2024) - Offside trap masterclass",
      "Tottenham 3-4 Liverpool (Sept 2024) - Thrilling, end-to-end chaos, 9-red card controversy"
    ]),

    variants: JSON.stringify([
      "Postecoglou famously refuses to change system",
      "Minor tweaks to personnel but never philosophy",
      "Will not park bus even when winning",
      "Stubborn commitment to principles - strength and weakness"
    ]),

    in_possession_shape: "4-2-3-1 with fullbacks as wingers, constant attack, quick passing",
    out_of_possession_shape: "4-2-3-1 with highest defensive line in PL (often at halfway), offside trap",
    transition_to_attack: "Very quick, direct passes to forwards, fullbacks join immediately",
    transition_to_defense: "Immediate counter-press, if fails rely on offside trap and Van de Ven pace",

    corner_attack_strategy: "Direct corners, Maddison delivery, looking for quick goals, not complex",
    corner_defense_strategy: "Zonal marking, physical presence, quick throw-ins to maintain tempo",
    free_kick_strategy: "Maddison specialist, direct and creative",

    tactical_instructions: `
DEFENSIVE LINE:
1. Highest line possible (often at halfway)
2. Play offside trap
3. Accept 1v1 situations
4. Van de Ven speed crucial

ATTACKING:
1. Press aggressively
2. Attack constantly
3. Quick passing
4. Fullbacks as wingers
5. Never stop attacking

PHILOSOPHY:
1. Accept defensive risks
2. Entertainment first
3. "We never stop" - Ange
4. No parking bus ever
5. Stubborn to principles

PRESSING:
1. Every opponent touch in their half
2. Constant pressure
3. Always pressing`,

    player_instructions_by_position: JSON.stringify({
      GK: "Vicario - sweeper keeper very aggressive, quick distribution, acts as extra defender",
      LB: "Udogie - play as winger, extremely high position, pace essential",
      CB_LEFT: "Van de Ven - extremely high line (halfway), play offside trap, 1v1 defending, PACE ESSENTIAL (fastest CB in PL)",
      CB_RIGHT: "Romero - aggressive defending, high line, physical presence",
      RB: "Porro - play as winger, extremely high, crossing threat",
      DM_LEFT: "Bissouma/Sarr - ball-winner, cover for fullbacks",
      DM_RIGHT: "Bentancur - deep playmaker, cover for fullbacks, quick distribution",
      CAM: "Maddison - free roaming, create chances, press from front, creative hub",
      LW: "Son - width and direct running, cut inside, constant movement",
      RW: "Johnson/Kulusevski - direct running, width, cut inside",
      ST: "Richarlison/Solanke - mobile linking play, press CBs, runs in behind"
    ]),

    difficulty_to_implement: 9,
    effectiveness_rating: 7,
    popularity_current: 8,
    success_rate: 68.4
  }
];

// Insert function
function insertModernSystems() {
  console.log('🚀 MODERN TACTICAL SYSTEMS BATCH 1 (2024-2025 Season)\n');
  console.log('📌 Adding 4 priority modern systems:\n');

  const insertStmt = db.prepare(`
    INSERT INTO tactical_systems (
      name, formation, category, style, era, philosophy,
      key_principles, strengths, weaknesses, ideal_opposition,
      pressing_intensity, defensive_line_height, width, tempo, risk_level,
      physicality_requirement, technical_requirement, tactical_complexity,
      build_up_play, passing_style, passing_directness,
      defensive_approach, attacking_approach, compactness,
      defensive_width, attacking_width, defensive_shape,
      required_player_profiles, key_positions,
      famous_teams, famous_coaches, famous_matches, variants,
      in_possession_shape, out_of_possession_shape,
      transition_to_attack, transition_to_defense,
      corner_attack_strategy, corner_defense_strategy, free_kick_strategy,
      tactical_instructions, player_instructions_by_position,
      difficulty_to_implement, effectiveness_rating, popularity_current, success_rate
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    let successCount = 0;
    tacticalSystems.forEach((system) => {
      try {
        insertStmt.run(
          system.name,
          system.formation,
          system.category,
          system.style,
          system.era,
          system.philosophy,
          system.key_principles,
          system.strengths,
          system.weaknesses,
          system.ideal_opposition,
          system.pressing_intensity,
          system.defensive_line_height,
          system.width,
          system.tempo,
          system.risk_level,
          system.physicality_requirement,
          system.technical_requirement,
          system.tactical_complexity,
          system.build_up_play,
          system.passing_style,
          system.passing_directness,
          system.defensive_approach,
          system.attacking_approach,
          system.compactness,
          system.defensive_width,
          system.attacking_width,
          system.defensive_shape,
          system.required_player_profiles,
          system.key_positions,
          system.famous_teams,
          system.famous_coaches,
          system.famous_matches,
          system.variants,
          system.in_possession_shape,
          system.out_of_possession_shape,
          system.transition_to_attack,
          system.transition_to_defense,
          system.corner_attack_strategy,
          system.corner_defense_strategy,
          system.free_kick_strategy,
          system.tactical_instructions,
          system.player_instructions_by_position,
          system.difficulty_to_implement,
          system.effectiveness_rating,
          system.popularity_current,
          system.success_rate
        );
        successCount++;
        console.log(`✅ ${successCount}. ${system.name}`);
      } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          console.log(`⚠️  ${system.name} - Already exists, skipping`);
        } else {
          console.error(`❌ Error adding ${system.name}:`, err.message);
        }
      }
    });

    db.run('COMMIT', (err) => {
      if (err) {
        console.error('\n❌ Transaction failed:', err);
        db.run('ROLLBACK');
      } else {
        console.log(`\n🎉 SUCCESS! Added ${successCount}/4 modern tactical systems (2024-2025)`);
        console.log('\n📊 Systems added:');
        console.log('   1. 3-2-4-1 Arteta Arsenal - Inverted fullback revolution');
        console.log('   2. 4-3-3 Slot Liverpool - Controlled pressing evolution');
        console.log('   3. 4-2-3-1 Iraola Bournemouth - Record-breaking transitions');
        console.log('   4. 4-2-3-1 Postecoglou Tottenham - Highest defensive line');
        console.log('\n✅ Database updated successfully!');
        console.log('\n🚀 Next step: Test in frontend (npm start in backend, npm run dev in frontend)');
      }

      insertStmt.finalize();
      db.close();
    });
  });
}

// Run the script
insertModernSystems();
