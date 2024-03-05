import styles from "../styles/FilterButton.module.css"
import tagsData from "../pages/api/tags.json"
import { useRouter } from 'next/router';

const tags = tagsData.map((tagData) => tagData.text);


const FilterButton = ({ destination }) => {

    const router = useRouter();

    const handleFilter = (selectedTag) => {
        if(destination === 'projects') {
            router.push(`/projects${selectedTag ? `?tag=${encodeURIComponent(selectedTag)}` : ''}`);
        } else if (destination === 'articles') {
            router.push(`/articles${selectedTag ? `?tag=${encodeURIComponent(selectedTag)}` : ''}`);
        } else if (destination === 'tag') {
            router.push(`/${selectedTag ? encodeURIComponent(selectedTag) : ''}`);
        } else {
            destination = "/404"
        };
      };
      
    const clearFilters = () => {
        if(destination === 'projects') {
            router.push('/projects');
        } else if (destination === 'articles') {
            router.push('/articles');
        }else if (destination === 'tag') {
            router.push(`/`);
        } else {
            destination = "/404"
        };
      
    };

    return (
        <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Filter by Tag</button>
                <div className={styles.dropdownContent}>
                    <button onClick={clearFilters}>Clear Filters</button>
                    {tags.map((tag) => (
                        <button key={tag} onClick={() => handleFilter(tag)}>{tag}</button>
                    ))}
                </div>
          </div>
    );
};

export default FilterButton;
