export interface SearchResponseDTO {}

export interface SearchCategory {
  items: Item[];
  title: string;
}

export interface Item {
  description: string;
  id: string;
  name: string;
}
