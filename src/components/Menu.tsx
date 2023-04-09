import { NavLink } from "react-router-dom";

export const Menu = (): JSX.Element => {
  return (
    <div className="menu">
      <NavLink className="link" to="/">
        Home
      </NavLink>
      {"|"}
      <NavLink className="link" to="/add-synonym">
        Add
      </NavLink>
    </div>
  );
};
