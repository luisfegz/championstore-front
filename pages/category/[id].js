import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import FooterAnimated from "@/components/FooterAnimated";

const CategoryHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap; // Add wrap to allow for responsive adjustments
    margin-bottom: 1rem; // Add some space between header and filters

    h1 {
        font-size: 1.5em;
        margin: 10px 0; // Ensure the title has space around on small screens
    }
`;

const FiltersWrapper = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap; // Allow items to wrap in smaller screens

    @media (max-width: 768px) { // Adjust for tablet and down to mobile
        width: 100%;
        justify-content: space-evenly; // Evenly space filters on smaller screens
    }
`;

const Filter = styled.div`
    background-color: #ddd;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    gap: 5px;
    align-items: center; // Align items to center in flex container
    color: #444;

    select {
        background-color: transparent;
        border: 0;
        font-size: inherit;
        color: #444;
        padding: 5px; // Add padding for better touch target on mobile
        -webkit-appearance: none; // Removes default styling on iOS
        appearance: none;
    }

    @media (max-width: 768px) {
        flex-basis: 100%; // Full width on smaller screens
        justify-content: space-between; // Space out label and select
        padding: 10px; // Larger padding on smaller screens
    }
`;
export default function CategoryPage({
    category,subCategories,products:originalProducts
}) {
    const defaultSorting = '_id-desc';
    const defaultFilterValues = category.properties
        .map(p => ({name:p.name,value:'all'}));
    const [products,setProducts] = useState(originalProducts);
    const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
    const [sort,setSort] = useState(defaultSorting);
    const [loadingProducts,setLoadingProducts] = useState(false);
    const [filtersChanged, setFiltersChanged] = useState(false);

    function handleFilterChange(filterName, filterValue) {
        setFiltersValues(prev => {
            return prev.map(p =>({
                name:p.name,
                value:p.name === filterName ? filterValue : p.value,
            }));
        });
        setFiltersChanged(true);
    }
    useEffect(() => {
        if (!filtersChanged) {
            return;
        }
        setLoadingProducts(true);
        const catIds = [category._id, ...(subCategories?.map(c => c._id) || [])];
        const params = new URLSearchParams;
        params.set('categories',catIds.join(','));
        params.set('sort', sort);
        filtersValues.forEach(f => {
            if (f.value !== 'all') {
                params.set(f.name, f.value)
            }
        });
        const url = `/api/products?` + params.toString();
        axios.get(url).then(res => {
            setProducts(res.data);
            setLoadingProducts(false);
        })
    }, [filtersValues, sort, filtersChanged]);
    return (
        <>
            <Header />
            <Center>
                <CategoryHeader>
                    <h1>{category.name}</h1>
                    <FiltersWrapper>
                        {category.properties.map(prop => (
                            <Filter key={prop.name}>
                                <span>{prop.name}:</span>
                                <select 
                                    onChange={ev => handleFilterChange(prop.name, ev.target.value)}
                                    value={filtersValues.find(f => f.name === prop.name).value}>
                                    <option value="all">All</option>
                                    {prop.values.map(val => (
                                        <option key={val} value={val}>{val}</option>
                                    ))}
                                </select>
                            </Filter>
                        ))}
                        <Filter>
                            <span>Sort:</span>
                            <select 
                                value={sort}
                                onChange={ev => {
                                    setSort(ev.target.value);
                                    setFiltersChanged(true);
                                }}>
                                <option value="price-asc">price, lowest first</option>
                                <option value="price-desc">price, highest first</option>
                                <option value="_id-desc">newest first</option>
                                <option value="_id-asc">oldest first</option>
                            </select>
                        </Filter>
                    </FiltersWrapper>
                </CategoryHeader>
                {loadingProducts && (
                    <Spinner fullWidth/>
                )}
                {!loadingProducts && (
                    <div>
                        {products.length > 0 && (
                            <ProductsGrid products={products} />
                        )}
                        {products.length === 0 && (
                            <div>
                                Sorry, no products found
                            </div>
                        )}
                    </div>
                )}
            </Center>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />            
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <FooterAnimated />
        </>
    );
}

export async function getServerSideProps(context){
    const category = await Category.findById(context.query.id);
    const subCategories = await Category.find({parent:category._id});
    const catIds = [category._id, ...subCategories.map(c => c._id)];
    const products = await Product.find({category:catIds});
    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            subCategories:  JSON.parse(JSON.stringify(subCategories)),
            products: JSON.parse(JSON.stringify(products)),
        }
    };
}
