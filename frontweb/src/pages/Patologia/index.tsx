import Navbar from 'components/Navbar';
import PatologiaCard from 'components/PatologiaCard';

const Patologia = () => {
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="row">
          <div className="col-sm-6 col-lg-4 col-xl-6">
            <PatologiaCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-6">
            <PatologiaCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-6">
            <PatologiaCard />
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-6">
            <PatologiaCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Patologia;
