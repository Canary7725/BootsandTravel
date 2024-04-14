import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
  const { product } = props;
  return (
    <span className="flex items-center">
      <Link to={"/home"}>Home</Link>
      <FiChevronRight />
      <Link to={"/all"}>Shop</Link> <FiChevronRight />
      {product.categories[0]} <FiChevronRight />
      {product.name}
      {FiChevronRight}
    </span>
  );
};

export default BreadCrumb;
