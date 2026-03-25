# 🐍 Snake Game

A classic Snake game with modern features, smooth animations, and responsive design.

## Features

- 🎮 **Three Difficulty Levels**: Easy, Medium, and Hard
- 📱 **Mobile Friendly**: Touch controls for mobile devices
- 🌟 **Power-ups**: Speed boost and invincibility items
- 🎯 **Level System**: Difficulty increases as you score more points
- 🔊 **Sound Effects**: Immersive audio feedback
- 💾 **High Score**: Persists across sessions
- 🎨 **Modern Design**: Dark theme with neon accents and smooth animations

## How to Play

### Controls

**Desktop:**
- Arrow Keys or WASD: Move the snake
- Space or Escape: Pause/Resume game

**Mobile:**
- On-screen directional buttons: Move the snake
- Pause button: Pause/Resume game

### Gameplay

1. Start the game by clicking "Start Game" or pressing Enter
2. Eat the red food to grow and score points
3. Avoid walls, your own tail, and orange obstacles
4. Collect power-ups for special abilities:
   - 🔵 **Speed Power-up**: Temporary speed boost
   - 💜 **Invincibility Power-up**: Become immune to obstacles and your tail for 5 seconds
5. Level up every 50 points - the game gets faster!
6. Try to beat your high score!

## Game Mechanics

- **Score**: +10 points per food item (multiplied by level)
- **High Score**: Saved locally in your browser
- **Obstacles**: Orange blocks that appear as levels increase
- **Power-ups**: Special items that give temporary abilities

## Running the Game

### Option 1: Open directly in browser

Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Using a local server

For the best experience with sound and all features:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (requires http-server installed)
npx http-server

# Go to http://localhost:8000 in your browser
```

## Files

- `index.html` - Game structure and UI
- `styles.css` - Styling and animations
- `game.js` - Game logic and rendering
- `README.md` - This file

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Tips

- Plan your moves ahead to avoid getting trapped
- Use power-ups strategically when you're in tight situations
- Practice on "Easy" mode to get the hang of it
- The high score challenge will keep you coming back!

## License

Free to use and modify for personal and educational purposes.

---

Enjoy the game! 🎮🐍