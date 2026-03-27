# 🐍 Snake Game

A classic Snake game with modern features, smooth animations, and responsive design.

## 🙏 Credits & Support

Built with ❤️ using Claude Code (AI programming assistant). Every tool I create helps me grow as a developer and build my portfolio.

**Support this project:**

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="250" height="70"/>](https://buymeacoffee.com/arpitg)

Your contribution helps me continue building tools, learning new technologies, and creating amazing projects for the community!

## 👤 Developer

**Arpit Gupta**
- Building daily tools to showcase LLM capabilities
- 📍 Location: India
- 🎯 Focus: Full-stack development, AI-powered tools

---

## Features

- 🎮 **10 Difficulty Levels**: Easy (Level 1) to Hard (Level 10) - choose your pace
- 📱 **Mobile Friendly**: Touch controls with directional buttons on screen
- 🌟 **Power-ups**: Speed boost (🔵) and invincibility (💜) items with visual notifications
- 🎯 **Level System**: Difficulty increases every 50 points, obstacles spawn with levels
- 🔊 **Sound Effects**: Immersive audio feedback for eating, power-ups, and game over
- 💾 **High Score**: Persists across sessions via localStorage
- 🎨 **Modern Design**: Dark theme with neon accents, glowing effects, and smooth animations
- ⏸️ **Pause Menu**: Dedicated pause interface with resume/restart/quit options
- 🛡️ **Invincibility Power-up**: Become immune to obstacles and your own tail for 5 seconds
- 👀 **Animated Snake**: Eyes on head show direction, pulsing effects on food and power-ups

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
2. Eat the red food to grow and score points (10 × current level)
3. Avoid walls, your own tail, and orange obstacles
4. Collect power-ups for special abilities:
   - 🔵 **Speed Power-up**: Snake moves super fast for 5 seconds (+50 points)
   - 💜 **Invincibility Power-up**: Become immune to obstacles and your tail for 5 seconds (+50 points)
   - Power-ups spawn 10% of the time when food spawns
5. Level up every 50 points - game gets faster, obstacles increase
6. Try to beat your high score!

### Game Mechanics

- **Score**: +10 points per food item (multiplied by current level)
- **Power-ups**: Special items with +50 points, give temporary abilities
- **Obstacles**: Orange blocks that spawn based on level (2 per level)
- **Speed Levels**: 10 difficulty options from 200ms to 60ms per frame
- **High Score**: Saved locally in your browser
- **Invincibility**: Flashing white effect when active, immune to all damage
- **Power-up Notifications**: Pop-up alerts show what power-up you collected

## Running the Game

### Option 1: Open directly in browser (Simple)

Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

**Note**: This works fine for gameplay, but sound effects may not play due to browser autoplay policies.

### Option 2: Python HTTP Server (Recommended)

For the best experience with sound and all features:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Then go to: http://localhost:8000
```

### Option 3: Node.js with http-server

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run the server
http-server -p 8000

# Then go to: http://localhost:8000
```

### Option 4: VS Code Live Server

If you use Visual Studio Code:

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 5: Python - Simple Web Server Module

If you don't know which Python version you have:

```bash
# Just try python first (usually Python 3)
python -m http.server 8000

# If that fails, try python3
python3 -m http.server 8000
```

### Option 6: PHP Built-in Server

If you have PHP installed:

```bash
php -S localhost:8000

# Then go to: http://localhost:8000
```

**Recommendation**: Option 2 (Python) or Option 3 (Node.js) provide the best experience with sound effects and all features enabled.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**MIT License Summary:**
- ✅ Free to use for personal and commercial projects
- ✅ Free to modify and distribute
- ✅ No attribution required (though appreciated!)
- ✅ No warranty - use at your own risk

**Simply means:** You can use this game anywhere, including commercial products, without paying me anything. Just don't sue me if it breaks something! 🎮

## Files

- `index.html` - Game structure and UI
- `styles.css` - Styling and animations
- `game.js` - Game logic and rendering
- `README.md` - This file
- `LICENSE` - MIT License
- `.gitignore` - Git ignore rules

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Tips

- 🎯 **Plan ahead**: Look at the obstacle positions and plan your path
- ⚡ **Save power-ups**: Use speed boost when you're in a tight spot
- 🛡️ **Invincibility**: Great for escaping corners or dense obstacle areas
- 📊 **Check your level**: Higher level = more obstacles, slower speed = better control
- 🧠 **Level 1-3**: Start here to learn the mechanics
- 🚀 **Level 4-7**: Moderate challenge, good balance
- 💀 **Level 8-10**: For experienced players - obstacles everywhere!
- 💾 **High score challenge**: Try to beat your best by saving power-ups wisely
- 🎮 **Mobile**: Tap directional buttons, use pause button if needed

## For Users

**Built with AI**: This tool was created with the help of Claude Code (an AI programming assistant). I've tested it thoroughly on my end and everything is working great! 🎮✨

### Issues & Feedback

If you encounter any problems or find bugs, please feel free to:
- **Open an issue** on GitHub and describe what's not working
- We'll work together to fix it!

### Feature Requests

Have an awesome idea? Want to see something added?
- **Ask us!** We'd love to hear your suggestions and we'll build it for you.
- You can suggest features in an issue or pull request.

### Want to Contribute?

**Love the game? Want to improve it?**

1. Fork this repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit them (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request!

Every contribution helps make this game better for everyone. 🤝

### 💜 Support the Developer

I'm building these tools daily to showcase my skills and demonstrate what's possible with AI assistance. Every coffee helps me stay motivated to continue creating and learning!

If you enjoy this project and want to support my journey:

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="250" height="70"/>](https://buymeacoffee.com/arpitg)

**Your support lets me:**
- 🔨 Keep building tools and sharing knowledge
- 📚 Learn new technologies every day
- 💼 Build a portfolio that stands out
- 🚀 Create even more awesome projects

Thank you for your support! 🙏

---

Enjoy the game! 🎮🐍

*Built with ❤️ and AI assistance*