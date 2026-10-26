
import { NavLink } from "react-router-dom";
import {
  FiSun,
  FiGrid,
  FiCalendar,
  FiMapPin,
  FiSettings,
  FiCloud,
} from "react-icons/fi";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: FiGrid,
  },
  {
    label: "Forecast",
    path: "/forecast",
    icon: FiCalendar,
  },
  {
    label: "Saved Locations",
    path: "/locations",
    icon: FiMapPin,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: FiSettings,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className="sidebar-brand">
        <span className="brand-icon">
          <FiSun />
        </span>

        <span className="brand-name">
          Weather<span>wise</span>
        </span>
      </NavLink>

      <div className="sidebar-section">
        <p className="sidebar-section-label">MENU</p>

        <nav className="sidebar-navigation">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active" : ""}`
              }
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-tip">
          <span className="tip-icon">
            <FiCloud />
          </span>

          <p>Stay ahead of the weather.</p>
          <span className="muted-text">
            Your forecast, at a glance.
          </span>
        </div>

        <p className="sidebar-footer">
          WEATHERWISE · YOUR DAILY FORECAST
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
