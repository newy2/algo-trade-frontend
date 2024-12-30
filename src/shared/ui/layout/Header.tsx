import { NavLink } from "react-router-dom";

export function Header() {
  const menus = [
    {
      url: "/",
      name: "홈",
    },
    {
      url: "/about",
      name: "About",
    },
    {
      url: "/setting",
      name: "설정",
    },
  ];

  return (
    <nav className="z-1 sticky top-0 flex h-20 items-center justify-center border-b bg-base-100">
      <ul className="flex w-8/12 list-none justify-between align-middle">
        {menus.map((each, index) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) =>
                [
                  "relative flex h-20 items-center justify-center px-5",
                  "after:transition-width after:absolute after:bottom-0 after:h-0.5 after:w-0 after:duration-200 after:content-['']",
                  "hover:text-primary hover:after:w-full hover:after:bg-primary",
                  isActive ? "text-primary after:w-full after:bg-primary" : "",
                ].join(" ")
              }
              to={each.url}
            >
              {each.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
