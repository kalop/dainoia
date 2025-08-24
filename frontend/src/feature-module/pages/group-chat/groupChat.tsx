import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Tooltip } from "antd";
import CommonGroupModal from "../../../core/modals/common-group-modal";
import { all_routes } from "../../router/all_routes";
import ForwardMessage from "../../../core/modals/forward-message";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { useGroupChat } from "../../../core/hooks/useGroupChat";
import { useAuth } from "../../../core/hooks/useAuth";
import type { GroupMessage } from "../../../core/services/groupChatService";

const GroupChat = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { user } = useAuth();
  const { 
    messages, 
    groupInfo,
    loading, 
    error, 
    sendMessage, 
    deleteMessage, 
    replyTo, 
    setReplyTo 
  } = useGroupChat(groupId);
  
  const [messageText, setMessageText] = useState("");
  const [showEmoji, setShowEmoji] = useState<Record<number, boolean>>({});
  const [showSearch, setShowSearch] = useState(false);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleEmoji = (messageId: number) => {
    setShowEmoji((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

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

  const handleImageClick = (images: string[], startIndex: number = 0) => {
    setLightboxImages(images.map(src => ({ src })));
    setOpenLightbox(true);
  };

  const renderMessage = (message: GroupMessage) => {
    const isOwnMessage = message.sender_id === user?.id;
    const messageTime = formatTime(message.timestamp);
  
  return (
      <div key={message.id} className={`chats ${isOwnMessage ? 'chats-right' : ''}`}>
        {!isOwnMessage && (
                    <div className="chat-avatar">
                      <ImageWithBasePath
              src={message.sender_avatar || "assets/img/profiles/avatar-06.jpg"}
                        className="rounded-circle"
              alt="avatar"
                      />
                    </div>
        )}
        
                    <div className="chat-content">
          <div className={`chat-profile-name ${isOwnMessage ? 'text-end' : ''}`}>
                        <h6>
              {isOwnMessage ? 'You' : message.sender_name}
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
              ) : message.message_type === 'image' ? (
                          <div className="chat-img">
                  {message.images?.map((image: string, index: number) => (
                    <div key={index} className="img-wrap">
                              <ImageWithBasePath
                        src={image}
                        alt={`Image ${index + 1}`}
                              />
                              <div className="img-overlay">
                                <Link
                          onClick={() => handleImageClick(message.images || [], index)}
                                  className="gallery-img"
                                  to="#"
                          title={`Image ${index + 1}`}
                                >
                                  <i className="ti ti-eye" />
                                </Link>
                        <Link to={image} download>
                                  <i className="ti ti-download" />
                                </Link>
                              </div>
                            </div>
                  ))}
                  {message.images && message.images.length > 5 && (
                          <Link
                            className="gallery-img view-all d-flex align-items-center justify-content-center mt-3"
                            to="#"
                      onClick={() => handleImageClick(message.images || [])}
                          >
                            View All Images
                            <i className="ti ti-arrow-right ms-2" />
                          </Link>
                  )}
                                </div>
              ) : message.message_type === 'video' ? (
                          <div className="message-video">
                            <video width={400} controls>
                    <source src={message.video_url} type="video/mp4" />
                              Your browser does not support HTML5 video.
                            </video>
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
                {isOwnMessage && (
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
                )}
                          </ul>
                        </div>
                                </div>
                          </div>
        
        {isOwnMessage && (
                    <div className="chat-avatar">
                      <ImageWithBasePath
              src={user?.avatar_url || "assets/img/profiles/avatar-17.jpg"}
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
                  src={groupInfo?.avatar_url || "assets/img/groups/group-01.jpg"}
                        className="rounded-circle"
                  alt="group"
                      />
                    </div>
              <div className="ms-2 overflow-hidden">
                <h6>{groupInfo?.name || 'Loading...'}</h6>
                <p className="last-seen text-truncate">
                  {groupInfo?.member_count || 0} Member{groupInfo?.member_count !== 1 ? 's' : ''}, 
                  <span className="text-success"> {groupInfo?.online_count || 0} Online</span>
                </p>
                      </div>
                          </div>
            <div className="chat-options">
                                  <ul>
                                    <li>
                  <div className="avatar-list-stacked avatar-group-md d-flex">
                                         {groupInfo?.online_members?.slice(0, 4).map((member: any, index: number) => (
                       <span key={index} className="avatar avatar-rounded">
                                        <ImageWithBasePath
                           src={member.avatar_url || "assets/img/profiles/avatar-06.jpg"}
                           alt="member"
                         />
                       </span>
                     ))}
                    {groupInfo?.member_count && groupInfo.member_count > 4 && (
                                <Link
                        className="avatar bg-primary avatar-rounded text-fixed-white"
                                  to="#"
                                >
                        {groupInfo.member_count - 4}+
                                </Link>
                    )}
                          </div>
                </li>
                <li>
                  <Tooltip title="Search" placement="bottom">
                              <Link
                                to="#"
                      className="btn chat-search-btn"
                      onClick={toggleSearch}
                              >
                      <i className="ti ti-search" />
                              </Link>
                  </Tooltip>
                            </li>
                            <li>
                  <Tooltip title="Group Info" placement="bottom">
                              <Link
                                to="#"
                      className="btn"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#contact-profile"
                              >
                      <i className="ti ti-info-circle" />
                              </Link>
                  </Tooltip>
                              </li>
                              <li>
                                <Link
                    className="btn no-bg"
                                  to="#"
                    data-bs-toggle="dropdown"
                  >
                            <i className="ti ti-dots-vertical" />
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                      <Link to={all_routes.index} className="dropdown-item">
                        <i className="ti ti-x me-2" />
                        Close Group
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#mute-notification"
                              >
                        <i className="ti ti-volume-off me-2" />
                        Mute Notification
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#clear-chat"
                              >
                        <i className="ti ti-clear-all me-2" />
                        Clear Message
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#delete-chat"
                      >
                                <i className="ti ti-trash me-2" />
                                Delete Group
                              </Link>
                            </li>
                          </ul>
                                    </li>
                                  </ul>
                                </div>
            {/* Chat Search */}
            <div
              className={`chat-search search-wrap contact-search ${
                showSearch ? "visible-chat" : ""
              }`}
            >
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Messages"
                  />
                  <span className="input-group-text">
                    <i className="ti ti-search" />
                  </span>
                    </div>
              </form>
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
                        src={replyTo.sender_avatar || "assets/img/profiles/avatar-06.jpg"}
                        className="rounded-circle"
                        alt="avatar"
                      />
                    </div>
                    <div className="chat-content">
                      <div className="chat-profile-name">
                        <h6>Replying to {replyTo.sender_name}</h6>
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
                  onClick={() => toggleEmoji(0)}
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

      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={lightboxImages}
      />

      <CommonGroupModal />
      <ForwardMessage />
    </>
  );
};

export default GroupChat;
