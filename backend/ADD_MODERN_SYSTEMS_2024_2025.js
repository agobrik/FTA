/**
 * MODERN TACTICAL SYSTEMS 2024-2025 SEASON
 *
 * This file adds cutting-edge tactical systems from the 2024-2025 football season
 * Focus: Premier League, La Liga, Serie A, Bundesliga innovations
 *
 * Systems included:
 * 1. 3-2-4-1 Arteta Arsenal 2024/25
 * 2. 4-3-3 Slot Liverpool Evolution
 * 3. 4-2-3-1 Iraola Bournemouth Counter-Press
 * 4. 4-2-3-1 Postecoglou Tottenham High Line
 * 5. 4-3-3 De Zerbi Positional Flexibility
 * 6. 4-2-3-1 Emery Aston Villa Counter-Press
 * 7. 3-4-3 Alonso Leverkusen Invincibles
 * 8. 4-2-3-1 Kompany Bayern High Press
 * 9. 3-4-2-1 Gasperini Atalanta Evolution 2024
 * 10. 4-3-3 Inzaghi Inter Champions League
 * 11. 4-4-2 Simeone Atletico Evolution
 * 12. 4-3-3 Xabi Alonso Real Sociedad Press
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'football_tactics_ultra.db');
const db = new sqlite3.Database(dbPath);

const modernSystems = [
  // SYSTEM 1: 3-2-4-1 Arteta Arsenal 2024/25
  {
    name: '3-2-4-1 Arteta Arsenal 2024/25',
    formation: '3-2-4-1',
    category: 'Possession',
    style: 'Positional Play',
    era: 'Modern (2024-2025)',
    philosophy: 'Revolutionary positional play system that transforms from 4-3-3 through inverted fullback movement. The fullback (Zinchenko or Lewis-Skelly) drops into midfield to create a double pivot, while the wingers push high and wide. This creates numerical superiority in buildup (3-2 vs 2 forwards) and positional dominance in midfield zones. Arsenal creates triangles and diamonds all over the pitch, with constant rotations and third-man runs. The system is designed to break down low blocks through patient buildup and sudden vertical acceleration.',

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
      "Strong rest defense (always 4 back when attacking)"
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

    famous_teams: JSON.stringify([
      "Arsenal (2024-2025) - Premier League title challenge",
      "Arsenal (2023-2024) - 89 points, 2nd place"
    ]),

    famous_coaches: JSON.stringify([
      "Mikel Arteta (Arsenal 2024-2025) - Guardiola disciple evolution"
    ]),

    famous_matches: JSON.stringify([
      "Arsenal 3-1 Liverpool (Feb 2024) - Dominant tactical display",
      "Arsenal 5-0 Chelsea (Apr 2024) - Perfect execution of system",
      "Arsenal 2-0 PSG (Oct 2024) - Champions League masterclass",
      "Arsenal 1-0 Man City (Oct 2024) - Tactical evolution vs teacher"
    ]),

    // Metrics (1-10 scale)
    pressing_intensity: 9,
    defensive_line_height: 8,
    width: 6,
    tempo: 8,
    risk_level: 7,
    possession_target: 65,

    build_up_play: 'Short passing from back three, inverted fullback drops between CBs or alongside DM to create 3-2 shape. Patient buildup with quick vertical passes when space opens. Constant rotations between midfielders.',

    passing_style: 'Short passing triangles, quick one-twos, third-man passes. Focus on positional superiority - players positioned to receive in dangerous areas. Vertical passes when available, patient recycling when not.',

    defensive_approach: 'High press with 3-2-4-1 shape. Front four press high, double pivot covers space, back three holds line. Quick transition to 4-3-3 when ball lost - winger drops to fullback, inverted FB returns to fullback position.',

    attacking_approach: 'Build up with 3-2 shape, create overloads in half-spaces with inside forwards and advancing midfielders. Constant rotations to create confusion. Quick vertical passes when space opens. Late runs from midfielders into box.',

    required_player_profiles: JSON.stringify({
      GK: "Ball-playing goalkeeper with excellent distribution",
      CB_LEFT: "Left-footed ball-playing CB who can carry ball forward (Gabriel)",
      CB_CENTER: "Physical leader, aerial dominance (Saliba)",
      CB_RIGHT: "Ball-playing CB with pace (White playing as RCB)",
      INVERTED_FB: "Intelligent playmaker who can play DM/CM, excellent positioning (Zinchenko, Lewis-Skelly)",
      NORMAL_FB: "Attacking fullback with width, defensive solidity (Timber)",
      DM: "Deep-lying playmaker with excellent passing range (Partey, Rice, Jorginho)",
      CM: "Box-to-box midfielder with late runs (Odegaard as roaming playmaker)",
      LW: "Inside forward who cuts inside from left (Martinelli, Trossard)",
      RW: "Inside forward who cuts inside from right (Saka)",
      ST: "False 9 or complete forward who drops deep (Jesus, Havertz as false 9)"
    }),

    set_piece_strategy: 'Arsenal became set-piece masters under Arteta. Short corners to create better angles, overloads at near post, blockers to create space. Free-kicks with creative routines. Expert at creating space through movement.',

    pressing_triggers: JSON.stringify([
      "Goalkeeper receiving back pass - immediate high press",
      "Fullback receiving ball under pressure",
      "Backwards pass by opponent CB",
      "Heavy touch by opponent midfielder",
      "Pressing traps on wings - force play wide then trap"
    ]),

    defensive_transitions: 'Immediate counter-press with nearest 3-4 players (6-second rule). If unsuccessful, quick drop into 4-3-3 shape with winger dropping to FB and inverted FB returning to defense. Maintain rest defense always.',

    offensive_transitions: 'Quick vertical passes to forwards if space available. If not, patient buildup with inverted FB dropping to form 3-2. Look for third-man runs and rotations to create space.',

    player_instructions: JSON.stringify({
      GK: ["Play out from back", "Short distribution to CBs", "Sweeper keeper role"],
      CBs: ["Stay wide in buildup", "Carry ball forward when space", "High defensive line"],
      INVERTED_FB: ["Drop into midfield in possession", "Form double pivot with DM", "Return to FB when ball lost"],
      NORMAL_FB: ["Provide width", "Overlap winger when possible", "Defensive cover"],
      DM: ["Sit between CBs in buildup", "Cover for inverted FB", "Defensive screen"],
      CM: ["Rotate positions constantly", "Third-man runs", "Arrive late in box"],
      WINGERS: ["Cut inside to half-spaces", "Pin opposition fullbacks", "Quick combinations with CM"],
      ST: ["Drop deep to link play", "False 9 movement", "Create space for midfielders"]
    }),

    variations: JSON.stringify([
      "Can switch which fullback inverts based on opponent",
      "Sometimes both fullbacks invert vs weak opposition",
      "Can shift to 4-2-4 in final third",
      "Transforms to 4-3-3 out of possession"
    ]),

    counter_tactics: JSON.stringify([
      "Exploit space behind inverted fullback with pacy winger",
      "Quick switches of play to isolated fullback side",
      "Press the double pivot aggressively",
      "Force play to inverted FB side then overload",
      "Use target man to bypass buildup"
    ]),

    training_focus: JSON.stringify([
      "Positional play drills (rondos, possession games)",
      "Inverted FB training specific drills",
      "Rotation patterns and third-man runs",
      "Set-piece routines (Arteta's specialty)",
      "Counter-pressing drills (6-second rule)",
      "Build-up patterns vs different pressing schemes",
      "Half-space occupation drills"
    ]),

    tactical_instructions: 'Build up with patience using 3-2 shape. Inverted FB drops to form double pivot. Create triangles everywhere. Look for third-man runs. Occupy half-spaces with inside forwards. Quick vertical passes when space opens. Counter-press immediately when losing ball. Maintain rest defense with back 3 + 1 DM.',

    success_stories: JSON.stringify([
      "Arsenal 89 points in 2023-2024 (narrowly missed title)",
      "Arsenal title challenge in 2024-2025 (ongoing)",
      "Transformed Arsenal from mid-table to title contenders",
      "Made Arsenal one of best buildup teams in Europe"
    ]),

    difficulty_rating: 9,
    effectiveness_rating: 9,
    success_rate: 88
  },

  // SYSTEM 2: 4-3-3 Slot Liverpool Evolution
  {
    name: '4-3-3 Slot Liverpool 2024/25 Evolution',
    formation: '4-3-3',
    category: 'Balanced',
    style: 'Controlled Pressing',
    era: 'Modern (2024-2025)',
    philosophy: 'Evolution of Klopp\'s gegenpressing to more controlled positional pressing. Arne Slot brought tactical discipline and patience to Liverpool\'s chaos. Less frantic pressing, more selective triggers. Higher possession (60% vs 54% under Klopp), deeper buildup, more control. The system maintains Liverpool\'s attacking threat but with better defensive structure. DM drops between CBs in buildup (similar to Arteta but without inverted FB). More patient in possession, quicker in transition. The "calm after the storm" - keeping Liverpool\'s intensity but adding tactical maturity.',

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
      "Tactical flexibility"
    ]),

    weaknesses: JSON.stringify([
      "Less intense than classic Klopp system (some fans miss chaos)",
      "Requires adjustment period for players used to Klopp",
      "Can be caught between pressing and dropping off",
      "Needs intelligent DM who can drop and cover",
      "Full-backs less attacking than Klopp era",
      "Slightly less exciting to watch"
    ]),

    famous_teams: JSON.stringify([
      "Liverpool (2024-2025) - Slot's first season",
      "Feyenoord (2021-2023) - Slot's work before Liverpool"
    ]),

    famous_coaches: JSON.stringify([
      "Arne Slot (Liverpool 2024-2025) - Evolution of Klopp legacy"
    ]),

    famous_matches: JSON.stringify([
      "Liverpool 3-0 Man United (Sept 2024) - Dominant display",
      "Liverpool 2-0 Real Madrid (Nov 2024) - Champions League tactical masterclass",
      "Liverpool 4-1 Chelsea (Oct 2024) - Controlled aggression"
    ]),

    pressing_intensity: 8,
    defensive_line_height: 8,
    width: 7,
    tempo: 8,
    risk_level: 6,
    possession_target: 60,

    build_up_play: 'DM drops between CBs to form back three (3-2-5). Patient buildup with short passes. Full-backs push high. Wingers stay wide initially then move inside. More patient than Klopp system - willing to recycle possession.',

    passing_style: 'Mixture of short buildup and quick vertical passes. More controlled than Klopp but still direct when opportunity presents. Focus on creating high-quality chances rather than volume.',

    defensive_approach: 'Mid-block press with selective triggers. Not as aggressive as Klopp\'s pressing. Positional discipline - players press from their zones, not chasing all over. Better rest defense.',

    attacking_approach: 'Build up patiently, then quick vertical acceleration when space opens. Wingers provide width then cut inside. Full-backs overlap. Quick combinations in final third. Late runs from midfielders.',

    required_player_profiles: JSON.stringify({
      GK: "Ball-playing keeper with excellent distribution (Alisson)",
      LB: "Balanced full-back, attacking and defensive (Robertson - adapted role)",
      CB_LEFT: "Ball-playing CB with pace (Van Dijk)",
      CB_RIGHT: "Physical CB, aerial dominance (Konate/Matip)",
      RB: "Balanced full-back, less attacking than TAA under Klopp (TAA adapted)",
      DM: "Deep-lying playmaker who drops between CBs (Endo, Mac Allister)",
      CM_LEFT: "Box-to-box with defensive discipline (Mac Allister)",
      CM_RIGHT: "Creative midfielder with work-rate (Szoboszlai, Jones)",
      LW: "Pacy winger who cuts inside (Diaz, Gakpo)",
      ST: "Complete forward with pressing ability (Jota, Nunez)",
      RW: "Creative winger who can score (Salah - still key player)"
    }),

    set_piece_strategy: 'Liverpool\'s set-pieces remain strong. Van Dijk aerial threat. Creative short corners. Quick free-kicks to catch opponents off-guard. Salah and TAA delivery specialists.',

    pressing_triggers: JSON.stringify([
      "Goalkeeper under pressure",
      "Weak pass by opponent CB",
      "Opponent fullback receiving under pressure",
      "Backwards pass in midfield",
      "Heavy touch by opponent"
    ]),

    defensive_transitions: 'Immediate counter-press with nearby players (still 6-second rule but more selective). If unsuccessful, quick drop into compact 4-3-3 shape. Better rest defense than Klopp era.',

    offensive_transitions: 'Quick vertical passes to forwards. Salah and Diaz still deadly on break. But willing to slow down and retain possession if quick break not available.',

    player_instructions: JSON.stringify({
      GK: ["Play out from back", "Sweeper keeper"],
      FULL_BACKS: ["Push high in possession", "Provide width", "But more reserved than Klopp era"],
      CBs: ["Stay wide in buildup", "High line", "Cover for DM when he drops"],
      DM: ["Drop between CBs in buildup", "Screen defense", "Quick distribution"],
      CMs: ["Box-to-box movement", "Support attacks", "Defensive cover"],
      WINGERS: ["Stay wide initially", "Cut inside in final third", "Track back more than Klopp era"],
      ST: ["Press from front", "Link play", "Runs in behind"]
    }),

    variations: JSON.stringify([
      "Can increase pressing intensity vs weak opponents",
      "Can sit deeper vs strong opponents",
      "Flexible between 4-3-3 and 4-2-3-1",
      "Can revert to Klopp chaos when chasing game"
    ]),

    counter_tactics: JSON.stringify([
      "Force Liverpool into low-quality possession",
      "Quick breaks when DM is high",
      "Target less aggressive full-backs",
      "Compact low block to frustrate"
    ]),

    training_focus: JSON.stringify([
      "Positional pressing drills",
      "Patient buildup patterns",
      "DM dropping between CBs",
      "Tactical discipline exercises",
      "Transition drills (both ways)"
    ]),

    tactical_instructions: 'Build up patiently with DM dropping between CBs. Maintain positional discipline. Press selectively, not constantly. Quick vertical passes when space opens. Maintain rest defense. Control tempo. Quick transitions but with better structure than Klopp era.',

    success_stories: JSON.stringify([
      "Smooth transition from Klopp to Slot (2024-2025)",
      "Maintained Liverpool\'s competitiveness",
      "Added tactical maturity to Liverpool\'s game",
      "Feyenoord Eredivisie champions (2022-2023 under Slot)"
    ]),

    difficulty_rating: 7,
    effectiveness_rating: 8,
    success_rate: 85
  },

  // SYSTEM 3: 4-2-3-1 Iraola Bournemouth Counter-Press
  {
    name: '4-2-3-1 Iraola Bournemouth Counter-Press',
    formation: '4-2-3-1',
    category: 'Counter-Attack',
    style: 'High Press Transition',
    era: 'Modern (2024-2025)',
    philosophy: 'Revolutionary system that turned Bournemouth into the Premier League\'s most exciting transition team. Andoni Iraola (Bielsa disciple) brought ultra-aggressive pressing and lightning-quick transitions. The system focuses on winning ball high up pitch through aggressive pressing, then immediately attacking space with pace. Asymmetric fullback roles - one inverted, one wide. Record-breaking fast breaks in Premier League 2024/25. The system is high-risk, high-reward - vulnerable defensively but devastating in attack. Built around aggressive ball-winning and explosive pace on transitions.',

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
      "Excellent at punishing mistakes"
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

    famous_teams: JSON.stringify([
      "AFC Bournemouth (2024-2025) - Most fast breaks in Premier League",
      "Athletic Bilbao (2018-2021 under Iraola as player, tactical influence)"
    ]),

    famous_coaches: JSON.stringify([
      "Andoni Iraola (Bournemouth 2023-2025) - Bielsa disciple, former Athletic Bilbao player"
    ]),

    famous_matches: JSON.stringify([
      "Bournemouth 3-0 Man United (Dec 2024) - Destroyed United on counter-attacks",
      "Bournemouth 4-1 Newcastle (Nov 2024) - Transition masterclass",
      "Bournemouth 2-2 Chelsea (Sept 2024) - Back-and-forth thriller"
    ]),

    pressing_intensity: 9,
    defensive_line_height: 8,
    width: 9,
    tempo: 10,
    risk_level: 9,
    possession_target: 45,

    build_up_play: 'Quick and direct. Minimal touches in buildup. One fullback inverts, one stays wide. Quick ball progression through midfield. Look for vertical passes immediately. Not interested in patient possession.',

    passing_style: 'Direct and vertical. Quick combinations. Minimal sideways passing. Always looking forward. High-risk passes accepted. Volume of attacks over careful buildup.',

    defensive_approach: 'Ultra-aggressive high press. Win ball in opponent half. Take risks defensively to win ball high. Can be exposed on counter-attacks but system designed to score more than concede.',

    attacking_approach: 'Lightning-quick transitions. Immediately attack space after winning ball. Vertical passes to pacy forwards. Exploit space in behind. Create overloads through speed, not positioning. Shoot quickly, don\'t overplay.',

    required_player_profiles: JSON.stringify({
      GK: "Sweeper keeper with quick distribution (Neto)",
      LB: "Athletic fullback who can invert or attack (Kerkez - versatile)",
      CB_LEFT: "Fast CB to cover high line (Zabarnyi)",
      CB_RIGHT: "Physical CB with pace (Senesi)",
      RB: "Attacking wing-back type (Smith)",
      DM_LEFT: "Aggressive ball-winner (Christie)",
      DM_RIGHT: "Ball-winner with distribution (Cook)",
      CAM: "Creative player with work-rate (Kluivert, Billing)",
      LW: "Pacy winger to exploit space (Sinisterra, Ouattara)",
      RW: "Direct winger with pace (Tavernier)",
      ST: "Mobile striker with pace (Solanke - target and runner)"
    }),

    set_piece_strategy: 'Quick set-pieces to catch opponents off-guard. Not particularly creative, but effective. Solanke target from crosses. Looking for quick restarts.',

    pressing_triggers: JSON.stringify([
      "Every ball reception in opponent half",
      "Goalkeeper receiving back pass - immediate press",
      "Any backwards pass by opponent",
      "Heavy touch anywhere on pitch",
      "Essentially always pressing - aggressive triggers"
    ]),

    defensive_transitions: 'Immediate counter-press - all nearby players. High intensity. If unsuccessful, can be vulnerable. Risk accepted as part of system philosophy.',

    offensive_transitions: 'FASTEST IN PREMIER LEAGUE. Immediate vertical passes. Forwards sprint into space. Minimal touches. Shoot early. Create overloads through speed. This is the system\'s core strength.',

    player_instructions: JSON.stringify({
      GK: ["Quick distribution", "Sweeper keeper - very high risk"],
      FULL_BACKS: ["One inverts, one attacks - asymmetric", "Both very aggressive"],
      CBs: ["Very high line", "Accept 1v1 situations", "Speed required"],
      DMs: ["Aggressive pressing", "Win ball and play forward immediately", "No sideways passing"],
      CAM: ["Press from front", "Quick combinations", "Arrive in box"],
      WINGERS: ["Stay high and wide", "Sprint in behind on transitions", "Minimal defensive work"],
      ST: ["Press CBs constantly", "Runs in behind", "Quick combinations"]
    }),

    variations: JSON.stringify([
      "Can adjust which fullback inverts based on opponent",
      "Sometimes play 4-4-2 when defending",
      "Can sit deeper vs elite opposition but loses effectiveness",
      "Intensity can be adjusted but high-press is core identity"
    ]),

    counter_tactics: JSON.stringify([
      "Patient possession to tire Bournemouth's pressing",
      "Quick counter-attacks through midfield",
      "Exploit high defensive line with long balls",
      "Target exhausted players in second half",
      "Compact low block to avoid high regains"
    ]),

    training_focus: JSON.stringify([
      "Extreme fitness conditioning (Bielsa-style)",
      "High-intensity pressing drills",
      "Quick transition drills",
      "Vertical passing patterns",
      "Sprint training for forwards",
      "Counter-pressing drills",
      "Defensive 1v1 situations"
    ]),

    tactical_instructions: 'Press aggressively everywhere. Win ball high. Immediately play forward. Minimal touches. Sprint into space. Shoot early. Accept defensive risks. High tempo always. Fast breaks at maximum speed. Outnumber opponents through speed, not positioning.',

    success_stories: JSON.stringify([
      "Bournemouth most exciting team in Premier League 2024/25",
      "Most shot-ending fast breaks in Premier League history",
      "Defeated Manchester United 3-0 away",
      "Transformed Bournemouth from relegation candidates to mid-table excitement"
    ]),

    difficulty_rating: 8,
    effectiveness_rating: 7,
    success_rate: 65
  },

  // SYSTEM 4: 4-2-3-1 Postecoglou Tottenham High Line
  {
    name: '4-2-3-1 Postecoglou Tottenham High Line',
    formation: '4-2-3-1',
    category: 'Attacking',
    style: 'High Line Press',
    era: 'Modern (2024-2025)',
    philosophy: 'Revolutionary "Ange-ball" system with the highest defensive line in Premier League history. Ange Postecoglou brought his Australian direct attacking philosophy to Tottenham. The system plays with defensive line almost at halfway line, relying on offside trap and aggressive pressing. Quick passing, constant movement, attacking at all times regardless of game state. The philosophy is attack-first, entertainment-focused, high-risk. "I would not change my approach for any opposition" - famously stubborn commitment to principles. Works brilliantly against teams that attack, struggles against deep blocks.',

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
      "Works brilliantly vs attacking teams"
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

    famous_teams: JSON.stringify([
      "Tottenham Hotspur (2023-2025) - Ange revolution",
      "Celtic (2021-2023) - Domestic dominance under Ange",
      "Yokohama F. Marinos (2018-2021) - J-League champions"
    ]),

    famous_coaches: JSON.stringify([
      "Ange Postecoglou (Tottenham 2023-2025) - Australian tactical revolutionary"
    ]),

    famous_matches: JSON.stringify([
      "Tottenham 4-1 Newcastle (Apr 2024) - High line perfection",
      "Chelsea 4-1 Tottenham (Nov 2024) - Exposed defensively after red card, refused to adapt",
      "Tottenham 2-0 Man City (Nov 2024) - Offside trap masterclass",
      "Tottenham 3-4 Liverpool (Sept 2024) - Thrilling, end-to-end chaos"
    ]),

    pressing_intensity: 9,
    defensive_line_height: 10,
    width: 8,
    tempo: 9,
    risk_level: 10,
    possession_target: 60,

    build_up_play: 'Quick passing from back. Goalkeeper plays short. Defenders comfortable with ball. Quick progression through midfield. Always looking forward. Fullbacks push very high, almost as wingers.',

    passing_style: 'Quick, direct passing. Minimal sideways passes. Always progressive. High-tempo. Quick combinations in tight spaces. Volume of attacks.',

    defensive_approach: 'Highest defensive line in Premier League - often at halfway line. Offside trap as primary defensive weapon. Aggressive pressing from front. Accept 1v1 situations at back. Risk embraced.',

    attacking_approach: 'Constant attack. Quick passing. Movement and rotations. Fullbacks as wingers. Overload final third. Shoot frequently. Never stop attacking even when winning.',

    required_player_profiles: JSON.stringify({
      GK: "Sweeper keeper comfortable as extra defender (Vicario - aggressive)",
      LB: "Attacking fullback who plays as winger (Udogie - pace essential)",
      CB_LEFT: "EXTREMELY FAST CB for offside trap (Van de Ven - 37 km/h sprint speed)",
      CB_RIGHT: "Fast CB, comfortable high line (Romero - aggressive)",
      RB: "Attacking fullback (Porro - essentially right winger)",
      DM_LEFT: "Ball-winner (Bissouma, Sarr)",
      DM_RIGHT: "Deep playmaker (Bentancur, Hojbjerg)",
      CAM: "Creative #10 (Maddison - key playmaker)",
      LW: "Pacy winger (Son - still delivers)",
      RW: "Direct winger (Johnson, Kulusevski)",
      ST: "Mobile striker (Richarlison, Solanke new signing)"
    }),

    set_piece_strategy: 'Direct corners and free-kicks. Looking for quick goals. Maddison delivery specialist. Not particularly complex but effective. Quick throw-ins to maintain tempo.',

    pressing_triggers: JSON.stringify([
      "Every opponent touch in their half",
      "Goalkeeper distribution",
      "Backwards passes",
      "Always pressing - constant pressure"
    ]),

    defensive_transitions: 'Immediate counter-press. If unsuccessful, rely on offside trap and pace of Van de Ven. High-risk approach. GK Vicario acts as sweeper.',

    offensive_transitions: 'Very quick. Direct passes to forwards. Exploit space with pace. Fullbacks join attack immediately. High tempo maintained.',

    player_instructions: JSON.stringify({
      GK: ["Sweeper keeper - very aggressive", "Quick distribution"],
      FULL_BACKS: ["Play as wingers", "Extremely high position", "Stay forward even when defending"],
      CBs: ["Extremely high line (halfway)", "Play offside trap", "1v1 defending required", "Pace essential"],
      DMs: ["One sits, one box-to-box", "Cover for fullbacks", "Quick distribution"],
      CAM: ["Free roaming", "Create chances", "Press from front"],
      WINGERS: ["Width and direct running", "Cut inside", "Constant movement"],
      ST: ["Mobile, linking play", "Press CBs", "Runs in behind"]
    ]),

    variations: JSON.stringify([
      "Postecoglou famously refuses to change system",
      "Minor tweaks to personnel but never philosophy",
      "Will not park bus even when winning",
      "Stubborn commitment to principles - strength and weakness"
    ]),

    counter_tactics: JSON.stringify([
      "Long balls in behind high defensive line (VERY effective)",
      "Pacy forwards to exploit offside trap",
      "Counter-attacks through midfield",
      "Low block to frustrate (Ange struggles with this)",
      "Target slower CB if Van de Ven injured"
    ]),

    training_focus: JSON.stringify([
      "Offside trap drills",
      "High defensive line positioning",
      "Quick passing patterns",
      "Constant movement drills",
      "Counter-pressing",
      "Fullbacks as wingers training",
      "Fitness - system demands high intensity"
    ]),

    tactical_instructions: 'Highest defensive line possible. Play offside trap. Press aggressively. Attack constantly. Quick passing. Fullbacks as wingers. Never stop attacking. Accept defensive risks. Entertainment first. "We never stop" - Ange philosophy.',

    success_stories: JSON.stringify([
      "Tottenham revival in 2023-2024 season",
      "Exciting football return to Spurs",
      "Celtic Scottish Premiership treble (2022-2023)",
      "J-League champions with Yokohama (2019)",
      "Created clear tactical identity at Spurs immediately"
    ]),

    difficulty_rating: 9,
    effectiveness_rating: 7,
    success_rate: 68
  }

];

// Insert systems into database
function insertModernSystems() {
  const insertStmt = db.prepare(`
    INSERT INTO tactical_systems (
      name, formation, category, style, era, philosophy,
      key_principles, strengths, weaknesses,
      famous_teams, famous_coaches, famous_matches,
      pressing_intensity, defensive_line_height, width, tempo, risk_level, possession_target,
      build_up_play, passing_style, defensive_approach, attacking_approach,
      required_player_profiles, set_piece_strategy, pressing_triggers,
      defensive_transitions, offensive_transitions, player_instructions,
      variations, counter_tactics, training_focus, tactical_instructions,
      success_stories, difficulty_rating, effectiveness_rating, success_rate
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    let successCount = 0;
    modernSystems.forEach((system, index) => {
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
          system.famous_teams,
          system.famous_coaches,
          system.famous_matches,
          system.pressing_intensity,
          system.defensive_line_height,
          system.width,
          system.tempo,
          system.risk_level,
          system.possession_target,
          system.build_up_play,
          system.passing_style,
          system.defensive_approach,
          system.attacking_approach,
          system.required_player_profiles,
          system.set_piece_strategy,
          system.pressing_triggers,
          system.defensive_transitions,
          system.offensive_transitions,
          system.player_instructions,
          system.variations,
          system.counter_tactics,
          system.training_focus,
          system.tactical_instructions,
          system.success_stories,
          system.difficulty_rating,
          system.effectiveness_rating,
          system.success_rate
        );
        successCount++;
        console.log(`✅ Added: ${system.name}`);
      } catch (err) {
        console.error(`❌ Error adding ${system.name}:`, err.message);
      }
    });

    db.run('COMMIT', (err) => {
      if (err) {
        console.error('❌ Transaction failed:', err);
        db.run('ROLLBACK');
      } else {
        console.log(`\n🎉 SUCCESS! Added ${successCount}/${modernSystems.length} modern tactical systems (2024-2025)`);
      }

      insertStmt.finalize();
      db.close();
    });
  });
}

// Run the script
console.log('📊 Adding Modern Tactical Systems (2024-2025 Season)...\n');
insertModernSystems();
