import React from "react";
import "./sidebar.css";
import type { SidebarProps } from "./sidebar.type";


const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  HISTORY_TODAY,
  HISTORY_EARLIER,
  Icon,
}) => {
  return (
    <aside className={`sidebar ${!sidebarOpen ? "sidebar--collapsed" : ""}`}>
      <div className="sidebar__inner">

        {/* TOP */}
        <div className="sidebar__top">
          <div className="sidebar-logo">
            <Icon.Logo />
          </div>

          <button
            className="sidebar-item flex justify-end"
            onClick={() => setSidebarOpen(false)}
          >
            <Icon.DblChevron />
          </button>
        </div>

        {/* NAV */}
        <div className="sidebar__nav">
          <button className="sidebar-item">
            <Icon.Search /> Search
          </button>
          <button className="sidebar-item">
            <Icon.Edit /> New Chat
            <span className="sidebar-badge" />
          </button>
        </div>

        {/* HISTORY */}
        <div className="sidebar__history">
          <div className="sidebar-section-header">
            History <Icon.Chevron />
          </div>

          <div className="sidebar__scroll">

            <Group title="Today">
              {HISTORY_TODAY.map(({ label, active }) => (
                <button
                  key={label}
                  className={`sidebar-subitem ${
                    active ? "sidebar-subitem--active" : ""
                  }`}
                >
                  {label}
                </button>
              ))}
            </Group>

            <Group title="Earlier">
              {HISTORY_EARLIER.map(({ label }) => (
                <button className="sidebar-subitem" key={label}>
                  {label}
                </button>
              ))}
            </Group>

          </div>
        </div>

        {/* USER */}
        <div className="sidebar-user">
          <div className="sidebar-user__row">
            <div className="sidebar-avatar">AQ</div>

            <div>
              <div className="sidebar-user__name">Avez Qureshi</div>
              <div className="sidebar-user__email">
                avezqureshi4785@gmail.com
              </div>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;

/* helpers */
const Group = ({ title, children }: any) => (
  <>
    <p className="sidebar-group-title">{title}</p>
    {children}
  </>
);