---
author: 'https://github.com/schavery/'
cover_image: >-
  https://opengraph.githubassets.com/4f3b86760dd60e323f90ec6bbd89beba2497550be80be00fc1ca6e372855754c/schavery/qup-optimizer
date: '2025-12-08T06:25:17.667Z'
dateFolder: 2025/12/08
description: >-
  Contribute to schavery/qup-optimizer development by creating an account on
  GitHub.
isBasedOn: 'https://github.com/schavery/qup-optimizer/blob/main/README.md'
link: 'https://github.com/schavery/qup-optimizer/blob/main/README.md'
slug: 2025-12-08-httpsgithubcomschaveryqup-optimizerblobmainreadmemd
tags:
  - gaming
title: qup-optimizer/README.md at main · schavery/qup-optimizer · GitHub
---
<h2>Expand file tree</h2>
<p>More file actions</p>
<p>More file actions</p>
<h1>Qup Skill Tree Optimizer</h1>
<p>A comprehensive optimization system for finding optimal skill tree configurations for high-rank play in Qup, where massive Qdown penalties (-700K+ at Grandmaster 1) make strategic positioning and upgrade choices critical.</p>
<h2>Quick Start</h2>
<h3>Web Interface (Recommended)</h3>
<pre># Install Python dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend
npm install
cd ..

# Start the web server (runs on port 5001)
python app.py</pre>
<p>Then open <strong><a href="http://localhost:5001">http://localhost:5001</a></strong> in your browser for an interactive hex grid editor with real-time simulation.</p>
<h2>Screenshot</h2>
<figure><a href="https://github.com/schavery/qup-optimizer/blob/main/frontend/screenshots/webview.png"><img alt="Qup Skill Tree Optimizer Web Interface" src="https://github.com/schavery/qup-optimizer/raw/main/frontend/screenshots/webview.png"/></a></figure>
<p><em>Interactive hex grid with node drawer, upgrade panel, and real-time simulation results. Features include drag-and-drop node placement, adjacency trigger visualization, and localStorage persistence.</em></p>
<p>For development with hot-reload:</p>
<pre># Terminal 1: Start Flask backend
python app.py

# Terminal 2: Start Vite dev server
cd frontend
npm run dev
# Open http://localhost:3000</pre>
<h3>Command Line Interface</h3>
<pre># Basic position optimization
python -m optimizer.main --candidates 20 --rank 31 --top 5

# Upgrade point optimization (18 points)
python -m optimizer.optimize_upgrades --budget 18 --top 5

# Debug trigger efficiency
python debug_panic_efficiency.py</pre>
<h2>Problem Statement</h2>
<p>At Grandmaster ranks (31+):</p>
<ul> <li><strong>Qdown on loss</strong>: -700,000 Q (rank 31), scaling exponentially</li> <li><strong>Only 14 movable nodes</strong> to place on 210+ available positions</li> <li><strong>18 upgrade points</strong> to spend across 7 static nodes</li> <li><strong>Goal</strong>: Maximize worst-case Q to survive all match outcomes</li> </ul>
<h2>Key Mechanics</h2>
<h3>Node Types</h3>
<ul> <li><strong>Static Nodes (7)</strong>: Fixed positions, have upgrade paths (Panic, EMT, Triage, etc.)</li> <li><strong>Movable Nodes (14)</strong>: Flexible positioning (Angel, Focus, Surgeon, etc.)</li> </ul>
<h3>Trigger Cascades</h3>
<ul> <li><strong>Panic</strong>: Triggers ALL adjacent nodes (cascade engine)</li> <li><strong>AVS (Activation Stock)</strong>: Limits triggers per flip, resets each flip</li> <li><strong>Trigger chains</strong>: Panic → Focus → Panic → Stimulant → ... until AVS depleted</li> <li><strong>Best observed</strong>: 59 triggers in a single flip!</li> </ul>
<h3>Critical Strategy</h3>
<ol> <li><strong>Position trigger nodes adjacent to Panic</strong> for feedback loops</li> <li><strong>Place Angel in outer rings</strong> to trigger last (captures all Qdown prevention)</li> <li><strong>Balance Panic AVS vs adjacent node AVS</strong> to minimize wasted triggers</li> </ol>
<h2>Architecture</h2>
<h3>Backend (Python)</h3>
<pre><code>optimizer/
├── adjacency_generator.py    # Smart position generation (Panic clusters + Angel)
├── candidate_generator.py    # Basic position generation (ring-based)
├── upgrade_generator.py      # Upgrade configuration generation
├── evaluator.py              # Simulate &amp; score layouts (with caching)
├── local_search.py           # NEW: Iterative refinement via local search
├── layout_ops.py             # NEW: Layout manipulation utilities (swap, rotate)
├── visualizer.py             # Display results (hex grids, Q spectra)
├── main.py                   # Position optimization CLI (with refinement)
└── optimize_upgrades.py      # Upgrade optimization CLI

