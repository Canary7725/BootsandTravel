const BreadCrumb = (props) => {
  const { product } = props;
  console.log(product);
  return <div>Home-Something-{product.categories}</div>;
};

export default BreadCrumb;
