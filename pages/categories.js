import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";

const CategoryGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const CategoryTitle = styled.h2`
    display: flex;
    margin-top: 10px;
    margin-bottom: 0;
    align-items: center;
    gap: 15px;
    h2{
        margin-bottom: 10px;
        margin-top: 10px;
    }
    a{
        color: #555;
        display: inline-block;
    }
`;
const CategoryWrapper = styled.div`
    margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
    background-color: #ddd;
    height: 160px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
    text-decoration: none;
`;

export default function CategoriesPage({mainCategories, categoriesProducts}) {
  return (
      <>
          <Header/>
          <Center>
              {mainCategories.map(cat => (
                  <CategoryWrapper key={cat._id}> {/* Added key here */}
                      <CategoryTitle>
                          <h2>{cat.name}</h2>
                          <div>
                              <Link href={'/category/'+cat._id}>Show All</Link>
                          </div>
                      </CategoryTitle>
                      <CategoryGrid>
                          {categoriesProducts[cat._id].map((p, index) => (
                              <RevealWrapper key={cat._id + '_' + index} delay={index*50}> {/* Added key here */}
                                  <ProductBox {...p} />
                              </RevealWrapper>
                          ))}
                          <RevealWrapper delay={categoriesProducts[cat._id].length*50}>
                              <ShowAllSquare href={'/category/'+cat._id}>
                                  Show all &rarr;
                              </ShowAllSquare>
                          </RevealWrapper>
                      </CategoryGrid>
                  </CategoryWrapper>
              ))}
          </Center>
      </>
  );
}


export async function getServerSideProps() {
    const categories = await Category.find();
    const mainCategories = categories.filter(c => !c.parent);
    const categoriesProducts = {}; // catId => [products]
    for (const mainCat of mainCategories) {
        const mainCatId = mainCat._id.toString();
        const childCatIds = categories
            .filter(c => c?.parent?.toString() === mainCatId)
            .map(c => c._id.toString());
        const categoriesIds = [mainCatId, ...childCatIds];
        const products = await Product.find({category: categoriesIds}, null,
            {limit:3,sort:{'_id':-1}});
        categoriesProducts[mainCat._id] = products;
    }
    return {
        props: {
            mainCategories: JSON.parse(
                JSON.stringify(mainCategories)
            ),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
        },
    };
}