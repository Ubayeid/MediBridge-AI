import React, { useState } from 'react';
import { Card, Input, Button, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './ChatBot.css';

const { TextArea } = Input;
const { Title } = Typography;

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: inputText,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // TODO: Send to backend for analysis
    // Simulated bot response
    setTimeout(() => {
      const botMessage: Message = {
        type: 'bot',
        content: 'I understand you\'re feeling unwell. Let me analyze your symptoms and provide recommendations based on your health history.',
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <Card className="chatbot-container">
      <Title level={3}>Health Assistant</Title>
      
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <div className="input-container">
        <div className="text-input-container">
          <TextArea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe your symptoms or ask a question..."
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={!inputText.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatBot; 