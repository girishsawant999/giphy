type Meta = {
  status: number;
  msg: string;
  response_id: string;
};

type Pagination = {
  total_count: number;
  count: number;
  offset: number;
};

type TMetaAndPaginatedType<T> = {
  data: T[];
  meta: Meta;
  pagination: Pagination;
};

type Images = {
  original: FixedHeight;
  downsized: The480_WStill;
  downsized_large: The480_WStill;
  downsized_medium: The480_WStill;
  downsized_small: The4_K;
  downsized_still: The480_WStill;
  fixed_height: FixedHeight;
  fixed_height_downsampled: FixedHeight;
  fixed_height_small: FixedHeight;
  fixed_height_small_still: The480_WStill;
  fixed_height_still: The480_WStill;
  fixed_width: FixedHeight;
  fixed_width_downsampled: FixedHeight;
  fixed_width_small: FixedHeight;
  fixed_width_small_still: The480_WStill;
  fixed_width_still: The480_WStill;
  looping: Looping;
  original_still: The480_WStill;
  original_mp4: The4_K;
  preview: The4_K;
  preview_gif: The480_WStill;
  preview_webp: The480_WStill;
  hd?: The4_K;
  "480w_still": The480_WStill;
  "4k"?: The4_K;
};

type The480_WStill = {
  height: string;
  width: string;
  size: string;
  url: string;
};

type The4_K = {
  height: string;
  width: string;
  mp4_size: string;
  mp4: string;
};

type FixedHeight = {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size?: string;
  mp4?: string;
  webp_size: string;
  webp: string;
  frames?: string;
  hash?: string;
};

type Looping = {
  mp4_size: string;
  mp4: string;
};

type TGifData = {
  id: string;
  title: string;
  url: string;
  images: Images;
};