core/
├── game_state.py        # Game state (Q, BB, qmult, triggers, xp, gold)
├── node.py              # Node definitions &amp; instances
├── hex_grid.py          # Hex coordinate system
└── layout.py            # Grid layout configuration

data/
├── nodes.py            # All node definitions (static + movable)
└── ranks.py            # Complete rank progression (40 ranks)

api/
├── routes.py           # Flask REST API endpoints
└── serializers.py      # JSON serialization helpers

simulator.py            # Core game simulation engine
effects/executor.py     # Effect handlers (Qdown, triggers, etc.)
app.py                  # Flask application (port 5001)
requirements.txt        # Python dependencies
</code></pre>
<h3>Frontend (Vue.js 3)</h3>
<pre><code>frontend/
├── index.html          # HTML entry point
├── vite.config.js      # Vite build configuration
├── package.json        # npm dependencies
└── src/
    ├── main.js         # Vue app initialization
    ├── App.vue         # Root component with state management
    ├── components/
    │   ├── HexGrid.vue       # SVG hex grid with zoom/click-to-place
    │   ├── UpgradePanel.vue  # Upgrade sliders + optimizer UI
    │   └── ResultsPanel.vue  # Simulation results visualization
    └── utils/
        ├── api.js            # API client wrapper (axios)
        └── hexMath.js        # Hex coordinate math (cube coords)
