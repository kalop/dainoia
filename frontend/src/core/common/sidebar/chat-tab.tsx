import { useState, useEffect } from 'react';
import ImageWithBasePath from '../imageWithBasePath';
import { Link } from 'react-router-dom';
import { all_routes } from '../../../feature-module/router/all_routes';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import type { Conversation, User } from '../../services/chatService';

// Import Swiper styles
import '../../../../node_modules/swiper/swiper.css';
import "overlayscrollbars/overlayscrollbars.css";

const ChatTab = () => {
    const routes = all_routes;
  const { user } = useAuth();
  const { conversations, loading, error, searchConversations } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  // Filter conversations based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      searchConversations(searchQuery).then(results => {
        setFilteredConversations(results);
      });
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchQuery, conversations, searchConversations]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getConversationName = (conversation: Conversation) => {
    // For now, show the first participant that's not the current user
    const otherParticipant = conversation.participant_ids.find(id => id !== user?.id);
    return otherParticipant || 'Unknown User';
  };

  const getConversationAvatar = (conversation: Conversation) => {
    // For now, return a default avatar
    return "assets/img/profiles/avatar-01.jpg";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  return (
    <>
        {/* Chats sidebar */}
      <div id="chats" className="sidebar-content active">
        <OverlayScrollbarsComponent
            options={{
              scrollbars: {
                autoHide: 'scroll',
                autoHideDelay: 1000,
              },
            }}
            style={{ maxHeight: '100vh' }}
          >
          <div className="">
            <div className="chat-search-header">
              <div className="header-title d-flex align-items-center justify-content-between">
                <h4 className="mb-3">Chats</h4>
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#new-chat"
                    className="add-icon btn btn-primary p-0 d-flex align-items-center justify-content-center fs-16 me-2"
                  >
                    <i className="ti ti-plus" />
                  </Link>
                  <div className="dropdown">
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      className="fs-16 text-default"
                    >
                      <i className="ti ti-dots-vertical" />
                    </Link>
                    <ul className="dropdown-menu p-3">
                      <li>
                        <Link
                          className="dropdown-item"
                          to="#"
                          data-bs-toggle="modal"
                          data-bs-target="#invite"
                        >
                          <i className="ti ti-send me-2" />
                          Invite Others
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Chat Search */}
              <div className="search-wrap">
                <form onSubmit={handleSearch}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search For Contacts or Messages"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="input-group-text">
                      <i className="ti ti-search" />
                    </span>
                  </div>
                </form>
              </div>
            </div>

            {/* Online Contacts */}
            <div className="top-online-contacts">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-3">Recent Chats</h5>
                <div className="dropdown mb-3">
                  <Link
                    to="#"
                    className="text-default"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="ti ti-dots-vertical" />
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <Link className="dropdown-item mb-1" to="#">
                        <i className="ti ti-eye-off me-2" />
                        Hide Recent
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        <i className="ti ti-users me-2" />
                        Active Contacts
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <Swiper spaceBetween={15} slidesPerView={4}>
                    {onlineUsers.slice(0, 8).map((user) => (
                      <SwiperSlide key={user.id}>
                        <Link to={`${routes.chat}/${user.id}`} className="chat-status text-center">
                      <div className="avatar avatar-lg online d-block">
                        <ImageWithBasePath
                              src={user.avatar_url || "assets/img/profiles/avatar-01.jpg"}
                              alt={user.full_name || user.username}
                          className="rounded-circle"
                        />
                      </div>
                          <p>{user.full_name || user.username}</p>
                    </Link>
                    </SwiperSlide>
                    ))}
                  </Swiper>
                      </div>
                      </div>
                      </div>

            {/* Chat List */}
            <div className="chat-user-list">
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
              ) : filteredConversations.length === 0 ? (
                <div className="text-center p-4 text-muted">
                  <i className="ti ti-message-circle fs-1 mb-3"></i>
                  <p>No conversations yet</p>
                  <small>Start a new chat to begin messaging</small>
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                            <Link
                    key={conversation.id}
                    to={`${routes.chat}/${conversation.id}`}
                    className="chat-user-list-item"
                  >
                    <div className="avatar avatar-lg">
                          <ImageWithBasePath
                        src={getConversationAvatar(conversation)}
                        alt="avatar"
                            className="rounded-circle"
                      />
                      {conversation.unread_count > 0 && (
                        <span className="badge bg-danger rounded-pill position-absolute top-0 end-0">
                          {conversation.unread_count}
                              </span>
                      )}
                        </div>
                        <div className="chat-user-info">
                      <div className="d-flex align-items-center justify-content-between">
                        <h6 className="mb-1">{getConversationName(conversation)}</h6>
                        <span className="chat-time">
                          {conversation.last_message 
                            ? formatTime(conversation.last_message.timestamp)
                            : formatTime(conversation.updated_at)
                          }
                              </span>
                            </div>
                      <div className="chat-user-message">
                        <p className="mb-0">
                          {conversation.last_message?.content || 'No messages yet'}
                        </p>
                        {conversation.unread_count > 0 && (
                          <span className="unread-indicator"></span>
                        )}
                          </div>
                        </div>
                      </Link>
                ))
              )}
            </div>
          </div>
          </OverlayScrollbarsComponent>
        </div>
    </>
  );
};

export default ChatTab;