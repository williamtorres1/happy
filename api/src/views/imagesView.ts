import Image from '@models/Image';

interface Response {
  id: string;
  url: string;
}

export default {
  render(image: Image): Response {
    return {
      id: image.id,
      url: `http://10.0.0.4:3333/uploads/${image.path}`,
    };
  },
  renderMany(images: Image[]): Response[] {
    return images.map(image => this.render(image));
  },
};
