import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Upload, message, Spin } from 'antd';
import { SendOutlined, AudioOutlined, CameraOutlined, LoadingOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

interface Message {
  id: string;
  text: string;
  type: 'user' | 'bot';
  timestamp: Date;
  imageUrl?: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() && fileList.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');
    setFileList([]);
    setIsProcessing(true);

    try {
      // TODO: Implement API call to process message
      // Simulated bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Based on your symptoms, I recommend consulting with a healthcare provider. Would you like me to help you schedule an appointment?',
          type: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      message.error('Failed to process message');
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        // TODO: Implement speech-to-text processing
        // For now, we'll just display a message about the audio file size
        const fileSizeInMB = audioBlob.size / (1024 * 1024);
        setInput(`Voice recording captured (${fileSizeInMB.toFixed(2)} MB). Processing...`);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      message.error('Failed to start recording');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      // TODO: Implement image analysis
      const newMessage: Message = {
        id: Date.now().toString(),
        text: 'Uploaded image for analysis',
        type: 'user',
        timestamp: new Date(),
        imageUrl: URL.createObjectURL(file),
      };
      setMessages([...messages, newMessage]);
      return false;
    } catch (error) {
      message.error('Failed to process image');
      return false;
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {msg.imageUrl && (
                <img
                  src={msg.imageUrl}
                  alt="Uploaded"
                  className="max-w-full h-auto rounded-lg mb-2"
                />
              )}
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs opacity-75">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <Upload
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={handleImageUpload}
            maxCount={1}
          >
            <Button icon={<CameraOutlined />} />
          </Upload>
          <Button
            icon={<AudioOutlined />}
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            danger={isRecording}
          />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSend}
            placeholder="Type your message..."
            disabled={isRecording}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={!input.trim() && fileList.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot; 