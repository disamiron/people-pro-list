import { LocationInterface } from './location.interface';
import { NameInterface } from './name.interface';
import { PictureInterface } from './picture.interface';

export interface UserInterface {
  name: NameInterface;
  email: string;
  location: LocationInterface;
  picture: PictureInterface;
}
