import { Link } from "react-router-dom";

export default function FooterColumn({ sectionName , links }) {
  return (
    <div className="column">
        <h5 className="font-medium leading-[18px] tracking-[3px] uppercase mb-[26px]">{sectionName}</h5>
        <ul className="flex flex-col gap-3">
          {links.map((link, i) => (
            <li key={i}>
              <Link to={link.url} className="text-[#00000099] leading-[19px] text-[16px]">{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
  )
}
