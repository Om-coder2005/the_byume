const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchCategories() {
  const res = await fetch(`${API_BASE_URL}/gallery/categories`, {
    next: { revalidate: 60 } // Cache for 60 seconds
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return res.json();
}

export async function fetchGalleryItems() {
  const res = await fetch(`${API_BASE_URL}/gallery/`, {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch gallery items');
  }
  
  return res.json();
}

export async function fetchReviews(featuredOnly: boolean = false) {
  const res = await fetch(`${API_BASE_URL}/reviews/?featured_only=${featuredOnly}`, {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch reviews');
  }
  
  return res.json();
}
