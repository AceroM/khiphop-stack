import { Link } from "@remix-run/react";

export default function AppHome() {
  return (
    <div className="flex">
      <Link to="/app/notes" className="btn">
        Go To Notes
      </Link>
    </div>
  );
}
