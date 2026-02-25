import serviceData from '../../data/detailed-services.json';
import ServiceDetailPage from '../../components/shared/ServiceDetailPage';

const HeatingServices = () => (
  <ServiceDetailPage service={serviceData.heating} serviceKey="heating" />
);

export default HeatingServices;
