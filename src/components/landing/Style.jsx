import { Link } from "react-router-dom";

export default function Style({style}) {
  
  return (
    <div className="style bg-[#FFFFFF] flex justify-between max-h-[289px] rounded-[20px] overflow-hidden transition-transform hover:scale-[1.02] duration-300 cursor-pointer">
      <Link to={style.url} className="style-name pl-9 py-[25px]">
        <h4 className="font-bold text-4xl text-[#000000]">{style.name}</h4>
      </Link>
      <img className="max-h-[289px]" src={style.img} alt={style.name} />
    </div>
  );
}
