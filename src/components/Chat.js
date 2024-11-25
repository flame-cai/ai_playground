// src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';
import { useAuth } from './AuthContext';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

function mergePunctuations(arr) {
  const result = [];
  let tempWord = ['', ''];

  for (const [fr, en] of arr) {
    if ('.,!?'.includes(fr)) {
      tempWord[0] += fr;
      tempWord[1] += en;
    } else {
      if (tempWord[0]) {
        result.push(tempWord);
        tempWord = ['', ''];
      }
      tempWord = [fr, en];
    }
  }

  if (tempWord[0]) {
    result.push(tempWord);
  }

  return result;
}

const Chat = ({ temperature, maxTokens }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [systemMessage, setSystemMessage] = useState('');
  const messageEndRef = useRef(null);
  const [user, setUser] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setMessages([{
        role: 'assistant',
        content: 'Hello, I am GPT-4. AMA.'
      }]);
    }
  }, [user]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    try {
      const response = await axios.post('https://asia-south1-ppt-tts.cloudfunctions.net/ai-backend/chat', {
        messages: [...messages, userMessage],
        systemMessage,
        temperature: parseFloat(temperature),
        maxTokens: parseInt(maxTokens)
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      // console.log('Chat data:', token);
      // console.log('Server response:', response.data);
      setMessages(prevMessages => [...prevMessages, response.data]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const renderMessage = (content) => {
    if (typeof content === 'string') {
      // Check if content is Markdown with a code block (```language ... ```)
      const codeBlockMatch = content.match(/```(\w+)?\s*([\s\S]*?)\s*```/);
      if (codeBlockMatch) {
        const language = codeBlockMatch[1] || 'text'; // Extract language or default to 'text'
        const codeContent = codeBlockMatch[2].trim(); // Extract content inside the backticks
        return (
          <SyntaxHighlighter language={language} style={docco}>
            {codeContent}
          </SyntaxHighlighter>
        );
      }
  
      // Handle block LaTeX: $$ ... $$
      const latexBlockMatch = content.match(/\$\$([\s\S]*?)\$\$/g);
      if (latexBlockMatch) {
        return (
          <div>
            {content.split(/\$\$([\s\S]*?)\$\$/).map((part, index) =>
              index % 2 === 1 ? <BlockMath math={part.trim()} key={index} /> : <p key={index}>{part}</p>
            )}
          </div>
        );
      }
  
      // Handle inline LaTeX: $ ... $
      const inlineLatexMatch = content.match(/\$(.*?)\$/g);
      if (inlineLatexMatch) {
        return (
          <div>
            {content.split(/\$(.*?)\$/).map((part, index) =>
              index % 2 === 1 ? <InlineMath math={part.trim()} key={index} /> : <span key={index}>{part}</span>
            )}
          </div>
        );
      }
  
      // Check if content is Markdown
      if (content.startsWith('#') || content.includes('**') || content.includes('- ') || content.includes('`')) {
        return <ReactMarkdown>{content}</ReactMarkdown>;
      }
  
      // Render plain text with newlines
      return (
        <div>
          {content.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      );
    }
  
    // Handle JSON objects
    if (typeof content === 'object' && !Array.isArray(content)) {
      return (
        <SyntaxHighlighter language="json" style={docco}>
          {JSON.stringify(content, null, 2)}
        </SyntaxHighlighter>
      );
    }
  
    // Handle Arrays (e.g., for lists)
    if (Array.isArray(content)) {
      return (
        <ul>
          {content.map((item, index) => (
            <li key={index}>{renderMessage(item)}</li>
          ))}
        </ul>
      );
    }
  
    // Render fallback for unhandled types
    return <p>Unsupported content type</p>;
  };
  
  return (
    <div className="chat-container">
      <h1>Conversation Tool</h1>
      <hr />

      <div className="p-4 mb-4 border rounded sys-msg">
        <h2 className="text-lg font-semibold mb-2">System Message:&nbsp;</h2>
        <textarea
          className="w-full p-2 border rounded"
          value={systemMessage}
          onChange={(e) => setSystemMessage(e.target.value)}
          placeholder="Enter system message here..."
          rows="1"
          style={{ resize: "none" }}
        />
      </div>

      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.role}-row`}>
            {msg.role === 'assistant' && (
              <div className="profile-picture-container">
                <img src='logo192.png' alt={`${msg.role} profile picture`} className={`profile-picture`} />
              </div>
            )}
            <div className={`message ${msg.role}`}>
              {renderMessage(msg.content)}
            </div>
            {msg.role !== 'assistant' && (
              <div className="profile-picture-container">
                <img src='flame_img.jpeg' alt={`${msg.role} profile picture`} className={`profile-picture`} />
              </div>
            )}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="input-container" style={{ width: "100%" }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          rows={3}
          style={{ resize: "none", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Chat;
