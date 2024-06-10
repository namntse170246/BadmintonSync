import findByPlaceData from './findbyPlaceData';
import './findByPlace.css';
import Marquee from 'react-fast-marquee';

function FindByPlace() {
  const data = findByPlaceData;

  return (
    <div className="fbl__container">
      <Marquee direction="left" speed={60} delay={1} pauseOnHover loop={0}>
        {data.map((item) => (
          <div className="fbl__location__item" key={item.id}>
            <img className="fbl__img" src={item.img} alt={item.name} />
            <h2 className="fbl__name">{item.name}</h2>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
export default FindByPlace;
