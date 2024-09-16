import { useState, useEffect } from 'react';
import { KeyPop } from './Keyboard';
import './index.css';

const App = () => {
  const [text, setText] = useState<string>('');
  const [lastKey, setLastKey] = useState<string | null>(null);  // Store the last key pressed

  // Handle both virtual keyboard and physical keyboard presses
  const handleKeyPress = (key: string) => {
    if (key === 'Backspace') {
      setText((prev) => prev.slice(0, -1));
    } else if (key === 'Enter') {
      setText((prev) => prev + '\n');
    } else if (key.length === 1) {  // Only append printable characters
      setText((prev) => prev + key);
    }

    // Show the key as "popped up"
    setLastKey(key);

    // Remove the last key after a short delay (500ms)
    setTimeout(() => {
      setLastKey(null);
    }, 500);
  };

  // Listen for physical keyboard key presses
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyPress(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <h1>Key Pop</h1>
      <textarea
        value={text}
        readOnly
        rows={15}
        cols={10}
        style={{
          width: "50rem",
          height: "12rem",
          marginBottom: "2rem",
          padding: "1rem",
          fontSize: "1.2rem",
          resize: "none"
        }}
        className="text-area"
        placeholder="Start typing..."
      />

      {/* Pop-up display for the last key pressed */}
      {lastKey && <div className="key-pop">{lastKey}</div>}

      {/* The on-screen virtual keyboard */}
      <KeyPop />
    </div>
  );
};

export default App;
