import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../imageWithBasePath';
import { all_routes } from '../../../feature-module/router/all_routes';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useApi } from '../../hooks/useApi';
import { chatService, type User } from '../../services/chatService';
import "overlayscrollbars/overlayscrollbars.css";

// Types for call functionality
interface Call {
  id: string;
  caller_id: string;
  receiver_id: string;
  call_type: 'audio' | 'video';
  status: 'missed' | 'completed' | 'declined';
  duration?: number; // in seconds
  timestamp: string;
  caller?: User;
  receiver?: User;
}

export const CallTab = () => {
  const routes = all_routes;
  const [activeTab, setActiveTab] = useState('All Calls');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCalls, setFilteredCalls] = useState<Call[]>([]);
  
  // Mock data for calls - replace with actual API call
  const { data: calls, loading, error } = useApi(
    () => Promise.resolve([] as Call[]), // Replace with actual API call
    []
  );

  // Filter calls based on search query and active tab
  useEffect(() => {
    if (!calls) return;
    
    let filtered = calls;
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(call => 
        call.caller?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.caller?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.receiver?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.receiver?.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by active tab
    if (activeTab === 'Missed Calls') {
      filtered = filtered.filter(call => call.status === 'missed');
    } else if (activeTab === 'Outgoing') {
      filtered = filtered.filter(call => call.status === 'completed');
    } else if (activeTab === 'Incoming') {
      filtered = filtered.filter(call => call.status === 'completed');
    }
    
    setFilteredCalls(filtered);
  }, [searchQuery, activeTab, calls]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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

  const getCallIcon = (call: Call) => {
    const isIncoming = call.caller_id !== 'current_user_id'; // Replace with actual user ID
    
    if (call.status === 'missed') {
      return 'ti ti-phone-x text-danger';
    } else if (call.status === 'declined') {
      return 'ti ti-phone-off text-warning';
    } else {
      return isIncoming ? 'ti ti-phone-incoming text-success' : 'ti ti-phone-outgoing text-primary';
    }
  };

  const getCallStatusText = (call: Call) => {
    const isIncoming = call.caller_id !== 'current_user_id'; // Replace with actual user ID
    
    if (call.status === 'missed') {
      return 'Missed call';
    } else if (call.status === 'declined') {
      return 'Declined';
    } else {
      return isIncoming ? 'Incoming' : 'Outgoing';
    }
  };

  return (
    <>
        <div className="sidebar-content active slimscroll">
        <OverlayScrollbarsComponent
            options={{
              scrollbars: {
              autoHide: 'scroll',
                autoHideDelay: 1000,
              },
            }}
            style={{ maxHeight: '100vh' }}
          >
          <div className="slimscroll">
            <div className="chat-search-header">
              <div className="header-title d-flex align-items-center justify-content-between">
                <h4 className="mb-3">Calls</h4>
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    className="call-icon d-flex justify-content-center align-items-center text-white bg-primary rounded-circle me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#new-call"
                  >
                    <i className="ti ti-phone-plus fs-16" />
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
                          to="#"
                          className="dropdown-item d-flex align-items-center"
                          data-bs-toggle="modal"
                          data-bs-target="#clear-call"
                        >
                          <span>
                            <i className="ti ti-phone-x" />
                          </span>
                          Clear Call Log
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Call Search */}
              <div className="search-wrap">
                <form onSubmit={handleSearch}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
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
            
            <div className="sidebar-body chat-body" id="chatsidebar">
              {/* Left Chat Title */}
              <div className="d-flex align-items-center mb-3">
                <h5 className="chat-title2 me-2">{activeTab}</h5>
                <div className="dropdown">
                  <Link
                    to="#"
                    className="text-default fs-16"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="ti ti-chevron-down" />
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end p-3" id="innerTab" role="tablist">
                    <li role="presentation">
                      <Link
                        className="dropdown-item active"
                        id="all-calls-tab"
                        onClick={() => setActiveTab('All Calls')}
                        to="#"
                      >
                        All Calls
                      </Link>
                    </li>
                    <li role="presentation">
                      <Link
                        className="dropdown-item"
                        id="missed-calls-tab"
                        onClick={() => setActiveTab('Missed Calls')}
                        to="#"
                      >
                        Missed Calls
                      </Link>
                    </li>
                    <li role="presentation">
                      <Link
                        className="dropdown-item"
                        id="outgoing-calls-tab"
                        onClick={() => setActiveTab('Outgoing')}
                        to="#"
                      >
                        Outgoing
                      </Link>
                    </li>
                    <li role="presentation">
                      <Link
                        className="dropdown-item"
                        id="incoming-calls-tab"
                        onClick={() => setActiveTab('Incoming')}
                        to="#"
                      >
                        Incoming
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              
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
              ) : filteredCalls.length === 0 ? (
                <div className="text-center p-4 text-muted">
                  <i className="ti ti-phone fs-1 mb-3"></i>
                  <p>No calls found</p>
                  <small>Your call history will appear here</small>
                    </div>
              ) : (
                  <div className="chat-users-wrap">
                  {filteredCalls.map((call) => (
                    <Link
                      key={call.id}
                      to="#"
                      className="chat-user-list"
                      data-bs-toggle="modal"
                      data-bs-target="#call-details"
                    >
                      <div className="avatar avatar-lg me-2">
                          <ImageWithBasePath
                          src={call.caller?.avatar_url || "assets/img/profiles/avatar-01.jpg"}
                            className="rounded-circle"
                          alt={call.caller?.full_name || call.caller?.username || 'Unknown'}
                          />
                        </div>
                        <div className="chat-user-info">
                          <div className="chat-user-msg">
                          <h6>{call.caller?.full_name || call.caller?.username || 'Unknown'}</h6>
                          <div className="d-flex align-items-center">
                            <i className={`${getCallIcon(call)} me-2`}></i>
                            <span className="me-2">{getCallStatusText(call)}</span>
                            {call.duration && (
                              <span className="text-muted">({formatDuration(call.duration)})</span>
                            )}
                            </div>
                          </div>
                          </div>
                          <div className="chat-user-time">
                        <span>{formatTime(call.timestamp)}</span>
                        </div>
                      </Link>
                  ))}
                    </div>
              )}
            </div>
          </div>
          </OverlayScrollbarsComponent>
        </div>
    </>
  );
};

export default CallTab;
