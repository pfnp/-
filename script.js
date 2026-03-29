body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #1c1c1c, #2a2a2a);
  display: flex;
  justify-content: center;
  margin-top: 40px;
  color: white;
}

.app {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(20px);
  padding: 20px;
  border-radius: 16px;
  width: 380px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}

h1 {
  text-align: center;
  font-weight: 500;
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

input {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: rgba(255,255,255,0.1);
  color: white;
}

button {
  padding: 8px 10px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg,#4cafef,#6a5cff);
  color: white;
  cursor: pointer;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  font-weight: 500;
}

canvas {
  display: block;
  margin: 0 auto 15px;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 6px;
  background: rgba(255,255,255,0.05);
}

.actions {
  display: flex;
  gap: 5px;
}

.small-btn {
  background: rgba(255,255,255,0.1);
  border-radius: 6px;
  padding: 4px 6px;
}
