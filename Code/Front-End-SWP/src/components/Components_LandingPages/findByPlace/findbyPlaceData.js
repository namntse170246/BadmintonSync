const findByPlaceData = [
  {
    id: 1,
    name: 'Khách sạn',
    img: 'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=',
  },
  {
    id: 2,
    name: 'Căn hộ',
    img: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=',
  },
  {
    id: 3,
    name: 'Resort',
    img: 'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=',
  },
  {
    id: 4,
    name: 'Homestay',
    img: 'https://r-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=',
  },
  {
    id: 5,
    name: 'Nhà gỗ',
    img: 'https://q-xx.bstatic.com/xdata/images/hotel/263x210/52979454.jpeg?k=6ac6d0afd28e4ce00a8f817cc3045039e064469a3f9a88059706c0b45adf2e7d&o=',
  },
  {
    id: 6,
    name: 'Nhà nghỉ thôn dã',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450074.jpeg?k=7039b03a94f3b99262c4b3054b0edcbbb91e9dade85b6efc880d45288a06c126&o=',
  },
  {
    id: 7,
    name: 'Glamping',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450090.jpeg?k=52f6b8190edb5a9c91528f8e0f875752ce55a6beb35dc62873601e57944990e4&o=',
  },
  {
    id: 8,
    name: 'Khách sạn căn hộ',
    img: 'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450058.jpeg?k=2449eb55e8269a66952858c80fd7bdec987f9514cd79d58685651b7d6e9cdfcf&o=',
  },
  {
    id: 9,
    name: 'Nhà nghỉ mát',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450113.jpeg?k=76b3780a0e4aacb9d02ac3569b05b3c5e85e0fd875287e9ac334e3b569f320c7&o=',
  },
  {
    id: 10,
    name: 'Khách sạn',
    img: 'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450073.jpeg?k=795a94c30433de1858ea52375e8190a962b302376be2e68aa08be345d936557d&o=',
  },
  {
    id: 11,
    name: 'Nhà trọ',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450082.jpeg?k=beb101b827a729065964523184f4db6cac42900c2415d71d516999af40beb7aa&o=',
  },
  {
    id: 12,
    name: 'Nhà nghỉ ven đường',
    img: 'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450093.jpeg?k=aa5cc7703f3866af8ffd6de346c21161804a26c3d0a508d3999c11c337506ae1&o=',
  },
  {
    id: 13,
    name: 'Nhà nghỉ B&B',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450056.jpeg?k=251e2507d43a24a4c58bb961b8d157147d56efbf91b49f9606bc768c58f581e4&o=',
  },
  {
    id: 14,
    name: 'Ryokan',
    img: 'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450279.jpeg?k=cb9ab85ffe439f3030e00281f2d52583a398bf076e54f00f746e1d1baf62bf6e&o=',
  },
  {
    id: 15,
    name: 'Riad',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450064.jpeg?k=4d4ea22dc4828fd55a3889e90531c9841ddb2d9abf460c420cdd24f2a9b658d2&o=',
  },
  {
    id: 16,
    name: 'Công viên nghỉ mát',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450068.jpeg?k=41cc7c5449011323aaaaed4e845cb16200b5d540c77a50c1bea90399a1e92d70&o=',
  },
  {
    id: 17,
    name: 'Chỗ nghỉ nhà dân',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450066.jpeg?k=4adfab312f5d26da9f81da48d8c95ca8f108215b2c84085590891a9e0e17b144&o=',
  },
  {
    id: 18,
    name: 'Khu cắm trại',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450283.jpeg?k=44ef0e355cff36883935e4c99b5c01b035eabebad278d22363210b2fe40b2791&o= ',
  },
  {
    id: 19,
    name: 'Nhà nghỉ nông thôn',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450103.jpeg?k=a1fa72362160b1df6e288050afa7ce1aade80871acd368ddd4a4ebf6ad87764e&o=',
  },
  {
    id: 20,
    name: 'Nhà nghỉ trang trại',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450080.jpeg?k=15d9709efa513f2b23b5fa8d5234d87bdee2bf97b3e7552244592da11413db9a&o=',
  },
  {
    id: 21,
    name: 'Nhà thuyền',
    img: 'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450095.jpeg?k=cd5e46e632dab722d22217813485efde31fbe82f5f26a624166edccdbe8187bc&o=',
  },
  {
    id: 22,
    name: 'Lều trại sang trọng',
    img: 'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450097.jpeg?k=eac0f917a53dc395bd379fef8c191e7d5e37012b68e60232e4f6bba2a2901b7a&o=',
  },
  {
    id: 23,
    name: 'Khách sạn tự phục vụ',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450075.jpeg?k=d23cf8443780ac09f46f59e40393d75dbe64b06029b4959c60b81b7fdefc9be0&o=',
  },
  {
    id: 24,
    name: 'Nhà nhỏ',
    img: 'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57175023.jpeg?k=dc0319d4d64ded9ee4b0ddb162a2e80db7899300b7bf21b34506888895d74c79&o=',
  },
];

export default findByPlaceData;
