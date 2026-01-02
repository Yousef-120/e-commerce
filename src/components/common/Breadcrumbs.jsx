import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const breadcrumbs = location.state?.breadcrumbs || [{ label: "Home", path: "/" }];
useEffect(()=>
{
  console.log(location)
})
  return (
    <nav className="flex justify-center mb-6">
      <div className="container flex items-center gap-2">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isHome = crumb.label == "Home"
          
          return (
            <span key={index} className="flex items-center gap-2">
              {isLast && !isHome ? (
                <span className="text-black font-medium">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.path}
                  state={{ breadcrumbs: breadcrumbs.slice(0, index + 1) }}
                  className="hover:opacity-80 text-[16px] leading-[100%]"
                >
                  {crumb.label}
                </Link>
              )}

              {!isLast && <span>{">"}</span>}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
