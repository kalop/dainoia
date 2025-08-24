
import { useState, useEffect } from 'react';
import ImageWithBasePath from '../imageWithBasePath';
import { Link } from 'react-router-dom';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useApi } from '../../hooks/useApi';
import { chatService, type User } from '../../services/chatService';
import "overlayscrollbars/overlayscrollbars.css";

const ContactTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<User[]>([]);
  
  // Get all users (contacts)
  const { data: contacts, loading, error } = useApi(
    () => chatService.getOnlineUsers(), // This will need to be updated to get all users
    []
  );

  // Filter contacts based on search query
  useEffect(() => {
    if (!contacts) return;
    
    if (searchQuery.trim()) {
      const filtered = contacts.filter(contact => 
        contact.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [searchQuery, contacts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const groupContactsByFirstLetter = (contacts: User[]) => {
    const grouped: { [key: string]: User[] } = {};
    
    contacts.forEach(contact => {
      const firstLetter = (contact.full_name || contact.username).charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(contact);
    });
    
    return Object.keys(grouped).sort().map(letter => ({
      letter,
      contacts: grouped[letter].sort((a, b) => 
        (a.full_name || a.username).localeCompare(b.full_name || b.username)
      )
    }));
  };

  const formatLastSeen = (lastSeen?: string) => {
    if (!lastSeen) return 'Never';
    
    const date = new Date(lastSeen);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `last seen ${Math.floor(diffInHours)} hours ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `last seen ${days} days ago`;
    }
  };

  return (
    <>
      {/* Contacts sidebar */}
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
                <h4 className="mb-3">Contacts</h4>
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#add-contact"
                    className="add-icon btn btn-primary p-0 d-flex align-items-center justify-content-center fs-16 me-2"
                  >
                    <i className="ti ti-plus" />
                  </Link>
                </div>
              </div>
              
              {/* Contact Search */}
              <div className="search-wrap">
                <form onSubmit={handleSearch}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Contacts"
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
            
            <div className="sidebar-body chat-body">
              {/* Left Chat Title */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>All Contacts</h5>
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
              ) : filteredContacts.length === 0 ? (
                <div className="text-center p-4 text-muted">
                  <i className="ti ti-users fs-1 mb-3"></i>
                  <p>No contacts found</p>
                  <small>Add contacts to start chatting</small>
                </div>
              ) : (
                <div className="chat-users-wrap">
                  {groupContactsByFirstLetter(filteredContacts).map(({ letter, contacts }) => (
                    <div key={letter} className="mb-4">
                      <h6 className="mb-2">{letter}</h6>
                      <div className="chat-list">
                        {contacts.map((contact) => (
                          <Link
                            key={contact.id}
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#contact-details"
                            className="chat-user-list"
                          >
                            <div className={`avatar avatar-lg ${contact.is_online ? 'online' : 'offline'} me-2`}>
                              <ImageWithBasePath
                                src={contact.avatar_url || "assets/img/profiles/avatar-01.jpg"}
                                className="rounded-circle"
                                alt={contact.full_name || contact.username}
                              />
                            </div>
                            <div className="chat-user-info">
                              <div className="chat-user-msg">
                                <h6>{contact.full_name || contact.username}</h6>
                                <p>{formatLastSeen(contact.last_seen)}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
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

export default ContactTab;