
import ImageWithBasePath from "../imageWithBasePath";
import { Link } from "react-router-dom";
import { all_routes } from "../../../feature-module/router/all_routes";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { groupChatService, type GroupInfo } from "../../services/groupChatService";

const GroupTab = () => {
  const routes = all_routes;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGroups, setFilteredGroups] = useState<GroupInfo[]>([]);

  // Fetch groups from API
  const { data: groups, loading, error } = useApi(
    () => groupChatService.getGroups(),
    []
  );

  // Filter groups based on search query
  useEffect(() => {
    if (groups) {
      const filtered = groups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGroups(filtered);
    }
  }, [groups, searchQuery]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else if (diffInHours < 168) {
      return date.toLocaleDateString([], { weekday: 'long' });
    } else {
      return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderGroupItem = (group: GroupInfo) => (
    <div key={group.id} className="chat-list">
      <Link to={`${routes.groupChat}/${group.id}`} className="chat-user-list">
        <div className="avatar avatar-lg online me-2">
          {group.avatar_url ? (
            <ImageWithBasePath
              src={group.avatar_url}
              className="rounded-circle"
              alt={group.name}
            />
          ) : (
            <div className="avatar avatar-lg bg-primary avatar-rounded me-2">
              <span className="avatar-title fs-14 fw-medium">
                {getInitials(group.name)}
              </span>
            </div>
          )}
        </div>
        <div className="chat-user-info">
          <div className="chat-user-msg">
            <h6>{group.name}</h6>
            <p>{group.description || `${group.member_count} members`}</p>
          </div>
          <div className="chat-user-time">
            <span className="time">{formatTime(group.updated_at)}</span>
            <div className="chat-pin">
              <span className="count-message fs-12 fw-semibold">
                {group.online_count}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="chat-dropdown">
        <Link className="#" to="#" data-bs-toggle="dropdown">
          <i className="ti ti-dots-vertical" />
        </Link>
        <ul className="dropdown-menu dropdown-menu-end p-3">
          <li>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-box-align-right me-2" />
              Archive Group
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-volume-off me-2" />
              Mute Notification
            </Link>
          </li>
          <li>
            <Link 
              className="dropdown-item" 
              to="#"
              onClick={async () => {
                try {
                  await groupChatService.leaveGroup(group.id);
                  // Refresh groups list
                  window.location.reload();
                } catch (error) {
                  console.error('Failed to leave group:', error);
                }
              }}
            >
              <i className="ti ti-logout-2 me-2" />
              Exit Group
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-pinned me-2" />
              Pin Group
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-square-check me-2" />
              Mark as Unread
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Groups sidebar */}
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
                <h4 className="mb-3">Groups</h4>
                <div className="d-flex align-items-center mb-3">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#new-group"
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
              {/* Group Search */}
              <div className="search-wrap">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for groups..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="input-group-text">
                      <i className="ti ti-search" />
                    </span>
                  </div>
                </form>
              </div>
              {/* /Group Search */}
            </div>
            <div className="sidebar-body chat-body">
              {/* Left Group Title */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>All Groups ({filteredGroups.length})</h5>
              </div>
              {/* /Left Group Title */}
              <div className="chat-users-wrap">
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
                ) : filteredGroups.length === 0 ? (
                  <div className="text-center p-4 text-muted">
                    <i className="ti ti-users fs-1 mb-3"></i>
                    <p>{searchQuery ? 'No groups found matching your search.' : 'No groups yet. Create your first group!'}</p>
                  </div>
                ) : (
                  filteredGroups.map(renderGroupItem)
                )}
              </div>
            </div>
          </div>
        </OverlayScrollbarsComponent>
      </div>
      {/* / Groups sidebar */}
    </>
  );
};

export default GroupTab;
