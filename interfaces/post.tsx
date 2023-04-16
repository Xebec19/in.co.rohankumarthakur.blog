export interface IPost {
  createdAt: string;
  description: string;
  id: string;
  image: string;
  imageSource: string;
  tags?: string[] | null;
  title: string;
  updatedAt: string;
}

export interface IPostItem {
  id: string;
  title: string;
  image_url: ImageUrlOrImageReferenceOrDescriptionOrSource;
  image_reference: ImageUrlOrImageReferenceOrDescriptionOrSource;
  created_at: CreatedAtOrUpdatedAt;
  updated_at: CreatedAtOrUpdatedAt;
  description: ImageUrlOrImageReferenceOrDescriptionOrSource;
  source: ImageUrlOrImageReferenceOrDescriptionOrSource;
  tags?: string[] | null;
}
export interface ImageUrlOrImageReferenceOrDescriptionOrSource {
  String: string;
  Valid: boolean;
}
export interface CreatedAtOrUpdatedAt {
  Time: string;
  Valid: boolean;
}
