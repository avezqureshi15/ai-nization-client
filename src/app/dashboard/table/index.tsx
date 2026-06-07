import { Link } from "react-router-dom";
import Dropdown from "../../../components/ui/dropdown/dropdown";
import "./table.css";

type HiringItem = {
  id: string;
  title: string;
  team?: string;
  applicants: number;
  status: "active" | "closed";
  createdAt: string;
};

const data: HiringItem[] = [
  {
    id: "1",
    title: "Frontend Engineer",
    team: "Web Team",
    applicants: 24,
    status: "active",
    createdAt: "2 days ago",
  },
  {
    id: "2",
    title: "Backend Engineer",
    team: "Platform",
    applicants: 12,
    status: "closed",
    createdAt: "5 days ago",
  },
];

const Table = () => {
  return (
    <div className="table-wrapper">
      <div className="table">

        {/* header */}
        <div className="table-row table-header">
          <div>Role</div>
          <div>Applicants</div>
          <div>Status</div>
          <div>Close Application</div>
          <div>Created</div>
        </div>

        {/* rows */}
        {data.map((item) => (
          <Link to="/hiring-requests/1">
          <div key={item.id} className="table-row">

            {/* role */}
            <div className="role-cell">
              <div className="role-title">{item.title}</div>
              {item.team && (
                <div className="role-meta">{item.team}</div>
              )}
            </div>

            {/* applicants */}
            <div className="applicants-cell">
              {item.applicants}
            </div>

            {/* status */}
            <div>
              <span
                className={`status-badge ${item.status === "active"
                  ? "status-active"
                  : "status-closed"
                  }`}
              >
                {item.status}
              </span>
            </div>

            {/* dropdown */}
            <div className="dropdown-cell">
              <Dropdown
                options={["Close Now", "Close in 24h", "Close in 3 days"]}
                defaultValue="Close in 3 days"
                onChange={(val) => console.log(val)}
              />
            </div>

            {/* created */}
            <div className="created-cell">
              {item.createdAt}
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Table;