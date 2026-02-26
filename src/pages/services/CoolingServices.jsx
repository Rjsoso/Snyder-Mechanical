import serviceData from '../../data/detailed-services.json';
import ServiceDetailPage from '../../components/shared/ServiceDetailPage';

const CoolingServices = () => (
  <>
    <title>Cooling Services | Snyder Mechanical – Elko, NV</title>
    <meta name="description" content="Professional air conditioning installation, repair, and maintenance in northeastern Nevada. Keep your home or business cool with Snyder Mechanical." />
    <ServiceDetailPage service={serviceData.cooling} serviceKey="cooling" />
  </>
);

export default CoolingServices;
