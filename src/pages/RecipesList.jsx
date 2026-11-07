import { useState, useEffect, useRef } from 'react';
import {Link,useSearchParams} from 'react-router';


export default function RecipesList () {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(``);
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("q") || "";


    useEffect(() => {
    fetch(`https://dummyjson.com/recipes`)
        .then((res) => {
        if (!res.ok) throw new Error("שגיאה בטעינת המתכונים");
        return res.json();
        })
        .then((data) => { setRecipes(data.recipes);  })
        .catch((err) => { setError(err.message); })
        .finally(() => { setLoading(false); });
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;

        if (value === "") {
            setSearchParams({}, { replace: true });
        } else {
            setSearchParams({ q: value }, { replace: true });
        }
    };

    const filtered=recipes.filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase()));
    
    const searchRef = useRef(null);

    useEffect(() => {
    if (searchRef.current) {
        searchRef.current.focus();
    }
    }, []);     


    return (
        <div>
            <h1>מתכונים</h1>
            {loading && <p>טוען...</p>}
            {error && <p>{error}</p>}
            <input type="text" placeholder="Recipe search" value={search} onChange={handleSearch} ref={searchRef}>
            </input>
            {!loading && !error && filtered.length === 0 && (
                <p>לא נמצאו מתכונים מתאימים לחיפוש שלך.</p>
            )}
            <ul>
                {filtered.map((recipe) => (
                    <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                        <li>
                            <h2>{recipe.name}</h2>
                        </li>
                    </Link>))}
            </ul>
        </div>
    );
} 