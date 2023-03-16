type MaterialIconType = 'outlined' | 'rounded' | 'sharp';

interface MaterialIcon {
  type: MaterialIconType;
  name: string;
}

export type Icon = string | string[] | MaterialIcon;
