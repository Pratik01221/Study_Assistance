import { FaMicrophone } from 'react-icons/fa';

function ChatInput({ onSendMessage }) {
  const handleSend = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    if (message.trim()) {
      onSendMessage(message);
      e.target.reset();
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSend}>
      <input
        type="text"
        name="message"
        placeholder="Type your message..."
        className="input-field"
      />
      <button type="submit" className="send-btn">Send</button>
      <button type="button" className="voice-btn">
        <FaMicrophone />
      </button>
    </form>
  );
}

export default ChatInput;