import serviceData from '../../data/detailed-services.json';
import ServiceDetailPage from '../../components/shared/ServiceDetailPage';

const CoolingServices = () => (
  <ServiceDetailPage service={serviceData.cooling} serviceKey="cooling" />
);

export default CoolingServices;
