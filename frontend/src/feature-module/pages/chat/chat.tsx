import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { useChat } from "../../../core/hooks/useChat";
import { useAuth } from "../../../core/hooks/useAuth";
import { Tooltip } from "antd";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import type { Message } from "../../../core/services/chatService";

const Chat = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { user } = useAuth();
  const { 
    messages, 
    loading, 
    error, 
    sendMessage, 
    deleteMessage, 
    replyTo, 
    setReplyTo 
  } = useChat(conversationId);
  
  const [messageText, setMessageText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    await sendMessage(messageText);
    setMessageText("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await sendMessage(file.name, file);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = (message: Message) => {
    const isOwnMessage = message.sender_id === user?.id;
    const messageTime = formatTime(message.timestamp);
  
  return (
      <div key={message.id} className={`chats ${isOwnMessage ? 'chats-right' : ''}`}>
        {!isOwnMessage && (
                <div className="chat-avatar">
                  <ImageWithBasePath
                    src="assets/img/profiles/avatar-06.jpg"
                    className="rounded-circle"
              alt="avatar"
                  />
                </div>
        )}
        
                <div className="chat-content">
          <div className={`chat-profile-name ${isOwnMessage ? 'text-end' : ''}`}>
                    <h6>
              {isOwnMessage ? 'You' : 'Other User'}
                      <i className="ti ti-circle-filled fs-7 mx-2" />
              <span className="chat-time">{messageTime}</span>
              {isOwnMessage && (
                      <span className="msg-read success">
                        <i className="ti ti-checks" />
                      </span>
              )}
                    </h6>
                  </div>
          
                  <div className="chat-info">
                    <div className="message-content">
              {message.message_type === 'file' ? (
                    <div className="file-attach">
                      <span className="file-icon">
                        <i className="ti ti-files" />
                      </span>
                      <div className="ms-2 overflow-hidden">
                    <h6 className="mb-1">{message.file_name || 'File'}</h6>
                    <p>{message.file_size ? `${(message.file_size / 1024).toFixed(2)} KB` : 'Unknown size'}</p>
                      </div>
                  <Link to={message.file_url || '#'} className="download-icon">
                        <i className="ti ti-download" />
                      </Link>
                    </div>
              ) : (
                message.content
              )}
                          </div>
            
                    <div className="chat-actions">
                      <Link className="#" to="#" data-bs-toggle="dropdown">
                        <i className="ti ti-dots-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-end p-3">
                        <li>
                          <Link
                            className="dropdown-item"
                    onClick={() => setReplyTo(message)} 
                            to="#"
                  >
                            <i className="ti ti-arrow-back-up me-2" />
                            Reply
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="ti ti-arrow-forward-up-double me-2" />
                            Forward
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="ti ti-file-export me-2" />
                            Copy
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                    onClick={() => deleteMessage(message.id)}
                            to="#"
                          >
                            <i className="ti ti-trash me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
        
        {isOwnMessage && (
                <div className="chat-avatar">
                  <ImageWithBasePath
                    src="assets/img/profiles/avatar-17.jpg"
                    className="rounded-circle dreams_chat"
              alt="avatar"
                  />
                </div>
        )}
              </div>
    );
  };

  return (
    <>
      <div className="chat chat-messages show" id="middle">
        <div>
          <div className="chat-header">
            <div className="user-details">
              <div className="d-xl-none">
                <Link className="text-muted chat-close me-2" to="#">
                  <i className="fas fa-arrow-left" />
                        </Link>
                      </div>
              <div className="avatar avatar-lg online flex-shrink-0">
                  <ImageWithBasePath
                    src="assets/img/profiles/avatar-06.jpg"
                    className="rounded-circle"
                  alt="avatar"
                  />
                </div>
                        <div className="ms-2 overflow-hidden">
                <h6>Chat</h6>
                <span className="last-seen">Online</span>
                        </div>
                      </div>
            
            <div className="chat-options">
                              <ul>
                                <li>
                  <Tooltip title="Video Call" placement="bottom">
                    <Link to="#" className="btn">
                      <i className="ti ti-video" />
                                  </Link>
                  </Tooltip>
                                </li>
                                <li>
                  <Tooltip title="Voice Call" placement="bottom">
                    <Link to="#" className="btn">
                      <i className="ti ti-phone" />
                                  </Link>
                  </Tooltip>
                                </li>
                                <li>
                  <Tooltip title="More Options" placement="bottom">
                    <Link className="btn no-bg" to="#" data-bs-toggle="dropdown">
                        <i className="ti ti-dots-vertical" />
                      </Link>
                  </Tooltip>
                        </li>
                      </ul>
                    </div>
                  </div>

          <OverlayScrollbarsComponent
            options={{
              scrollbars: {
                autoHide: 'scroll',
                autoHideDelay: 1000,
              },
            }}
            style={{ maxHeight: '88vh' }}
          >
            <div className="chat-body chat-page-group">
              <div className="messages">
                {loading ? (
                  <div className="text-center p-4">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                            </div>
                ) : error ? (
                  <div className="alert alert-danger m-3" role="alert">
                    {error}
                      </div>
                ) : messages.length === 0 ? (
                  <div className="empty-chat-state">
                    <div className="text-center text-muted">
                      <i className="ti ti-message-circle fs-1 mb-3"></i>
                      <p>No messages yet. Start a conversation!</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map(renderMessage)}
                    <div ref={messagesEndRef} />
                  </>
                )}
            </div>
          </div>
          </OverlayScrollbarsComponent>
        </div>

        <div className="chat-footer">
          <form className="footer-form" onSubmit={handleSendMessage}>
            <div className="chat-footer-wrap">
              <div className="form-item">
                <Link to="#" className="action-circle">
                  <i className="ti ti-microphone" />
                </Link>
              </div>
              
              <div className="form-wrap">
                {replyTo && (
                  <div className="chats reply-chat d-flex">
                    <div className="chat-avatar">
                      <ImageWithBasePath
                        src="assets/img/profiles/avatar-06.jpg"
                        className="rounded-circle"
                        alt="avatar"
                      />
                    </div>
                    <div className="chat-content">
                      <div className="chat-profile-name">
                        <h6>Replying to message</h6>
                      </div>
                      <div className="chat-info">
                        <div className="message-content">
                          <div className="message-reply reply-content">
                            {replyTo.content}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="#"
                      className="close-replay"
                      onClick={() => setReplyTo(null)}
                    >
                      <i className="ti ti-x" />
                    </Link>
                  </div>
                )}
                
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type Your Message"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
              </div>
              
              <div className="form-item emoj-action-foot">
                <Link
                  to="#"
                  className="action-circle" 
                  onClick={() => setShowEmoji(!showEmoji)}
                >
                  <i className="ti ti-mood-smile" />
                </Link>
              </div>
              
              <div className="form-item position-relative d-flex align-items-center justify-content-center">
                <Link to="#" className="action-circle file-action position-absolute">
                  <i className="ti ti-folder" />
                </Link>
                <input
                  type="file"
                  className="open-file position-relative"
                  name="files"
                  id="files"
                  onChange={handleFileUpload}
                />
              </div>
              
              <div className="form-btn">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  <i className="ti ti-send" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
