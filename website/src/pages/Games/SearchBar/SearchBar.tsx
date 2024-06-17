import React, { useState } from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className={styles.searchBar}>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for games..." className={styles.searchInput} />
            <button type="submit" className={styles.searchButton}>
                Search
            </button>
        </form>
    );
};
