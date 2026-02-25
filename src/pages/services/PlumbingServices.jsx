import serviceData from '../../data/detailed-services.json';
import ServiceDetailPage from '../../components/shared/ServiceDetailPage';

const PlumbingServices = () => (
  <ServiceDetailPage service={serviceData.plumbing} serviceKey="plumbing" />
);

export default PlumbingServices;
