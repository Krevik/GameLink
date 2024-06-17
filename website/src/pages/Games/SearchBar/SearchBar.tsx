import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
    onQueryChange: (query: string) => void;
    disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        props.onQueryChange(query);
    }, [query]);

    return (
        <div className={styles.searchBar}>
            <input
                disabled={props.disabled}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for games..."
                className={styles.searchInput}
            />
        </div>
    );
};