</code></pre>
<h2>Features</h2>
<h3>0. Web Interface</h3>
<p><strong>Interactive hex grid visualization with real-time simulation</strong></p>
<p><strong>Key Features:</strong></p>
<ul> <li><strong>Click-to-place nodes</strong>: Click a movable node, then click a hex to place it</li> <li><strong>Full node names</strong>: No abbreviations - see complete names on the grid</li> <li><strong>Upgrade optimizer</strong>: Click "Optimize" → "Generate Top 5" to see best upgrade configs</li> <li><strong>Initial BB input</strong>: Set your starting battle bonus (persists across games)</li> <li><strong>Rank selector</strong>: Choose from 40 ranks (Bronze 1 → Legend 5)</li> <li><strong>Live Qdown display</strong>: See penalty for current rank in header</li> <li><strong>Randomize layout</strong>: Generate optimized position layouts with one click</li> <li><strong>Zoom controls</strong>: Mouse wheel or +/- buttons to zoom in/out</li> <li><strong>60° rotated grid</strong>: Node order 1 (Battle Medic) points north</li> </ul>
<p><strong>Interactive Controls:</strong></p>
<ul> <li><strong>Upgrade sliders</strong>: Adjust upgrade points for each static node (18 point budget)</li> <li><strong>Real-time evaluation</strong>: Results update automatically after changes (500ms debounce)</li> <li><strong>Visual adjacency</strong>: Click hexes to highlight neighbors (shows trigger relationships)</li> <li><strong>Results panel</strong>: Q outcome spectrum for all 20 round outcomes, trigger metrics, efficiency</li> <li><strong>Generate Optimized Layout</strong>: Uses iterative refinement (generates 20 candidates, refines top 5) - shows cache stats in console</li> </ul>
<p><strong>API Endpoints</strong>:</p>
<ul> <li><code>GET /api/nodes</code> - All node definitions (static + movable)</li> <li><code>POST /api/evaluate</code> - Evaluate layout with upgrades, rank, and initial BB</li> <li><code>POST /api/generate-layouts</code> - Generate optimized candidate layouts <strong>with iterative refinement</strong> <ul> <li>Parameters: <code>count</code>, <code>rank</code>, <code>seed</code>, <code>upgrades</code>, <code>initial_bb</code>, <code>refine</code>, <code>refine_count</code>, <code>refine_iterations</code></li> <li>Returns: layouts array, cache_stats (hit rate, total evaluations), refined_count</li> </ul> </li> <li><code>POST /api/generate-upgrades</code> - Generate upgrade configurations (tiered or exhaustive)</li> <li><code>GET /api/outcomes</code> - All possible round outcome sequences</li> <li><code>GET /api/ranks</code> - Complete rank progression data (1-40)</li> <li><code>GET /api/rank/&lt;rank&gt;</code> - Specific rank rewards and penalties</li> </ul>
<p><strong>Tech Stack</strong>: Flask + Vue.js 3 + Vite + SVG hex rendering</p>
<p><strong>Port Configuration</strong>: Runs on port 5001 (avoid macOS AirPlay Receiver conflict)</p>
<h3>1. Iterative Position Refinement with Local Search</h3>
<p><strong>NEW</strong>: Intelligent layout improvement through iterative refinement!</p>
<p><strong>Strategy</strong>: Two-phase optimization</p>
<ol> <li><strong>Broad exploration</strong>: Generate 100 random layouts with Panic clustering</li> <li><strong>Local refinement</strong>: Improve top 10 diverse candidates using local search</li> </ol>
<p><strong>Domain-aware refinement operations</strong>:</p>
<ul> <li><strong>Node swaps</strong>: Move trigger nodes to optimize cluster configuration</li> <li><strong>Cluster rotation</strong>: Rotate groups of nodes around Panic (60° increments)</li> <li><strong>Angel positioning</strong>: Move Angel into/out of trigger cluster dynamically</li> </ul>
<p><strong>Key insights</strong>:</p>
<ul> <li><strong>Angel in trigger cluster</strong>: High variance - loses more in worst case but <strong>massively positive on average</strong> (18/20 positive outcomes, avg +43.7M Q)</li> <li><strong>Angel in outer rings</strong>: Low variance - safer worst case but negative average (-574K avg Q, 1/20 positive)</li> <li><strong>Evaluation caching</strong>: 60-72% cache hit rate reduces redundant simulations</li> </ul>
<p><strong>Usage</strong>:</p>
<pre># With refinement (default)
python -m optimizer.main --candidates 100 --refine-count 10 --top 10 --detailed 3

# Without refinement (old behavior)
python -m optimizer.main --no-refine --candidates 100

