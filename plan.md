# Evolutionary Neural Network Training for Brickbreaker

## Overview
Transform the current neural network implementation into an evolutionary reinforcement learning system where multiple neural networks play the game, are evaluated based on performance, and evolve over generations through genetic algorithms.

## Architecture Changes

### 1. Neural Network Enhancements (`src/neural-net/NeuralNet.ts`)
- Add bias matrices (`bias0`, `bias1`) to the network architecture
- Update `feedForward()` to include bias addition at each layer
- Add methods for genetic operations:
  - `copy()`: Create a deep copy of the network
  - `mutate(mutationRate)`: Randomly modify weights/biases
  - `crossover(otherNetwork)`: Combine weights/biases from two networks
- Update constructor to initialize random biases

### 2. Input/Output Integration (`src/game/Game.ts`)
- Modify `update()` method to call neural network when `automated === true`
- Create `getNeuralNetInputs()` method that returns normalized array:
  - `lastTime` (normalized by max game time)
  - `ballSpeed` (magnitude, normalized)
  - `paddle.position.x` (normalized by game width)
  - `ball.currentPosition.x` (normalized by game width)
  - `ball.currentPosition.y` (normalized by game height)
- Create `applyNeuralNetOutput()` method that:
  - Takes 3 output values from network
  - Interprets highest output as the action (moveLeft, moveRight, or stop)
  - Calls corresponding paddle method

### 3. Population Manager (`src/neural-net/Population.ts` - NEW FILE)
- Create `Population` class to manage multiple neural networks
- Properties:
  - `population: NeuralNetwork[]` (50 networks)
  - `generation: number`
  - `fitnessScores: number[]`
- Methods:
  - `evaluateFitness(gameInstance, networkIndex)`: Run game with network, return fitness score
  - `calculateFitness(bricksDestroyed, timeSurvived)`: Combine metrics
  - `selectTopPerformers(percentage)`: Return top 20% networks
  - `evolve()`: Create next generation via crossover and mutation
  - `getBestNetwork()`: Return highest performing network

### 4. Game State Tracking (`src/game/Game.ts`)
- Add properties to track fitness metrics:
  - `bricksDestroyed: number` (count of destroyed bricks)
  - `gameStartTime: number` (timestamp when game started)
  - `timeSurvived: number` (milliseconds survived)
- Update brick deletion logic to increment `bricksDestroyed`
- Track time survived in `update()` method
- Add `resetFitnessMetrics()` method

### 5. Evolution Controller (`App.ts`)
- Replace single network with `Population` instance
- Create evolution loop:
  - For each generation:
    - Evaluate all 50 networks by running games
    - Calculate fitness scores
    - Select top 20% performers
    - Create next generation through crossover/mutation
    - Display best fitness and generation number
- Add visualization/logging of:
  - Current generation
  - Best fitness score
  - Average fitness score
  - Best network's game performance (optional visual)

### 6. Genetic Algorithm Implementation
- **Crossover**: For each new network, randomly select two parent networks from top 20%, then randomly choose weights/biases from either parent
- **Mutation**: Apply small random changes (e.g., ±0.1) to random weights/biases with probability `mutationRate` (e.g., 0.1)
- **Elitism**: Keep the absolute best network unchanged in next generation

## Implementation Details

### Input Normalization
All inputs should be normalized to [0, 1] range:
- `lastTime`: `Math.min(lastTime / 60000, 1)` (cap at 60 seconds)
- `ballSpeed`: `Math.sqrt(ballSpeed.x² + ballSpeed.y²) / maxSpeed`
- `paddle.position.x`: `paddle.position.x / gameWidth`
- `ball.currentPosition.x`: `ball.currentPosition.x / gameWidth`
- `ball.currentPosition.y`: `ball.currentPosition.y / gameHeight`

### Fitness Function
```
fitness = (bricksDestroyed * 10) + (timeSurvived / 1000)
```
- Bricks destroyed weighted more heavily (10 points each)
- Time survived in seconds (1 point per second)
- Game over when ball falls below paddle

### Output Interpretation
Network outputs 3 values (moveLeft, moveRight, stop). Use argmax (index of highest value) to determine action.

## Files to Create/Modify

1. **Modify**: `src/neural-net/NeuralNet.ts` - Add biases, genetic operations
2. **Modify**: `src/neural-net/interfaces.ts` - Add bias properties to interface
3. **Create**: `src/neural-net/Population.ts` - Population management and evolution
4. **Modify**: `src/game/Game.ts` - Add neural net integration, fitness tracking
5. **Modify**: `App.ts` - Replace single network with population evolution loop
6. **Modify**: `src/neural-net/Matrix.ts` - Fix potential bug in `dot()` method (line 76 uses `m0[i]` instead of `m0.data[i]`)

## Key Considerations

- Games should run headless (no rendering delay) for faster evaluation, or with minimal rendering
- Each network needs a fresh game instance for fair evaluation
- Track and persist best network across generations
- Consider adding early termination if network achieves perfect score

## Implementation Todos

1. Add bias matrices (bias0, bias1) to NeuralNetwork class and update feedForward to include bias addition
2. Implement copy(), mutate(), and crossover() methods in NeuralNetwork class
3. Fix Matrix.dot() method bug on line 76 (use m0.data[i] instead of m0[i])
4. Add bricksDestroyed and timeSurvived tracking to Game class with resetFitnessMetrics() method
5. Implement getNeuralNetInputs() and applyNeuralNetOutput() methods in Game class for automated play
6. Create Population.ts class with evaluateFitness(), selectTopPerformers(), and evolve() methods
7. Update App.ts to use Population class and implement evolution loop with generation tracking

