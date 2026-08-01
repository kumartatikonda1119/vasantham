import { Link } from 'react-router-dom';

const CategoryCard = ({ icon, title, description, link }) => {
  return (
    <div className="bg-[#F8F1E4] rounded-2xl p-5 shadow-[0_4px_20px_rgba(92,67,40,0.06)] border border-[#E8DCBF] hover:shadow-[0_6px_24px_rgba(92,67,40,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
      <div>
        {/* Top Icon */}
        <div className="w-10 h-10 rounded-xl bg-[#EFE3C9] flex items-center justify-center text-[#3B6533] mb-3.5 group-hover:bg-[#3B6533] group-hover:text-[#F8F1E4] transition-colors duration-300">
          {icon}
        </div>

        {/* Card Title */}
        <h3 className="font-sans text-xl font-bold text-[#4A3520] mb-2 group-hover:text-[#3B6533] transition-colors">
          {title}
        </h3>

        {/* Card Description */}
        <p className="font-sans text-xs md:text-sm text-[#6C5338] leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {/* Action Link */}
      <Link 
        to={link} 
        className="font-sans text-sm font-semibold text-[#3B6533] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform w-max pt-2"
      >
        చదవండి
        <span className="text-base leading-none">→</span>
      </Link>
    </div>
  );
};

export default CategoryCard;