# More aggressive refinement
python -m optimizer.main --refine-count 20 --refine-iterations 100 --verbose-refine</pre>
<p><strong>Output</strong>:</p>
<ul> <li>Top N layouts ranked by: worst-case Q → efficiency → adjacency score → avg Q</li> <li>Hex grid visualization showing node positions</li> <li>Complete Q spectrum for all 20 round outcomes (WWW, WWLLL, etc.)</li> <li>Trigger counts and efficiency metrics</li> <li>Cache statistics (hit rate, total evaluations)</li> <li>Per-candidate improvement tracking</li> </ul>
<p><strong>Performance</strong>:</p>
<ul> <li>Typical improvements: <strong>+3M to +320M</strong> min_q per refined candidate</li> <li>Cache efficiency: 60-72% hit rate (7,000+ cache hits / 10,000+ evaluations)</li> <li>Refinement time: ~10-30 seconds for 10 candidates × 50 iterations</li> </ul>
<h3>2. Upgrade Point Optimization</h3>
<p><strong>Strategy</strong>: Find best way to spend upgrade points</p>
<ul> <li>Tests 100+ upgrade configurations</li> <li>For each config, evaluates 3-5 position layouts</li> <li>Ranks by worst-case Q and trigger efficiency</li> </ul>
<p><strong>Usage</strong>:</p>
<pre>python -m optimizer.optimize_upgrades --budget 18 --rank 31 --top 5 --strategy tiered</pre>
<p><strong>Key Findings</strong> (18 points):</p>
<ul> <li><strong>Panic [6,0]</strong>: Always in top configs (6 points = 7 AVS total)</li> <li><strong>EMT [3,3]</strong>: Full BB scaling crucial (6 points)</li> <li><strong>Stop the Bleeding [3,0]</strong>: Flat Qdown reduction (3 points)</li> <li><strong>BUT</strong>: 45-52% of triggers wasted on depleted nodes!</li> </ul>
<h3>3. Trigger Efficiency Tracking</h3>
<p><strong>Innovation</strong>: Measures wasted triggers on depleted nodes</p>
<p><strong>Metrics</strong>:</p>
<ul> <li><code>total_triggers</code>: Successful node triggers</li> <li><code>depleted_triggers</code>: Attempts that hit depleted nodes (wasted)</li> <li><code>efficiency</code>: <code>total / (total + depleted)</code></li> </ul>
<p><strong>Key Insight</strong>: Maxing Panic creates massive cascades but wastes 50%+ of late-game triggers because adjacent nodes run out of AVS within the same flip.</p>
<p><strong>Debug Tool</strong>:</p>
<pre>python debug_panic_efficiency.py</pre>
<p>Shows exact sequence of Panic triggers and which adjacent nodes are depleted.</p>
<h3>4. Comprehensive Rank System</h3>
<p><strong>40 Ranks Across 8 Tiers</strong>:</p>
<ul> <li>Bronze (1-5): -100 to -200 Qdown</li> <li>Silver (6-10): -500 to -1,200 Qdown</li> <li>Gold (11-15): -2,750 to -7,500 Qdown</li> <li>Platinum (16-20): -15K to -57.5K Qdown</li> <li>Diamond (21-25): -75K to -127K Qdown</li> <li>Master (26-30): -200K to -362K Qdown</li> <li>Grandmaster (31-35): -700K to -2.7M Qdown</li> <li>Legend (36-40): -2M to -15M Qdown</li> </ul>
<p><strong>Data Source</strong>: Based on observed gameplay data with interpolation</p>
<ul> <li>Qup per flip: Always +100</li> <li>XP and Gold scale with rank</li> <li>Exponential Qdown growth at high ranks</li> </ul>
<p><strong>Implementation</strong>: <code>data/ranks.py</code> with complete reward/penalty tables</p>
<h3>5. Simulation Engine</h3>
<p><strong>Features</strong>:</p>
<ul> <li>Simulates all 20 possible round outcomes (best-of-5)</li> <li>Handles recursive trigger cascades with AVS checking</li> <li>Tracks: Q currency, qmult, battle bonus, triggers, efficiency</li> <li>Proper trigger order: spiral outward from center</li> <li><strong>Battle Bonus persistence</strong>: BB carries across flips, rounds, and games</li> <li><strong>Round multipliers</strong>: 2x Qup/gold/xp on win, 2x Qdown on loss</li> </ul>
<p><strong>Battle Bonus Mechanics</strong>:</p>
<ul> <li>Increments by 1 on each loss flip</li> <li>Nodes like Adrenaline add +1 BB per trigger</li> <li>Resets to 0 on wins (AFTER node evaluation, not before)</li> <li>Used by Battle Medic to multiply qmult</li> <li>Persists between games (set via "Initial BB" input)</li> </ul>
<p><strong>Example Flow</strong> (single loss flip with BB=3):</p>
<ol> <li>Reset all node AVS counters</li> <li>BB increments: 3 → 4</li> <li>Set <code>q_this_flip = -700,000</code> (base Qdown)</li> <li>Trigger "flip" nodes (spiral order)</li> <li>Trigger "loss" nodes (spiral order) <ul> <li>Angel of Death: <code>qmult *= 3</code></li> <li>Panic: Triggers all 5-6 adjacent nodes</li> <li>Adrenaline triggers: BB increments to 5, 6, 7...</li> <li>Battle Medic uses BB in qmult calculation</li> <li>Those nodes trigger Panic back → cascade</li> </ul> </li> <li>Apply qmult: <code>q_currency += q_this_flip * qmult</code></li> <li>If win: BB resets to 0 (otherwise persists)</li> </ol>
<p><strong>Upgrade Path Bug Fix</strong>:</p>
<ul> <li>Fixed non-AVS upgrade attributes to replace instead of accumulate</li> <li>AVS increases remain additive as intended</li> <li>Affects: Battle Medic effect_mult, EMT bb_multiplier, all node-specific bonuses</li> </ul>
<h2>Results at Grandmaster 1 (Rank 31)</h2>
<h3>Best Configuration Found (With Refinement)</h3>
<p><strong>Strategy</strong>: Angel in trigger cluster for massive Q gains</p>
<p><strong>Position Layout</strong>:</p>
<ul> <li><strong>Angel</strong>: Ring 3, adjacent to Panic (-3, 0, 3)</li> <li><strong>Trigger cluster</strong>: Low Point, Adrenaline, Extra Dose, Angel of Death all near Panic</li> <li><strong>Angel triggers</strong>: 93-114 per outcome (vs 33-45 with Angel outer)</li> </ul>
<p><strong>Performance</strong> (No upgrades):</p>
<ul> <li><strong>Min Q</strong>: -5.2M (worst case WLWLL)</li> <li><strong>Avg Q</strong>: +43.8M (positive on average!)</li> <li><strong>Max Q</strong>: +109.7M (best case WLWLW)</li> <li><strong>Positive outcomes</strong>: 18/20 (90% success rate)</li> <li><strong>Efficiency</strong>: 87.9%</li> </ul>
<h3>Angel Positioning Strategy Comparison</h3>
<table> <tr> <th>Metric</th> <th>Angel Outer (Ring 7-8)</th> <th>Angel in Cluster (Ring 3-4)</th> </tr> <tbody> <tr> <td><strong>Min Q (worst case)</strong></td> <td>-804K</td> <td>-5.2M</td> </tr> <tr> <td><strong>Avg Q</strong></td> <td>-574K</td> <td><strong>+43.8M</strong> ✓</td> </tr> <tr> <td><strong>Max Q</strong></td> <td>+150K</td> <td>+109.7M</td> </tr> <tr> <td><strong>Positive outcomes</strong></td> <td>1/20 (5%)</td> <td><strong>18/20 (90%)</strong> ✓</td> </tr> <tr> <td><strong>Avg triggers/outcome</strong></td> <td>80-90</td> <td><strong>93-114</strong> ✓</td> </tr> <tr> <td><strong>Angel triggers</strong></td> <td>1-2 per round</td> <td><strong>30-50 per round</strong> ✓</td> </tr> <tr> <td><strong>Strategy</strong></td> <td>Safe, low variance</td> <td>High risk, high reward</td> </tr> </tbody> </table>
<p><strong>Key Insight</strong>: Angel in trigger cluster creates <strong>massive positive Q</strong> in most scenarios (90% success) by getting triggered repeatedly. The tradeoff is a worse worst-case, but the average case is <strong>78x better</strong> (+43.8M vs -574K).</p>
<h3>Refinement Impact</h3>
<p><strong>Typical improvements per candidate</strong>:</p>
<ul> <li>Best: +321.8M min_q (from -327M to -5.2M)</li> <li>Average: +3M to +150M per candidate</li> <li>All 10/10 candidates improved through local search</li> </ul>
<p><strong>Refinement operations</strong>:</p>
<ul> <li>Node swaps: 50-100 per candidate</li> <li>Cluster rotations: 10-20 per candidate</li> <li>Cache hit rate: 60-72% (avoids redundant simulations)</li> </ul>
<h3>Key Tradeoffs</h3>
<table> <tr> <th>Metric</th> <th>High Panic AVS (6-7)</th> <th>Low Panic AVS (3-4)</th> </tr> <tbody> <tr> <td>Total Triggers</td> <td>35-50 per flip</td> <td>20-30 per flip</td> </tr> <tr> <td>Efficiency</td> <td>45-52%</td> <td>60-75%</td> </tr> <tr> <td>Q Outcomes</td> <td>Better (more cascades)</td> <td>Worse (fewer cascades)</td> </tr> <tr> <td>Wasted Triggers</td> <td>High (50%+)</td> <td>Low (25-40%)</td> </tr> </tbody> </table>
<p><strong>Recommendation</strong>: Angel-in-cluster strategy with iterative refinement produces massively positive average Q. Accept the worse worst-case for 90% positive outcomes.</p>
<h2>File Reference</h2>
<h3>Debug/Test Scripts</h3>
<ul> <li><code>debug_panic_efficiency.py</code> - Analyze Panic trigger efficiency</li> <li><code>debug_single_flip.py</code> - Detailed single-flip logging</li> <li><code>test_triggers.py</code> - Test trigger clustering</li> </ul>
<h3>Data Files</h3>
<ul> <li><code>data/nodes.py</code> - All node definitions (NODES + MOVABLE_NODES)</li> <li><code>data/ranks.py</code> - Complete rank progression system (40 ranks)</li> <li><code>rank_notes.txt</code> - Observed rank data from gameplay</li> </ul>
<h3>API Files</h3>
<ul> <li><code>api/routes.py</code> - Flask REST API endpoints</li> <li><code>api/serializers.py</code> - JSON serialization for dataclasses</li> <li><code>app.py</code> - Flask application entry point (port 5001)</li> </ul>
<h3>Frontend Files</h3>
<ul> <li><code>frontend/src/App.vue</code> - Main Vue application</li> <li><code>frontend/src/components/HexGrid.vue</code> - SVG hex grid with zoom/pan</li> <li><code>frontend/src/components/UpgradePanel.vue</code> - Upgrade sliders + optimizer</li> <li><code>frontend/src/components/ResultsPanel.vue</code> - Simulation results display</li> <li><code>frontend/src/utils/hexMath.js</code> - Hex coordinate math (60° rotated)</li> <li><code>frontend/src/utils/api.js</code> - API client wrapper</li> </ul>
<h2>Advanced Usage</h2>
<h3>Generate More Candidates</h3>
<pre># Test 500 layouts with 10 detailed results
python -m optimizer.main --candidates 500 --top 20 --detailed 10</pre>
<h3>Test Specific Upgrades</h3>
<pre># Manual upgrade config via JSON
python -m optimizer.main --upgrades '{"Panic": [6,0], "EMT": [3,3]}' --candidates 50</pre>
<h3>Exhaustive Upgrade Search</h3>
<pre># Generate ALL valid configs (slow but comprehensive)
python -m optimizer.optimize_upgrades --budget 18 --strategy exhaustive</pre>
<h2>Technical Notes</h2>
<h3>Hex Grid Coordinates</h3>
<ul> <li>Uses cube coordinates: <code>(q, r, s)</code> where <code>q + r + s = 0</code></li> <li>Distance from center: <code>max(|q|, |r|, |s|)</code></li> <li>Spiral order: Center outward, determines trigger priority</li> </ul>
<h3>Trigger Order Within Flip</h3>
<ol> <li>Type priority: "flip" nodes first, then "win" or "loss"</li> <li>Spatial order: Spiral from center outward</li> <li>Cascade order: Depth-first recursion with AVS checking</li> </ol>
<h3>AVS Reset Behavior</h3>
<p><strong>Critical</strong>: AVS resets EVERY flip, not per round</p>
<ul> <li>Panic with 7 AVS can trigger 7 times PER FLIP</li> <li>Adjacent nodes also reset each flip</li> <li>Efficiency waste happens WITHIN a single flip</li> </ul>
<h2>Recent Improvements (2025)</h2>
<h3>Iterative Refinement System (NEW!)</h3>
<ul> <li>✅ <strong>Local search optimizer</strong> - Iteratively improve layouts via node swaps and rotations</li> <li>✅ <strong>Evaluation caching</strong> - 60-72% cache hit rate during refinement</li> <li>✅ <strong>Diverse candidate selection</strong> - Pick top layouts across multiple metrics (min_q, avg_q, adjacency, efficiency)</li> <li>✅ <strong>Domain-aware operations</strong> - Angel positioning, trigger cluster optimization, EMT proximity</li> <li>✅ <strong>Cluster rotation</strong> - Rotate groups of nodes around Panic in 60° increments</li> <li>✅ <strong>Angel-in-cluster strategy</strong> - Place Angel adjacent to Panic for 90% positive outcomes</li> <li>✅ <strong>Layout manipulation utilities</strong> - Swap nodes, rotate clusters, validate layouts</li> <li>✅ <strong>Performance tracking</strong> - Show improvement per candidate, cache statistics</li> </ul>
<h3>Web Interface</h3>
<ul> <li>✅ Interactive hex grid with SVG rendering</li> <li>✅ Click-to-place node positioning</li> <li>✅ Full node names (no abbreviations)</li> <li>✅ Zoom controls (mouse wheel + buttons)</li> <li>✅ 60° grid rotation (Battle Medic points north)</li> <li>✅ Upgrade optimizer with top 5 configs</li> <li>✅ Initial BB input for persistent state</li> <li>✅ Rank selector (40 ranks across 8 tiers)</li> <li>✅ Real-time evaluation with debouncing</li> </ul>
<h3>Simulation Accuracy</h3>
<ul> <li>✅ Fixed BB reset timing (after node evaluation)</li> <li>✅ Battle bonus persistence across games</li> <li>✅ Round multipliers (2x on win/loss)</li> <li>✅ Upgrade path bug fix (replace vs accumulate)</li> <li>✅ Comprehensive rank system with accurate Qdown values</li> </ul>
<h3>API &amp; Data</h3>
<ul> <li>✅ Complete rank progression system (Bronze → Legend)</li> <li>✅ JSON serialization for all dataclasses</li> <li>✅ RESTful API with 8 endpoints</li> <li>✅ Initial BB support throughout simulation chain</li> </ul>
<h2>Limitations</h2>
<p>This optimizer has several intentional scope limitations:</p>
<ul> <li><strong>Single character only</strong>: Simulates Leila (Medic class) in solo play - does not model team members or team interactions</li> <li><strong>Static rank</strong>: Does not simulate rank progression through Q gain - you must manually change rank to test different tiers</li> <li><strong>No XP/leveling</strong>: Does not model XP gain or skill node unlocking - assumes all nodes are already unlocked</li> <li><strong>No items/gear</strong>: Does not account for equipment, items, or gear bonuses that may affect gameplay</li> <li><strong>No meta-progression</strong>: Does not track persistent upgrades or unlocks outside of the skill tree itself</li> </ul>
<p>The focus is purely on <strong>optimizing skill tree layout and upgrade allocation</strong> for a given rank and initial state.</p>
<h2>Future Improvements</h2>
<ol> <li><strong>Simulated Annealing</strong>: Explore global optima beyond local search</li> <li><strong>Multi-Objective Pareto</strong>: Optimize for both worst-case AND average-case Q</li> <li><strong>Layout Comparison</strong>: Side-by-side comparison of multiple layouts in web UI</li> <li><strong>Save/Load Layouts</strong>: Persist layouts to localStorage or URL params</li> <li><strong>Genetic Algorithm</strong>: Evolve layouts over generations with crossover/mutation</li> <li><strong>Adjacent Node AVS Balancing</strong>: Ensure Panic's targets have enough AVS for all triggers</li> <li><strong>Battle Bonus Visualization</strong>: Show BB accumulation timeline in results panel</li> <li><strong>Mobile Responsive</strong>: Optimize layout for smaller screens</li> <li><strong>Upgrade + Position Co-optimization</strong>: Jointly optimize upgrades and positions</li> <li><strong>Angel trigger visualization</strong>: Show exactly when/how often Angel triggers per outcome</li> </ol>
<h2>Credits</h2>
<p>Built to optimize skill tree for Grandmaster rank progression in Qup.</p>
<p>Core insight: Position matters more than raw stats. A well-clustered grid with moderate upgrades outperforms scattered nodes with max upgrades.</p>
