export const DEPRECATED_CATEGORIES = [
    "Anime",
    "Movies",
    "TV-Series",
    "Manga"
];

export const PRIMARY_CATEGORIES = [
    "Featured",
    "Documenting",
    "Experiment",
    "Debate",
    "Drama",
    "Geopolitics",
    "History",
    "Philosophy",
    "Psychology",
    "Science",
    "Technology",
    "Travel",
    "News",
    "Religion",
    "Review",
    "Books (Fiction)",
    "Books (Non-Fiction)",
    "Shower Thoughts",
    "Uncategorized"
];

export const CATEGORIES = [...PRIMARY_CATEGORIES, ...DEPRECATED_CATEGORIES];

export function isDeprecatedCategory(name) {
    return DEPRECATED_CATEGORIES.includes(name);
}

export function isDeprecatedPost(post) {
    return post.categories?.nodes?.some(cat => isDeprecatedCategory(cat.name));
}
